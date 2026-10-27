import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ExternalLink, Github, Play, Pause, ZoomIn, Images, Award, Video, Maximize2 } from 'lucide-react';

export interface MediaSlot {
  type: 'image' | 'video';
  src: string;
  poster?: string;
  alt: string;
  caption?: string;
}

export interface ProjectData {
  id: string;
  number: string;
  title: string;
  category: string;
  description: string;
  technologies: string[];
  githubUrl: string;
  liveUrl?: string;
  award?: string;
  slot1: MediaSlot; // Primary project screenshot / image
  slot2: MediaSlot; // Secondary relevant image OR video demo
  galleryImages?: string[];
}

interface ProjectCardProps {
  project: ProjectData;
  index: number;
  total: number;
  onOpenGallery: (title: string, images: string[], startIndex?: number) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  index,
  total,
  onOpenGallery
}) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoError, setVideoError] = useState(false);

  // Framer Motion scroll tracking for the card track
  const isLast = index === total - 1;
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start start', 'end start']
  });

  // Smooth scale down and subtle dimming as subsequent cards stack over this card
  const scale = useTransform(scrollYProgress, [0, 0.85], [1, isLast ? 1 : 0.96]);
  const brightness = useTransform(scrollYProgress, [0, 0.85], [1, isLast ? 1 : 0.85]);

  // Video viewability playback control: Play when in viewport, pause when leaving
  useEffect(() => {
    if (project.slot2.type !== 'video' || videoError) return;

    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video
            .play()
            .then(() => setIsPlaying(true))
            .catch(() => {
              // Browser may require user gesture or muted attribute
              setIsPlaying(false);
            });
        } else {
          video.pause();
          setIsPlaying(false);
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [project.slot2.type, videoError]);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const handleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    if (video.requestFullscreen) {
      video.requestFullscreen();
    } else if ((video as any).webkitRequestFullscreen) {
      (video as any).webkitRequestFullscreen();
    }
  };

  // Compile image list for full-screen gallery modal
  const allMediaImages = [
    project.slot1.src,
    ...(project.slot2.type === 'image' ? [project.slot2.src] : []),
    ...(project.galleryImages || [])
  ].filter(src => !src.endsWith('.webm') && !src.endsWith('.mp4'));

  // Calculate sticky offset for desktop: subtle step of 10px per card up to a max offset
  const stickyTop = `calc(76px + ${Math.min(index, 6) * 10}px)`;

  return (
    <div
      ref={trackRef}
      className={`relative w-full ${
        isLast ? 'pb-8 md:pb-14' : 'min-h-auto md:min-h-[88vh] pb-12 md:pb-0'
      }`}
    >
      {/* Sticky container on desktop, natural flow on mobile */}
      <div
        className="relative md:sticky w-full transition-all duration-200"
        style={{
          top: stickyTop,
          zIndex: 10 + index,
        }}
      >
        <motion.div
          style={{
            scale,
            filter: isLast ? 'none' : `brightness(${brightness})`,
          }}
          className="w-full glass-card rounded-3xl border-2 border-white/10 hover:border-cyan-400/40 p-5 sm:p-7 md:p-8 shadow-[0_24px_60px_rgba(0,0,0,0.85)] bg-[#070c1b]/95 backdrop-blur-2xl transition-colors duration-300"
        >
          {/* CARD HEADER */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-white/10">
            <div className="max-w-3xl">
              {/* Sequential Number + Category + Optional Award */}
              <div className="flex flex-wrap items-center gap-2.5 mb-2">
                <span className="font-mono text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-[#00ffaa]">
                  {project.number}
                </span>
                <span className="text-gray-500 font-mono text-xs">/</span>
                <span className="font-mono text-[11px] sm:text-xs uppercase tracking-widest text-cyan-300 font-bold">
                  {project.category}
                </span>

                {project.award && (
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-purple-500/20 text-purple-300 border border-purple-500/40 shadow-sm">
                    <Award className="w-3 h-3 text-purple-400" />
                    <span>{project.award}</span>
                  </div>
                )}
              </div>

              {/* Project Title */}
              <h3 className="text-xl sm:text-2xl lg:text-[25px] font-extrabold text-white tracking-tight mb-2 leading-snug">
                {project.title}
              </h3>

              {/* Short Description */}
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed mb-3 line-clamp-2 md:line-clamp-3">
                {project.description}
              </p>

              {/* Technology Tags */}
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[11px] sm:text-xs text-gray-400">
                {project.technologies.map((tech, i) => (
                  <React.Fragment key={tech}>
                    <span className="text-cyan-300/90 hover:text-cyan-200 transition-colors">{tech}</span>
                    {i < project.technologies.length - 1 && <span className="text-gray-600">·</span>}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-2.5 lg:flex-col lg:items-end flex-shrink-0 pt-2 lg:pt-0">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2 rounded-full text-xs font-mono font-bold text-black bg-gradient-to-r from-cyan-400 to-[#00ffaa] hover:shadow-[0_0_20px_rgba(0,255,255,0.4)] transition-all flex items-center gap-1.5"
                >
                  <span>Live Demo</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}

              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-full text-xs font-mono font-semibold text-white bg-white/5 border border-white/10 hover:bg-white/10 hover:border-cyan-400/50 hover:text-cyan-300 transition-all flex items-center gap-1.5"
              >
                <Github className="w-3.5 h-3.5" />
                <span>Source Code</span>
              </a>

              {project.galleryImages && project.galleryImages.length > 0 && (
                <button
                  onClick={() => onOpenGallery(project.title, project.galleryImages || [])}
                  className="px-3.5 py-1.5 rounded-full text-xs font-mono font-medium text-cyan-300 bg-cyan-500/10 border border-cyan-500/30 hover:bg-cyan-500/20 transition-all flex items-center gap-1.5"
                >
                  <Images className="w-3.5 h-3.5" />
                  <span>{project.galleryImages.length} Slides</span>
                </button>
              )}
            </div>
          </div>

          {/* EXACTLY TWO MEDIA SLOTS (Balanced 2-Column Grid on Desktop, Stacked on Mobile) */}
          <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
            {/* SLOT 1: Primary Project Image / Screenshot */}
            <div
              className="relative aspect-video w-full rounded-2xl overflow-hidden bg-[#04060f] border border-white/10 group cursor-pointer transition-all duration-300 hover:border-cyan-400/40"
              onClick={() => onOpenGallery(project.title, allMediaImages, 0)}
            >
              <img
                src={project.slot1.src}
                alt={project.slot1.alt}
                loading="lazy"
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover block group-hover:scale-105 transition-transform duration-500 rounded-2xl"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/assets/LogoRayen.png';
                }}
              />
              {/* Subtle Vignette & Caption */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-3.5 sm:p-4 pointer-events-none">
                <div className="flex items-center justify-between pointer-events-auto">
                  <span className="text-[11px] font-mono text-cyan-300 font-semibold bg-black/60 px-2.5 py-1 rounded-md border border-white/10 backdrop-blur-md">
                    {project.slot1.caption || 'Project Overview'}
                  </span>
                  <span className="text-[11px] font-mono text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 bg-black/60 px-2 py-0.5 rounded border border-white/10">
                    <ZoomIn className="w-3 h-3 text-cyan-400" /> Enlarge
                  </span>
                </div>
              </div>
            </div>

            {/* SLOT 2: Secondary Relevant Image OR Video Demo */}
            <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-[#04060f] border border-white/10 group transition-all duration-300 hover:border-cyan-400/40">
              {project.slot2.type === 'video' && !videoError ? (
                <div className="relative w-full h-full overflow-hidden rounded-2xl bg-black">
                  <video
                    ref={videoRef}
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    poster={project.slot2.poster}
                    className="absolute inset-0 w-full h-full object-cover block rounded-2xl"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={() => setVideoError(true)}
                  >
                    <source src={project.slot2.src} type="video/webm" />
                    {project.slot2.src.endsWith('.webm') && (
                      <source src={project.slot2.src.replace('.webm', '.mp4')} type="video/mp4" />
                    )}
                    Your browser does not support HTML5 video preview.
                  </video>

                  {/* Video Badge at Top Left */}
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[10px] font-mono font-bold bg-black/75 border border-cyan-400/40 text-cyan-300 backdrop-blur-md flex items-center gap-1.5 shadow-md z-10">
                    <Video className="w-3 h-3 text-cyan-400" />
                    <span>VIDEO DEMO</span>
                  </div>

                  {/* Action Controls at Bottom Right: Fullscreen & Play/Pause */}
                  <div className="absolute bottom-3.5 right-3.5 flex items-center gap-2 z-10">
                    <button
                      onClick={handleFullscreen}
                      className="p-2.5 rounded-full bg-black/75 border border-white/20 text-white hover:bg-cyan-500/25 hover:border-cyan-400 transition-all backdrop-blur-md shadow-lg"
                      aria-label="View Fullscreen"
                      title="Fullscreen Video"
                    >
                      <Maximize2 className="w-3.5 h-3.5 text-cyan-300" />
                    </button>
                    <button
                      onClick={togglePlay}
                      className="p-2.5 rounded-full bg-black/75 border border-white/20 text-white hover:bg-cyan-500/25 hover:border-cyan-400 transition-all backdrop-blur-md shadow-lg"
                      aria-label={isPlaying ? 'Pause video' : 'Play video'}
                      title={isPlaying ? 'Pause Video' : 'Play Video'}
                    >
                      {isPlaying ? (
                        <Pause className="w-4 h-4 text-cyan-300" />
                      ) : (
                        <Play className="w-4 h-4 text-cyan-300 fill-cyan-300" />
                      )}
                    </button>
                  </div>

                  {/* Caption at Bottom Left */}
                  <div className="absolute bottom-3.5 left-3.5 pointer-events-none z-10">
                    <span className="text-[11px] font-mono text-cyan-300 font-semibold bg-black/60 px-2.5 py-1 rounded-md border border-white/10 backdrop-blur-md">
                      {project.slot2.caption || 'Live Demonstration'}
                    </span>
                  </div>
                </div>
              ) : (
                /* Slot 2 as Image (or fallback if video failed) */
                <div
                  className="w-full h-full cursor-pointer relative"
                  onClick={() => onOpenGallery(project.title, allMediaImages, 1)}
                >
                  <img
                    src={project.slot2.src || project.slot2.poster || '/assets/LogoRayen.png'}
                    alt={project.slot2.alt}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 w-full h-full object-cover block group-hover:scale-105 transition-transform duration-500 rounded-2xl"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/assets/LogoRayen.png';
                    }}
                  />
                  {/* Subtle Vignette & Caption */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-3.5 sm:p-4 pointer-events-none">
                    <div className="flex items-center justify-between pointer-events-auto">
                      <span className="text-[11px] font-mono text-cyan-300 font-semibold bg-black/60 px-2.5 py-1 rounded-md border border-white/10 backdrop-blur-md">
                        {project.slot2.caption || 'Architecture & Details'}
                      </span>
                      <span className="text-[11px] font-mono text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 bg-black/60 px-2 py-0.5 rounded border border-white/10">
                        <ZoomIn className="w-3 h-3 text-cyan-400" /> Enlarge
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectCard;
