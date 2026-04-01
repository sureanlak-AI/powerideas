import { useState, useEffect, useMemo, useCallback } from "react";
import { Article } from "../types/article";
import { marked } from "marked";

export interface Heading {
  id: string;
  text: string;
  level: number; // 2 = h2, 3 = h3
}

interface DynamicArticleContentProps {
  article: Article;
  onHeadingsExtracted?: (headings: Heading[]) => void;
}

// Custom marked renderer that adds IDs to headings
let headingCounter = 0;
const renderer = new marked.Renderer();
const extractedHeadings: Heading[] = [];

renderer.heading = function(data) {
  const text = data.text;
  const depth = data.depth;
  const id = `heading-${headingCounter++}`;
  extractedHeadings.push({ id, text, level: depth });
  return `<h${depth} id="${id}" class="scroll-mt-8">${text}</h${depth}>`;
};

// Configure marked
marked.setOptions({
  renderer,
  gfm: true,
  breaks: true,
});

const DynamicArticleContent: React.FC<DynamicArticleContentProps> = ({ article, onHeadingsExtracted }) => {
  const [activeHeadingId, setActiveHeadingId] = useState<string | null>(null);

  // Parse markdown and extract headings
  const { html, headings } = useMemo(() => {
    headingCounter = 0;
    extractedHeadings.length = 0;
    const parsed = marked.parse(article.content) as string;
    return { html: parsed, headings: [...extractedHeadings] };
  }, [article.content]);

  // Notify parent of headings
  useEffect(() => {
    onHeadingsExtracted?.(headings);
    // Dispatch for sidebar
    window.dispatchEvent(new CustomEvent('headingsExtracted', { detail: { headings } }));
  }, [headings, onHeadingsExtracted]);

  // Scroll spy
  useEffect(() => {
    window.scrollTo(0, 0);
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the topmost visible heading
        const visible = entries.filter(e => e.isIntersecting);
        if (visible.length > 0) {
          // Pick the one closest to top
          const sorted = visible.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
          setActiveHeadingId(sorted[0].target.id);
          window.dispatchEvent(new CustomEvent('activeHeadingChange', {
            detail: { activeId: sorted[0].target.id }
          }));
        }
      },
      { rootMargin: '-10% 0px -80% 0px', threshold: 0.1 }
    );

    const timer = setTimeout(() => {
      headings.forEach(h => {
        const el = document.getElementById(h.id);
        if (el) observer.observe(el);
      });
    }, 200);

    return () => { clearTimeout(timer); observer.disconnect(); };
  }, [headings]);

  return (
    <div className="py-12">
      {/* Article header */}
      <div className="mb-12 border-b border-gray-200 pb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
          {article.title}
        </h1>
        {article.subtitle && (
          <p className="text-lg text-gray-600 mb-4">{article.subtitle}</p>
        )}
        <p className="text-gray-600 text-lg leading-relaxed">{article.description}</p>
        <div className="flex items-center gap-4 mt-6 text-sm text-gray-500">
          <span>Por {article.author}</span>
          <span>•</span>
          <span>{article.readTime}</span>
          <span>•</span>
          <span>{new Date(article.createdAt).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
        </div>
      </div>

      {/* Markdown content with beautiful typography */}
      <div
        className="prose prose-lg max-w-none
          prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-gray-900
          prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4 prose-h2:pb-2 prose-h2:border-b prose-h2:border-gray-100
          prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
          prose-p:text-gray-700 prose-p:leading-relaxed prose-p:text-[1.125rem]
          prose-strong:text-gray-900 prose-strong:font-semibold
          prose-em:text-gray-600
          prose-blockquote:border-l-4 prose-blockquote:border-orange-300 prose-blockquote:bg-orange-50/50 prose-blockquote:py-1 prose-blockquote:px-4 prose-blockquote:rounded-r-lg prose-blockquote:not-italic prose-blockquote:text-gray-700
          prose-ul:my-4 prose-ul:space-y-1
          prose-ol:my-4 prose-ol:space-y-1
          prose-li:text-gray-700 prose-li:text-[1.1rem]
          prose-code:text-orange-700 prose-code:bg-orange-50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-normal
          prose-pre:bg-gray-900 prose-pre:rounded-xl prose-pre:shadow-lg
          prose-a:text-orange-600 prose-a:no-underline hover:prose-a:underline
          prose-img:rounded-xl prose-img:shadow-md
        "
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
};

export default DynamicArticleContent;
export type { Heading };
