import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Article } from "../types/article";

// Datos específicos para cada artículo hardcodeado
const articleData = {
  "prompt-guide": {
    title: "How to prompt better products with AI",
    subtitle: "Ultimate Prompt Guide",
    chapters: [{
      phase: "Phase 1: Lay the Foundation",
      chapters: ["1. Plan before you prompt", "2. Map the User Journey Visually", "3. Get the Design Right First"]
    }, {
      phase: "Phase 2: Think in Systems",
      chapters: ["4. Prompt by Component, Not Page", "5. Design with Real Content", "6. Speak Atomic: Buttons, Cards, Modals", "7. Use Buzzwords to Dial In Aesthetic"]
    }, {
      phase: "Phase 3: Build with Precision",
      chapters: ["8. Use Clear Hierarchy in Prompts", "9. Add visuals via URL", "10. Use the Edit Button Strategically"]
    }, {
      phase: "Phase 4: Iterate and Ship",
      chapters: ["11. Build with Supabase in Mind", "12. Version Control is your friend"]
    }]
  },
  "ai-first-playbook": {
    title: "AI-First: Un playbook para empresas modernas",
    subtitle: "AI-First Strategy Guide",
    chapters: [{
      phase: "Qué es AI-First",
      chapters: ["1. Introducción: El Imperativo AI-First", "2. Expansión de Capacidades", "3. Asociación Humano-IA", "4. Diseño Nativo de IA y Gobernanza"]
    }, {
      phase: "Lecciones Históricas",
      chapters: ["5. Web-First: Quién lo Hizo Bien", "6. Mobile-First: Revolución Móvil"]
    }, {
      phase: "El Caso de Box",
      chapters: ["7. La Transformación de Box", "8. Resultados y Ejemplos Internos"]
    }, {
      phase: "Sugerencias Prácticas",
      chapters: ["9. Liderazgo e Infraestructura", "10. Desarrollo y Implementación"]
    }]
  }
};

interface SidebarProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
  articleId?: string;
  article?: Article | null; // Artículo dinámico de Firebase
}

// Función para generar navegación desde las fases de un artículo de Firebase
const generateNavigationFromArticle = (article: Article) => {
  const navigation = {
    title: article.title,
    subtitle: article.subtitle || "Artículo",
    chapters: [] as { phase: string; chapters: string[] }[]
  };

  if (article.phases && article.phases.length > 0) {
    // Usar las fases definidas en el artículo
    article.phases.forEach((phase, phaseIndex) => {
      const phaseChapters: string[] = [];
      
      phase.chapters.forEach((chapter, chapterIndex) => {
        const chapterNumber = (phaseIndex * 10 + chapterIndex + 1).toString();
        phaseChapters.push(`${chapterNumber}. ${chapter.title}`);
      });

      navigation.chapters.push({
        phase: phase.phase,
        chapters: phaseChapters
      });
    });
  } else {
    // Generar navegación básica desde el contenido HTML
    const parser = new DOMParser();
    const doc = parser.parseFromString(article.content, 'text/html');
    const headings = doc.querySelectorAll('h1, h2, h3, h4, h5, h6');
    
    let currentPhase: { phase: string; chapters: string[] } | null = null;
    let chapterCounter = 1;
    
    headings.forEach((heading) => {
      const text = heading.textContent?.trim() || '';
      const tagName = heading.tagName.toLowerCase();
      
      if (tagName === 'h1' || tagName === 'h2') {
        // Crear nueva fase
        if (currentPhase) {
          navigation.chapters.push(currentPhase);
        }
        currentPhase = {
          phase: text,
          chapters: []
        };
      } else if ((tagName === 'h3' || tagName === 'h4') && currentPhase) {
        // Agregar capítulo a la fase actual
        currentPhase.chapters.push(`${chapterCounter}. ${text}`);
        chapterCounter++;
      }
    });
    
    // Agregar la última fase
    if (currentPhase && currentPhase.chapters.length > 0) {
      navigation.chapters.push(currentPhase);
    }
    
    // Si no hay fases, crear una estructura básica
    if (navigation.chapters.length === 0) {
      navigation.chapters.push({
        phase: "Contenido",
        chapters: ["1. Introducción"]
      });
    }
  }

  return navigation;
};

const Sidebar = ({
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  articleId = "prompt-guide",
  article = null
}: SidebarProps) => {
  const [activeChapter, setActiveChapter] = useState("1");

  // Determinar qué navegación usar
  let currentArticle;
  
  if (article) {
    // Usar artículo dinámico de Firebase
    currentArticle = generateNavigationFromArticle(article);
  } else if (articleId && articleData[articleId as keyof typeof articleData]) {
    // Usar artículo hardcodeado
    currentArticle = articleData[articleId as keyof typeof articleData];
  } else {
    // Fallback al prompt-guide
    currentArticle = articleData["prompt-guide"];
  }

  useEffect(() => {
    const handleActiveChapterChange = (event: CustomEvent) => {
      setActiveChapter(event.detail.activeChapter);
    };
    window.addEventListener('activeChapterChange', handleActiveChapterChange as EventListener);
    return () => {
      window.removeEventListener('activeChapterChange', handleActiveChapterChange as EventListener);
    };
  }, []);

  // Resetear capítulo activo cuando cambia el artículo
  useEffect(() => {
    setActiveChapter("1");
  }, [articleId, article?.id]);

  const scrollToSection = (chapterNumber: string) => {
    setActiveChapter(chapterNumber);
    setIsMobileMenuOpen(false); // Close mobile menu on selection
    const element = document.getElementById(`chapter-${chapterNumber}`);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };

  return <>
      {/* Mobile Overlay */}
      {isMobileMenuOpen && <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30" onClick={() => setIsMobileMenuOpen(false)} />}

      {/* Sidebar - Fixed on desktop, overlay on mobile */}
      <div className={`
        fixed lg:fixed left-0 top-0 h-screen w-80 bg-[#F7F4ED] border-r border-gray-200 overflow-y-auto z-40 
        transform transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Mobile close button inside sidebar */}
        <button className="lg:hidden absolute top-4 right-4 z-50 bg-white border border-gray-200 rounded-md p-2 shadow-sm" onClick={() => setIsMobileMenuOpen(false)}>
          <X size={20} />
        </button>

        <div className="p-6">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <a href="/#content" className="hover:opacity-80 transition-opacity">
                <img 
                  alt="ANLAK Logo" 
                  width="120" 
                  height="40" 
                  className="h-10 w-auto object-contain" 
                  src="/logo_ANLAK_Positivo.png" 
                />
              </a>
            </div>
            <div className="space-y-2">
              <h1 className="text-xl font-bold text-gray-900">{currentArticle.title}</h1>
              <p className="text-sm text-gray-600">{currentArticle.subtitle}</p>
              
              {/* Mostrar información adicional para artículos dinámicos */}
              {article && (
                <div className="text-xs text-gray-500 mt-2">
                  <span>{article.author}</span>
                  {article.readTime && (
                    <>
                      <span> • </span>
                      <span>{article.readTime}</span>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Navigation */}
          <nav className="space-y-6">
            {currentArticle.chapters.map((phase, phaseIndex) => (
              <div key={phaseIndex}>
                <h3 className="text-xs font-medium text-gray-500 tracking-wider mb-3 uppercase">
                  {phase.phase}
                </h3>
                <ul className="space-y-1">
                  {phase.chapters.map((chapter, chapterIndex) => {
                    const chapterNumber = chapter.split('.')[0];
                    const isActive = activeChapter === chapterNumber;
                    return (
                      <li key={chapterIndex}>
                        <button 
                          onClick={() => scrollToSection(chapterNumber)} 
                          className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                            isActive 
                              ? 'bg-gray-900 text-white' 
                              : 'text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {chapter}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </nav>
        </div>
      </div>

      {/* Mobile Menu Toggle - positioned outside when sidebar is closed */}
      {!isMobileMenuOpen && (
        <button 
          className="lg:hidden fixed top-4 left-4 z-50 bg-[#F7F4ED] border border-gray-200 rounded-md p-2" 
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <Menu size={20} />
        </button>
      )}
    </>;
};

export default Sidebar;
