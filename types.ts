
export interface VideoMetadata {
  title: string;
  platform: string;
  duration?: string;
  thumbnail?: string;
  qualityOptions: string[];
  size?: string;
}

export enum DownloadStatus {
  IDLE = 'IDLE',
  ANALYZING = 'ANALYZING',
  READY = 'READY',
  DOWNLOADING = 'DOWNLOADING',
  COMPLETED = 'COMPLETED',
  ERROR = 'ERROR'
}

export interface HistoryItem {
  id: string;
  url: string;
  title: string;
  platform: string;
  timestamp: number;
}
