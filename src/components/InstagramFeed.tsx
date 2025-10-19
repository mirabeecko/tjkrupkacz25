import React from "react";
import { Instagram, Heart, MessageCircle, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import ScrollAnimation from "./ScrollAnimation";

interface InstagramPost {
  id: number;
  image: string;
  likes: number;
  comments: number;
  caption: string;
  url: string;
}

// Mock data - v produkci by toto přicházelo z Instagram API
const instagramPosts: InstagramPost[] = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=400&fit=crop",
    likes: 245,
    comments: 12,
    caption: "Perfektní podmínky pro snowkiting! ❄️🪁",
    url: "https://instagram.com/p/example1",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=400&fit=crop",
    likes: 189,
    comments: 8,
    caption: "Nové traily jsou hotové! 🚵‍♂️",
    url: "https://instagram.com/p/example2",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=400&h=400&fit=crop",
    likes: 312,
    comments: 15,
    caption: "Západ slunce na Komárce 🌅",
    url: "https://instagram.com/p/example3",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop",
    likes: 198,
    comments: 10,
    caption: "Začíná sezona! 🎿",
    url: "https://instagram.com/p/example4",
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=400&h=400&fit=crop",
    likes: 276,
    comments: 14,
    caption: "Kurz pro pokročilé ✨",
    url: "https://instagram.com/p/example5",
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=400&h=400&fit=crop",
    likes: 234,
    comments: 9,
    caption: "Team TJK 💪",
    url: "https://instagram.com/p/example6",
  },
];

const InstagramFeed: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
      <div className="container px-4 mx-auto">
        <ScrollAnimation animation="fadeIn">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-500 via-purple-500 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                <Instagram className="w-7 h-7 text-white" />
              </div>
              <h2 className="text-4xl md:text-5xl font-poppins font-bold text-gray-900 dark:text-white">
                Sledujte nás na Instagramu
              </h2>
            </div>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-6">
              Každodenní příběhy z našich akcí, kurzů a trail parku
            </p>
            <a
              href="https://instagram.com/tjkrupka"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500 hover:from-pink-600 hover:via-purple-600 hover:to-orange-600 text-white font-poppins font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <Instagram className="w-5 h-5" />
              Sledovat @tjkrupka
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </ScrollAnimation>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {instagramPosts.map((post, index) => (
            <ScrollAnimation
              key={post.id}
              animation="scale"
              delay={index * 0.05}
            >
              <motion.a
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block aspect-square rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <img
                  src={post.image}
                  alt={post.caption}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-white text-sm mb-3 line-clamp-2 font-inter">
                      {post.caption}
                    </p>
                    <div className="flex items-center gap-4 text-white">
                      <div className="flex items-center gap-1">
                        <Heart className="w-4 h-4 fill-white" />
                        <span className="text-sm font-semibold">{post.likes}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageCircle className="w-4 h-4" />
                        <span className="text-sm font-semibold">{post.comments}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Instagram icon badge */}
                <div className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg">
                  <Instagram className="w-4 h-4 text-pink-500" />
                </div>
              </motion.a>
            </ScrollAnimation>
          ))}
        </div>

        <ScrollAnimation animation="fadeIn" delay={0.4}>
          <div className="text-center mt-8">
            <p className="text-gray-600 dark:text-gray-300 font-inter">
              Označte nás ve svých příspěvcích{" "}
              <span className="font-bold text-tjk-orange">#TJKrupka</span> a staňte se
              součástí naší komunity! 🎉
            </p>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
};

export default InstagramFeed;
