import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import DynamicArticleContent from "../components/DynamicArticleContent";
import { localArticleService } from "../services/localArticleService";
import { Article as ArticleType } from "../types/article";

const Article = () => {
  const { id } = useParams();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [article, setArticle] = useState<ArticleType | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (id) {
      fetchArticle(id);
    }
  }, [id]);

  const fetchArticle = async (slug: string) => {
    try {
      setLoading(true);
      setNotFound(false);
      const articleData = await localArticleService.getArticleBySlug(slug);
      if (articleData) {
        setArticle(articleData);
      } else {
        setNotFound(true);
      }
    } catch (error) {
      console.error('Error fetching article:', error);
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FCFBF8] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading poweridea...</p>
        </div>
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="min-h-screen bg-[#FCFBF8] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Not found</h1>
          <p className="text-gray-600 mb-8">This poweridea doesn't exist yet.</p>
          <Link to="/" className="inline-flex items-center justify-center h-9 px-4 py-2 text-sm font-medium bg-gray-900 text-white hover:bg-gray-800 rounded-md transition-colors">
            Back to Powerideas
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FCFBF8] flex">
      <Sidebar 
        isMobileMenuOpen={isMobileMenuOpen} 
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        articleId={article?.id || ''}
        article={article}
      />
      <main className="flex-1 lg:pl-80 pl-0">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          {article && <DynamicArticleContent article={article} />}
        </div>
      </main>
    </div>
  );
};

export default Article;
