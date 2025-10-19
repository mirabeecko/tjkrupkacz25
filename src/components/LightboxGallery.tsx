import React, { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import { ZoomIn, Grid3x3 } from "lucide-react";
import ScrollAnimation from "./ScrollAnimation";
import { Badge } from "./ui/badge";

interface GalleryImage {
  src: string;
  title?: string;
  description?: string;
  category?: string;
}

interface LightboxGalleryProps {
  images: GalleryImage[];
  title?: string;
  columns?: 2 | 3 | 4;
}

const LightboxGallery: React.FC<LightboxGalleryProps> = ({
  images,
  title = "Galerie",
  columns = 3,
}) => {
  const [open, setOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  const slides = images.map((img) => ({
    src: img.src,
    title: img.title,
    description: img.description,
  }));

  const gridCols = {
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <section className="py-20">
      <div className="container px-4 mx-auto">
        <ScrollAnimation animation="fadeIn">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-tjk-orange/10 text-tjk-orange border-tjk-orange/20">
              <Grid3x3 className="w-4 h-4 mr-2" />
              Fotogalerie
            </Badge>
            <h2 className="text-4xl md:text-5xl font-poppins font-bold text-gray-900 dark:text-white mb-4">
              {title}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Prohlédněte si fotky z našich akcí, kurzů a trail parku
            </p>
          </div>
        </ScrollAnimation>

        <div className={`grid ${gridCols[columns]} gap-4`}>
          {images.map((image, index) => (
            <ScrollAnimation
              key={index}
              animation="scale"
              delay={index * 0.05}
            >
              <div
                className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                onClick={() => {
                  setPhotoIndex(index);
                  setOpen(true);
                }}
              >
                <img
                  src={image.src}
                  alt={image.title || `Gallery image ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=800&fit=crop";
                  }}
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    {image.category && (
                      <Badge className="mb-2 bg-tjk-orange text-white border-0">
                        {image.category}
                      </Badge>
                    )}
                    {image.title && (
                      <h3 className="text-white font-poppins font-bold text-lg mb-1">
                        {image.title}
                      </h3>
                    )}
                    {image.description && (
                      <p className="text-white/80 text-sm line-clamp-2 font-inter">
                        {image.description}
                      </p>
                    )}
                  </div>
                </div>

                {/* Zoom icon */}
                <div className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg">
                  <ZoomIn className="w-5 h-5 text-gray-900" />
                </div>
              </div>
            </ScrollAnimation>
          ))}
        </div>
      </div>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={photoIndex}
        slides={slides}
        plugins={[Zoom, Thumbnails, Fullscreen]}
        animation={{ fade: 300, swipe: 300 }}
        carousel={{ finite: false }}
        render={{
          buttonPrev: slides.length <= 1 ? () => null : undefined,
          buttonNext: slides.length <= 1 ? () => null : undefined,
        }}
      />
    </section>
  );
};

export default LightboxGallery;
