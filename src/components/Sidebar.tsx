import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import { Article } from "../types/article";
import { Heading } from "./DynamicArticleContent";

interface SidebarProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
  articleId?: string;
  article?: Article | null;
}

// Group headings into sections: h2s are phase titles, h3s are chapter items
interface NavSection {
  id: string;
  title: string;
  items: { id: string; title: string }[];
}

function groupHeadings(headings: Heading[]): NavSection[] {
  const sections: NavSection[] = [];
  let current: NavSection | null = null;

  for (const h of headings) {
    if (h.level <= 2) {
      if (current) sections.push(current);
      current = { id: h.id, title: h.text, items: [] };
    } else if (current) {
      current.items.push({ id: h.id, title: h.text });
    }
  }
  if (current) sections.push(current);

  // If sections have no items, treat all headings as flat items under one section
  if (sections.every(s => s.items.length === 0)) {
    return [{
      id: '',
      title: 'Contenido',
      items: headings.map(h => ({ id: h.id, title: h.text }))
    }];
  }

  return sections;
}

const Sidebar = ({
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  article,
}: SidebarProps) => {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  // Listen for headings extracted from content
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail?.headings) setHeadings(detail.headings);
    };
    window.addEventListener('headingsExtracted', handler);
    return () => window.removeEventListener('headingsExtracted', handler);
  }, []);

  // Listen for active heading changes
  useEffect(() => {
    const handler = (e: Event) => {
      setActiveId((e as CustomEvent).detail.activeId);
    };
    window.addEventListener('activeHeadingChange', handler);
    return () => window.removeEventListener('activeHeadingChange', handler);
  }, []);

  // Reset on article change
  useEffect(() => {
    setHeadings([]);
    setActiveId(null);
  }, [article?.id]);

  const scrollTo = (id: string) => {
    setIsMobileMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  // Scroll active item into view in sidebar
  useEffect(() => {
    if (activeId && navRef.current) {
      const el = navRef.current.querySelector(`[data-heading="${activeId}"]`);
      el?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  }, [activeId]);

  const sections = groupHeadings(headings);

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-black/50 z-30" onClick={() => setIsMobileMenuOpen(false)} />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:fixed left-0 top-0 h-screen w-80 bg-[#F7F4ED] border-r border-gray-200 overflow-y-auto z-40
        transform transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <button
          className="lg:hidden absolute top-4 right-4 z-50 bg-white border border-gray-200 rounded-md p-2 shadow-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <X size={20} />
        </button>

        <div className="p-6">
          {/* Header */}
          <div className="mb-8">
            <div className="mb-4">
              <a href="/#content" className="hover:opacity-80 transition-opacity inline-block">
                <img
                  alt="ANLAK Logo"
                  width="120"
                  height="40"
                  className="h-10 w-auto object-contain"
                  src={`${import.meta.env.BASE_URL}logo_ANLAK_Positivo.png`}
                />
              </a>
            </div>
            {article && (
              <div className="space-y-2">
                <h1 className="text-xl font-bold text-gray-900 leading-tight">{article.title}</h1>
                {article.subtitle && (
                  <p className="text-sm text-gray-600">{article.subtitle}</p>
                )}
                <div className="text-xs text-gray-500 mt-2">
                  <span>{article.author}</span>
                  {article.readTime && <><span> • </span><span>{article.readTime}</span></>}
                </div>
              </div>
            )}
          </div>

          {/* Navigation */}
          <nav ref={navRef} className="space-y-6">
            {sections.map((section) => (
              <div key={section.id || 'root'}>
                {section.title !== 'Contenido' && (
                  <button
                    onClick={() => scrollTo(section.id)}
                    className={`w-full text-left text-xs font-medium tracking-wider mb-3 uppercase transition-colors ${
                      activeId === section.id ? 'text-orange-600' : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {section.title}
                  </button>
                )}
                {section.items.length > 0 && (
                  <ul className="space-y-1">
                    {section.items.map((item) => (
                      <li key={item.id}>
                        <button
                          data-heading={item.id}
                          onClick={() => scrollTo(item.id)}
                          className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                            activeId === item.id
                              ? 'bg-gray-900 text-white font-medium'
                              : 'text-gray-700 hover:bg-gray-200/70'
                          }`}
                        >
                          {item.title}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
            {sections.length === 0 && (
              <p className="text-sm text-gray-400 italic">Loading chapters...</p>
            )}
          </nav>
        </div>
      </div>

      {/* Mobile Menu Toggle */}
      {!isMobileMenuOpen && (
        <button
          className="lg:hidden fixed top-4 left-4 z-50 bg-[#F7F4ED] border border-gray-200 rounded-md p-2"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <Menu size={20} />
        </button>
      )}
    </>
  );
};

export default Sidebar;
