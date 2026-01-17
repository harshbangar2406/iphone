
export interface Shot {
  id: number;
  title: string;
  description: string;
  image: string;
  videoUrl?: string;
  aspect: string;
}

export interface ProjectDetailData {
  title: string;
  client: string;
  year: string;
  role: string;
  heroImage: string;
  videoUrl?: string;
  technicalDescription: string;
  shots: Shot[];
}

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  thumbnail: string;
  videoUrl?: string;
  year: string;
  tools: string[];
}

export type ViewState = { type: 'home' } | { type: 'project-detail', projectId: string };

export enum Section {
  HERO = 'hero',
  WORK = 'work',
  AI_TOOLKIT = 'ai-toolkit',
  ABOUT = 'about',
  CONTACT = 'contact'
}
