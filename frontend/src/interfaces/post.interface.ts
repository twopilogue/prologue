export interface TempPostConfig {
  tempPostId: number;
  title: string;
  summary: string;
  updatedAt: string;
}

export interface TempPostDetailConfig extends TempPostConfig {
  description: string;
  tags: string[];
  content: string;
  createdAt?: string;
  category: string;
}
