import React from "react";
import { Link } from "react-router-dom";
import { Calendar, User, ArrowRight, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ScrollAnimation from "./ScrollAnimation";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  slug: string;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Jak začít se snowkitingem: Kompletní průvodce pro začátečníky",
    excerpt:
      "Snowkiting kombinuje lyžování nebo snowboarding s drakem. Zjistěte, co potřebujete vědět před první jízdou.",
    image: "/images/blog/snowkiting-guide.jpg",
    author: "Jan Novák",
    date: "15. 10. 2025",
    readTime: "5 min",
    category: "Snowkiting",
    slug: "jak-zacit-se-snowkitingem",
  },
  {
    id: 2,
    title: "Nové traily na Komárce: Co se změnilo v sezóně 2025",
    excerpt:
      "Podívejte se na nejnovější přírůstky do našeho trail parku a zjistěte, co vás čeká.",
    image: "/images/blog/new-trails.jpg",
    author: "Petra Svobodová",
    date: "10. 10. 2025",
    readTime: "4 min",
    category: "Trail Park",
    slug: "nove-traily-na-komarce",
  },
  {
    id: 3,
    title: "Top 5 tipů pro zimní sezónu v Krušných horách",
    excerpt:
      "Připravte se na zimu s našimi expertními radami pro snowkiting i trailriding.",
    image: "/images/blog/winter-tips.jpg",
    author: "Martin Kovář",
    date: "5. 10. 2025",
    readTime: "6 min",
    category: "Tipy & Triky",
    slug: "top-5-tipu-pro-zimni-sezonu",
  },
];

const BlogSection: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container px-4 mx-auto">
        <ScrollAnimation animation="fadeIn">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-tjk-orange/10 text-tjk-orange border-tjk-orange/20">
              Blog & Novinky
            </Badge>
            <h2 className="text-4xl md:text-5xl font-poppins font-bold text-gray-900 dark:text-white mb-4">
              Nejnovější články
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Tipy, průvodce a novinky ze světa snowkitingu a trail parku
            </p>
          </div>
        </ScrollAnimation>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {blogPosts.map((post, index) => (
            <ScrollAnimation
              key={post.id}
              animation="slideUp"
              delay={index * 0.1}
            >
              <Card className="group h-full overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-tjk-orange/50">
                <div className="relative overflow-hidden h-56">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=400&fit=crop";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <Badge className="absolute top-4 left-4 bg-tjk-orange text-white border-0">
                    {post.category}
                  </Badge>
                </div>

                <CardContent className="p-6">
                  <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {post.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {post.readTime}
                    </div>
                  </div>

                  <h3 className="text-xl font-poppins font-bold text-gray-900 dark:text-white mb-3 group-hover:text-tjk-orange transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                      <User className="w-4 h-4" />
                      {post.author}
                    </div>

                    <Link
                      to={`/blog/${post.slug}`}
                      className="flex items-center gap-2 text-tjk-orange font-semibold hover:gap-3 transition-all duration-300"
                    >
                      Číst více
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </ScrollAnimation>
          ))}
        </div>

        <ScrollAnimation animation="fadeIn" delay={0.3}>
          <div className="text-center">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-tjk-orange to-amber-600 hover:from-tjk-orange/90 hover:to-amber-600/90 text-white font-poppins font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              Zobrazit všechny články
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
};

export default BlogSection;
