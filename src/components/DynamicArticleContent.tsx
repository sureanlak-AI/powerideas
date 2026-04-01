import { useState, useEffect } from "react";
import { Article } from "../types/article";
import { marked } from "marked";

interface DynamicArticleContentProps {
  article: Article;
}

const DynamicArticleContent: React.FC<DynamicArticleContentProps> = ({ article }) => {
  const [activeChapter, setActiveChapter] = useState("1");

  useEffect(() => {
    // Resetear al principio cuando cambia el artículo
    window.scrollTo(0, 0);
    setActiveChapter("1");

    const observerOptions = {
      root: null,
      rootMargin: '-10% 0px -80% 0px',
      threshold: 0.3
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const chapterNumber = entry.target.id.replace('chapter-', '');
          setActiveChapter(chapterNumber);

          // Dispatch custom event to update sidebar
          window.dispatchEvent(new CustomEvent('activeChapterChange', {
            detail: { activeChapter: chapterNumber }
          }));
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Esperar un poco para que el DOM esté listo, luego observar elementos
    setTimeout(() => {
      const chapterElements = document.querySelectorAll('[id^="chapter-"]');
      chapterElements.forEach(el => observer.observe(el));
    }, 100);

    return () => observer.disconnect();
  }, [article.id]);

  // Procesar el contenido HTML para agregar IDs a los headings
  const processContentWithIds = (content: string): string => {
    // Crear un DOM parser con HTML completo
    const parser = new DOMParser();
    const doc = parser.parseFromString(`<html><body>${content}</body></html>`, 'text/html');
    
    // Encontrar todos los headings y agregar IDs
    const headings = doc.querySelectorAll('h1, h2, h3, h4, h5, h6');
    let chapterCounter = 2; // Empezar en 2 porque el título principal es chapter-1
    
    headings.forEach((heading) => {
      // Solo agregar ID si no tiene uno ya
      if (!heading.id) {
        heading.id = `chapter-${chapterCounter}`;
        chapterCounter++;
      }
    });

    // Retornar el HTML procesado
    return doc.body.innerHTML;
  };

  const processedContent = processContentWithIds(marked.parse(article.content) as string);

  return (
    <div className="py-12">
      <div className="mb-12">
        <h1 id="chapter-1" className="text-3xl font-bold text-gray-900 mb-4">
          {article.title}
        </h1>
        <p className="text-gray-600 text-lg">{article.description}</p>
        
        {/* Metadatos del artículo */}
        <div className="flex items-center gap-4 mt-6 text-sm text-gray-500">
          <span>Por {article.author}</span>
          <span>•</span>
          <span>{article.readTime}</span>
          <span>•</span>
          <span>{new Date(article.createdAt).toLocaleDateString()}</span>
        </div>
      </div>
      
      <div className="prose prose-lg max-w-none">
        <div dangerouslySetInnerHTML={{ __html: processedContent }} />
      </div>
    </div>
  );
};

export default DynamicArticleContent; 