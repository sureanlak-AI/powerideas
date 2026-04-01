// Local article service - reads from markdown files in /content/articles/
import { Article, ArticlePhase, ArticleChapter } from '../types/article';

// Import all markdown files as raw strings
const articleModules = import.meta.glob('/content/articles/*.md', { query: '?raw', eager: true }) as Record<string, { default: string }>;

function parseFrontmatter(raw: string): { metadata: Record<string, any>; body: string } {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { metadata: {}, body: raw };
  
  const frontmatter = match[1];
  const body = match[2];
  const metadata: Record<string, any> = {};
  
  let currentKey = '';
  let currentValue = '';
  let inArray = false;
  
  for (const line of frontmatter.split('\n')) {
    const arrayStart = line.match(/^(\w+):\s*\[(.*)\]$/);
    const kvMatch = line.match(/^(\w+):\s*["']?(.*?)["']?\s*$/);
    const arrayItem = line.match(/^\s+-\s+"(.*)"$/);
    
    if (arrayStart) {
      // Single-line array: tags: ["AI", "Orgs"]
      metadata[arrayStart[1]] = arrayStart[2].split(',').map(s => s.trim().replace(/["']/g, ''));
    } else if (arrayItem && currentKey) {
      // Multi-line array item
      metadata[currentKey].push(arrayItem[1]);
    } else if (kvMatch) {
      if (inArray && currentKey) {
        // End of array, start new key
        inArray = false;
      }
      currentKey = kvMatch[1];
      const val = kvMatch[2].trim();
      if (val === '') {
        // Multi-line array starts
        metadata[currentKey] = [];
        inArray = true;
      } else {
        metadata[currentKey] = val;
      }
    }
  }
  
  return { metadata, body };
}

function parseBodyToPhases(body: string): ArticlePhase[] {
  const phases: ArticlePhase[] = [];
  const lines = body.split('\n');
  let currentPhase: ArticlePhase | null = null;
  let currentChapter: ArticleChapter | null = null;
  let chapterContent: string[] = [];
  let phaseTitle = '';
  let phaseNumber = '1';
  let phaseIdx = 0;

  for (const line of lines) {
    // Phase header: ## PHASE N: TITLE
    const phaseMatch = line.match(/^##\s+(?:PHASE\s+(\d+):\s*)?(.+)/i);
    // Chapter header: ### N. Title
    const chapterMatch = line.match(/^###\s+(\d+)\.\s+(.+)/);

    if (phaseMatch) {
      // Save previous chapter
      if (currentChapter && currentPhase) {
        currentChapter.content = chapterContent.join('\n').trim();
        currentPhase.chapters.push(currentChapter);
        chapterContent = [];
      }
      // Save previous phase
      if (currentPhase) {
        phases.push(currentPhase);
      }
      phaseIdx++;
      phaseNumber = phaseMatch[1] || String(phaseIdx);
      phaseTitle = phaseMatch[2].trim();
      currentPhase = { phase: phaseTitle, phaseNumber, chapters: [] };
      currentChapter = null;
    } else if (chapterMatch && currentPhase) {
      // Save previous chapter
      if (currentChapter) {
        currentChapter.content = chapterContent.join('\n').trim();
        currentPhase.chapters.push(currentChapter);
        chapterContent = [];
      }
      currentChapter = { number: chapterMatch[1], title: chapterMatch[2].trim(), content: '' };
    } else if (currentChapter) {
      chapterContent.push(line);
    }
  }

  // Save last chapter & phase
  if (currentChapter && currentPhase) {
    currentChapter.content = chapterContent.join('\n').trim();
    currentPhase.chapters.push(currentChapter);
  }
  if (currentPhase) {
    phases.push(currentPhase);
  }

  return phases;
}

function markdownToArticle(raw: string, filename: string): Article {
  const { metadata, body } = parseFrontmatter(raw);
  const phases = parseBodyToPhases(body);
  const slug = metadata.slug || filename.replace('.md', '');

  return {
    id: metadata.id || slug,
    title: metadata.title || '',
    subtitle: metadata.subtitle || '',
    description: metadata.description || '',
    content: body,
    image: metadata.image,
    readTime: metadata.readTime || '5 min read',
    publishDate: metadata.publishDate || new Date().toISOString().split('T')[0],
    status: metadata.status || 'published',
    author: metadata.author || 'Sure 🧒',
    tags: metadata.tags || [],
    slug,
    contentType: metadata.contentType || 'builder',
    phases,
    createdAt: new Date(metadata.publishDate || Date.now()),
    updatedAt: new Date(metadata.publishDate || Date.now()),
  };
}

// Parse all articles at load time
const ALL_ARTICLES: Article[] = Object.entries(articleModules).map(([path, module]) => {
  const filename = path.split('/').pop() || '';
  return markdownToArticle(module.default, filename);
});

// Sort by publishDate descending
ALL_ARTICLES.sort((a, b) => b.publishDate.localeCompare(a.publishDate));

export const localArticleService = {
  async getPublishedArticles(): Promise<Article[]> {
    return ALL_ARTICLES.filter(a => a.status === 'published');
  },

  async getArticleBySlug(slug: string): Promise<Article | null> {
    return ALL_ARTICLES.find(a => a.slug === slug && a.status === 'published') || null;
  },

  async getArticleById(id: string): Promise<Article | null> {
    return ALL_ARTICLES.find(a => a.id === id && a.status === 'published') || null;
  }
};
