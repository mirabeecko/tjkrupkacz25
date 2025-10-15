import React, { useEffect, useRef, useState } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

interface VideoHeroProps {
  videoSrc: string;
  fallbackImage?: string;
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
  height?: "sm" | "md" | "lg" | "full";
  overlay?: boolean;
}

const VideoHero: React.FC<VideoHeroProps> = ({
  videoSrc,
  fallbackImage,
  title,
  subtitle,
  children,
  height = "lg",
  overlay = true
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [videoError, setVideoError] = useState(false);

  const heightClasses = {
    sm: "min-h-[50vh]",
    md: "min-h-[70vh]",
    lg: "min-h-[85vh]",
    full: "min-h-screen"
  };

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.play().catch(() => {
        setIsPlaying(false);
      });
    }
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (video) {
      if (isPlaying) {
        video.pause();
      } else {
        video.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (video) {
      video.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <section className={`relative ${heightClasses[height]} flex items-center justify-center overflow-hidden`}>
      {/* Video or Fallback Image */}
      {!videoError && videoSrc ? (
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          loop
          muted={isMuted}
          playsInline
          onError={() => setVideoError(true)}
        >
          <source src={videoSrc} type="video/mp4" />
          Váš prohlížeč nepodporuje video tag.
        </video>
      ) : (
        fallbackImage && (
          <div
            className="absolute inset-0 w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${fallbackImage})` }}
          />
        )
      )}

      {/* Gradient Overlay */}
      {overlay && (
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" />
      )}

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 text-center text-white">
        <h1 className="font-montserrat font-black text-5xl md:text-7xl lg:text-8xl mb-6 leading-tight animate-fade-in">
          {title}
        </h1>
        {subtitle && (
          <p className="text-xl md:text-2xl lg:text-3xl mb-8 opacity-90 animate-fade-in-up">
            {subtitle}
          </p>
        )}
        {children && (
          <div className="animate-fade-in-up delay-200">
            {children}
          </div>
        )}
      </div>

      {/* Video Controls */}
      {!videoError && videoSrc && (
        <div className="absolute bottom-8 right-8 z-20 flex gap-3">
          <button
            onClick={togglePlay}
            className="p-3 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full transition-all duration-300 shadow-lg group"
            aria-label={isPlaying ? "Pozastavit video" : "Přehrát video"}
          >
            {isPlaying ? (
              <Pause className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
            ) : (
              <Play className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
            )}
          </button>

          <button
            onClick={toggleMute}
            className="p-3 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full transition-all duration-300 shadow-lg group"
            aria-label={isMuted ? "Zapnout zvuk" : "Vypnout zvuk"}
          >
            {isMuted ? (
              <VolumeX className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
            ) : (
              <Volume2 className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
            )}
          </button>
        </div>
      )}

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-white/50 rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default VideoHero;
