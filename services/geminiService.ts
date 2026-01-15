
import { GoogleGenAI, Type } from "@google/genai";
import { VideoMetadata } from "../types";

export const analyzeVideoLink = async (url: string): Promise<VideoMetadata> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });
  
  const prompt = `Identify platform and create title for video: "${url}". Return JSON: {title, platform, duration, qualityOptions, size}.`;

  // Create a timeout promise
  const timeoutPromise = new Promise((_, reject) => 
    setTimeout(() => reject(new Error("Timeout")), 8000)
  );

  try {
    const analysisPromise = ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            platform: { type: Type.STRING },
            duration: { type: Type.STRING },
            qualityOptions: { type: Type.ARRAY, items: { type: Type.STRING } },
            size: { type: Type.STRING }
          },
          required: ["title", "platform", "qualityOptions"]
        }
      }
    });

    // Race the API call against the timeout
    const response: any = await Promise.race([analysisPromise, timeoutPromise]);
    const result = JSON.parse(response.text || "{}");
    
    return {
      ...result,
      thumbnail: `https://picsum.photos/seed/${result.platform || 'video'}/400/225`
    };
  } catch (error) {
    console.error("Analysis handling:", error);
    
    // Fallback data if API is slow or fails
    const platform = url.toLowerCase().includes('tiktok') ? 'TikTok' : 
                     url.toLowerCase().includes('instagram') ? 'Instagram' : 
                     url.toLowerCase().includes('youtube') ? 'YouTube' : 'Social Video';
    
    return {
      title: `${platform} Video`,
      platform,
      duration: "00:45",
      size: "12 MB",
      qualityOptions: ["720p (HD)", "1080p (Full HD)", "Audio Only"],
      thumbnail: `https://picsum.photos/seed/${platform}/400/225`
    };
  }
};
