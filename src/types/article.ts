export interface Article {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  content: string;
  image?: string;
  readTime: string;
  publishDate: string;
  status: 'draft' | 'published' | 'archived';
  author: string;
  tags: string[];
  slug: string;
  phases: ArticlePhase[];
  createdAt: Date;
  updatedAt: Date;
  contentType?: 'builder' | 'complete';
  visualPhases?: VisualPhase[];
  blocks?: VisualBlock[];
}

export interface ArticlePhase {
  phase: string;
  phaseNumber: string;
  chapters: ArticleChapter[];
}

export interface ArticleChapter {
  number: string;
  title: string;
  content: string;
}

export interface CreateArticleDto {
  title: string;
  subtitle: string;
  description: string;
  content: string;
  image?: string;
  readTime: string;
  tags: string[];
  phases: ArticlePhase[];
  status: 'draft' | 'published' | 'archived';
  contentType?: 'builder' | 'complete';
  visualPhases?: VisualPhase[];
  blocks?: VisualBlock[];
}

export interface UpdateArticleDto extends Partial<CreateArticleDto> {
  id: string;
}

export interface ArticleFilter {
  status?: 'draft' | 'published' | 'archived';
  author?: string;
  tags?: string[];
  search?: string;
}

export interface User {
  id: string;
  email: string;
  displayName: string;
  role: 'admin' | 'editor';
  createdAt: Date;
  lastLogin: Date;
}

export interface VisualPhase {
  id: string;
  title: string;
  blocks: VisualBlock[];
  color?: string;
  order: number;
}

export interface VisualBlock {
  id: string;
  type: 'hero' | 'text' | 'heading' | 'image' | 'video' | 'code' | 'quote' | 'list' | 'columns' | 'button' | 'callout' | 'divider';
  content: Record<string, any>;
  styles?: {
    backgroundColor?: string;
    textColor?: string;
    padding?: string;
    margin?: string;
    borderRadius?: string;
  };
  visible?: boolean;
  position?: { x: number; y: number };
} 