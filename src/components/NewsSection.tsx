import React from "react";
import { Calendar, ArrowRight, Clock, Tag } from "lucide-react";
import { Link } from "react-router-dom";

interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image?: string;
  readTime?: string;
  featured?: boolean;
}

interface NewsSectionProps {
  articles: NewsArticle[];
  showFeatured?: boolean;
  maxArticles?: number;
}

const NewsSection: React.FC<NewsSectionProps> = ({
  articles,
  showFeatured = true,
  maxArticles = 6
}) => {
  const displayArticles = articles.slice(0, maxArticles);
  const featuredArticle = showFeatured ? displayArticles.find(a => a.featured) : null;
  const regularArticles = featuredArticle
    ? displayArticles.filter(a => !a.featured)
    : displayArticles;

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      "Akce": "bg-blue-500",
      "Novinky": "bg-green-500",
      "Závody": "bg-red-500",
      "Tipy": "bg-yellow-500",
      "Reportáž": "bg-purple-500"
    };
    return colors[category] || "bg-gray-500";
  };

  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="font-montserrat font-black text-4xl md:text-5xl text-gray-900 mb-3">
              Aktuality
            </h2>
            <p className="text-lg text-gray-600">
              Novinky z areálu, reporty z akcí a tipy na výlety
            </p>
          </div>
          <Link
            to="/aktuality"
            className="hidden md:flex items-center gap-2 px-6 py-3 bg-tjk-blue text-white font-semibold rounded-xl hover:bg-tjk-blue/90 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Všechny aktuality
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        {/* Featured Article */}
        {featuredArticle && (
          <div className="mb-12">
            <div className="relative group overflow-hidden rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 bg-gradient-to-br from-tjk-blue to-blue-800 text-white">
              {featuredArticle.image && (
                <div className="absolute inset-0">
                  <img
                    src={featuredArticle.image}
                    alt={featuredArticle.title}
                    className="w-full h-full object-cover opacity-40 group-hover:opacity-50 group-hover:scale-110 transition-all duration-700"
                  />
                </div>
              )}
              <div className="relative p-8 md:p-12 min-h-[400px] flex flex-col justify-end">
                <div className="flex items-center gap-4 mb-4">
                  <span className={`${getCategoryColor(featuredArticle.category)} px-4 py-2 rounded-full text-sm font-bold shadow-lg`}>
                    {featuredArticle.category}
                  </span>
                  <span className="flex items-center gap-2 text-white/90">
                    <Calendar className="w-4 h-4" />
                    {featuredArticle.date}
                  </span>
                  {featuredArticle.readTime && (
                    <span className="flex items-center gap-2 text-white/90">
                      <Clock className="w-4 h-4" />
                      {featuredArticle.readTime}
                    </span>
                  )}
                </div>
                <h3 className="text-3xl md:text-5xl font-black mb-4 leading-tight">
                  {featuredArticle.title}
                </h3>
                <p className="text-lg md:text-xl text-white/90 mb-6 max-w-3xl">
                  {featuredArticle.excerpt}
                </p>
                <Link
                  to={`/aktuality/${featuredArticle.id}`}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-tjk-blue font-bold rounded-xl hover:scale-105 transition-all duration-300 shadow-lg w-fit"
                >
                  Číst článek
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Regular Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {regularArticles.map((article) => (
            <Link
              key={article.id}
              to={`/aktuality/${article.id}`}
              className="group"
            >
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 h-full flex flex-col">
                {/* Image */}
                {article.image && (
                  <div className="relative h-48 overflow-hidden bg-gray-200">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className={`absolute top-4 left-4 ${getCategoryColor(article.category)} px-3 py-1 rounded-full text-sm font-bold text-white shadow-lg`}>
                      {article.category}
                    </div>
                  </div>
                )}

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {article.date}
                    </span>
                    {article.readTime && (
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {article.readTime}
                      </span>
                    )}
                  </div>

                  <h4 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-tjk-blue transition-colors leading-tight">
                    {article.title}
                  </h4>

                  <p className="text-gray-600 mb-4 flex-grow line-clamp-3">
                    {article.excerpt}
                  </p>

                  <div className="flex items-center gap-2 text-tjk-blue font-semibold group-hover:gap-3 transition-all">
                    Číst více
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile "View All" Button */}
        <div className="flex justify-center mt-12 md:hidden">
          <Link
            to="/aktuality"
            className="flex items-center gap-2 px-8 py-4 bg-tjk-blue text-white font-semibold rounded-xl hover:bg-tjk-blue/90 transition-all duration-300 shadow-lg"
          >
            Všechny aktuality
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
