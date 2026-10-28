import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ExternalLink, Github, Play, Pause, ZoomIn, FileText, Video, Maximize2, Award } from 'lucide-react';

export interface ProjectData {
  id: string;
  number: string;
  title: string;
  category: string;
  award?: string;
  description: string;
  technologies: string[];
  githubUrl: string;
  liveUrl?: string;
  videoUrl?: string;
  videoPoster?: string;
  documentationUrl?: string;
  documentationText?: string;
  coverImage?: string;
  caption?: string;
  hasNoMedia?: boolean;
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
  const [isVideoActive, setIsVideoActive] = useState(false);

  // Framer Motion scroll tracking for the card track
  const isLast = index === total - 1;
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start start', 'end start']
  });

  // Smooth scale down and subtle dimming as subsequent cards stack over this card
  const scale = useTransform(scrollYProgress, [0, 0.85], [1, isLast ? 1 : 0.96]);
  const brightness = useTransform(scrollYProgress, [0, 0.85], [1, isLast ? 1 : 0.85]);

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

  const handleToggleVideo = () => {
    setIsVideoActive((prev) => !prev);
  };

  // Compile image list for full-screen gallery modal
  const allMediaImages = [
    ...(project.coverImage ? [project.coverImage] : []),
    ...(project.galleryImages || [])
  ];

  const handleOpenDocs = () => {
    if (project.documentationUrl) {
      window.open(project.documentationUrl, '_blank', 'noopener,noreferrer');
      return;
    }
    if (project.galleryImages && project.galleryImages.length > 0) {
      onOpenGallery(`${project.title} — Documentation & Architecture`, project.galleryImages, 0);
      return;
    }
    if (allMediaImages.length > 0) {
      onOpenGallery(`${project.title} — Architecture Overview`, allMediaImages, 0);
      return;
    }
    // Fallback: opens GitHub repository docs
    window.open(project.githubUrl, '_blank', 'noopener,noreferrer');
  };

  // Calculate sticky offset for desktop
  const stickyTop = `calc(76px + ${Math.min(index, 6) * 10}px)`;

  return (
    <div
      ref={trackRef}
      className={`relative w-full ${
        isLast ? 'pb-8 md:pb-14' : 'min-h-auto md:min-h-[82vh] pb-12 md:pb-0'
      }`}
    >
      {/* Sticky container on desktop, natural flow on mobile */}
      <div
        className="relative md:sticky w-full transition-all duration-200"
        style={{
          top: stickyTop,
          zIndex: 10 + index
        }}
      >
        <motion.div
          style={{
            scale,
            filter: isLast ? 'none' : `brightness(${brightness})`
          }}
          className="w-full glass-card rounded-3xl border border-white/10 hover:border-cyan-400/40 p-6 sm:p-7 md:p-8 shadow-[0_24px_60px_rgba(0,0,0,0.85)] bg-[#070c1b]/95 backdrop-blur-2xl transition-colors duration-300"
        >
          {/* CARD HEADER & METADATA */}
          <div className="flex flex-col gap-3">
            {/* Sequential Number + Category + Optional Award */}
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="font-mono text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-[#00ffaa]">
                {project.number}
              </span>
              <span className="text-gray-500 font-mono text-xs">/</span>
              <span className="font-mono text-[11px] sm:text-xs uppercase tracking-widest text-cyan-300 font-bold">
                {project.category}
              </span>

              {project.award && (
                <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[11px] font-mono font-bold bg-purple-500/20 text-purple-300 border border-purple-500/40 shadow-sm">
                  <Award className="w-3.5 h-3.5 text-purple-400" />
                  <span>{project.award}</span>
                </div>
              )}
            </div>

            {/* Project Title */}
            <h3 className="text-xl sm:text-2xl lg:text-[26px] font-extrabold text-white tracking-tight leading-snug">
              {project.title}
            </h3>

            {/* Description */}
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-sans">
              {project.description.startsWith('**') ? (
                <span>
                  <strong className="text-white font-bold">
                    {project.description.substring(2, project.description.indexOf('**', 2))}
                  </strong>
                  {project.description.substring(project.description.indexOf('**', 2) + 2)}
                </span>
              ) : (
                project.description
              )}
            </p>

            {/* Technology Tags */}
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-xs text-gray-400 my-1">
              {project.technologies.map((tech, i) => (
                <React.Fragment key={tech}>
                  <span className="text-cyan-300/90 hover:text-cyan-200 transition-colors">{tech}</span>
                  {i < project.technologies.length - 1 && <span className="text-gray-600">·</span>}
                </React.Fragment>
              ))}
            </div>

            {/* Action Buttons: Source Code, Documentation PDF, Live Demo / Video Demo */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              {/* Source Code */}
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono font-medium text-white bg-white/5 border border-white/15 hover:bg-white/10 hover:border-cyan-400/50 hover:text-cyan-300 hover:shadow-[0_0_12px_rgba(0,255,255,0.2)] transition-all cursor-pointer"
                title="View Source Code Repository"
              >
                <Github className="w-3.5 h-3.5 text-gray-300" />
                <span>Source Code</span>
              </a>

              {/* Documentation PDF */}
              <button
                onClick={handleOpenDocs}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono font-medium text-white bg-white/5 border border-white/15 hover:bg-white/10 hover:border-purple-400/50 hover:text-purple-300 hover:shadow-[0_0_12px_rgba(168,85,247,0.2)] transition-all cursor-pointer"
                title="Open Project Documentation / Architecture Slides"
              >
                <FileText className="w-3.5 h-3.5 text-purple-400" />
                <span>Documentation PDF</span>
              </button>

              {/* Live Demo */}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono font-medium text-white bg-white/5 border border-white/15 hover:bg-white/10 hover:border-[#00ffaa]/50 hover:text-[#00ffaa] hover:shadow-[0_0_12px_rgba(0,255,170,0.2)] transition-all cursor-pointer"
                  title="Visit Live Application"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-[#00ffaa]" />
                  <span>Live Demo</span>
                </a>
              )}

              {/* Video Demo Button */}
              {project.videoUrl && (
                <button
                  onClick={handleToggleVideo}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono font-medium transition-all cursor-pointer ${
                    isVideoActive
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/60 shadow-[0_0_14px_rgba(0,255,255,0.25)]'
                      : 'text-white bg-white/5 border border-white/15 hover:bg-white/10 hover:border-cyan-400/50 hover:text-cyan-300 hover:shadow-[0_0_12px_rgba(0,255,255,0.2)]'
                  }`}
                  title={isVideoActive ? 'Hide Video Walkthrough' : 'Play Video Walkthrough'}
                >
                  <Video className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{isVideoActive ? 'Hide Video' : 'Video Demo'}</span>
                </button>
              )}
            </div>
          </div>

          {/* COVER PHOTO & OPTIONAL VIDEO DEMO SLOT (Hidden for projects with hasNoMedia, like JCI) */}
          {!project.hasNoMedia && (project.coverImage || project.videoUrl) && (
            <div className="mt-6 w-full">
              {isVideoActive && project.videoUrl ? (
                /* Interactive Video Player — Adequately fitted to slot */
                <div className="relative aspect-[16/9] max-h-[460px] w-full rounded-2xl overflow-hidden bg-[#040714] border border-cyan-400/50 shadow-[0_0_24px_rgba(0,255,255,0.15)] flex items-center justify-center">
                  {/* Ambient backdrop glow */}
                  <img
                    src={project.videoPoster || project.coverImage || '/assets/LogoRayen.png'}
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 w-full h-full object-cover filter blur-2xl opacity-20 scale-105 pointer-events-none select-none"
                  />
                  <div className="absolute inset-0 bg-[#040714]/40 pointer-events-none select-none" />

                  <video
                    ref={videoRef}
                    autoPlay
                    controls
                    playsInline
                    poster={project.videoPoster || project.coverImage}
                    className="relative z-10 max-h-full max-w-full w-auto h-auto object-contain rounded-xl"
                  >
                    <source src={project.videoUrl} type="video/webm" />
                    {project.videoUrl.endsWith('.webm') && (
                      <source src={project.videoUrl.replace('.webm', '.mp4')} type="video/mp4" />
                    )}
                    Your browser does not support HTML5 video preview.
                  </video>
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[10px] font-mono font-bold bg-black/80 border border-cyan-400/40 text-cyan-300 backdrop-blur-md flex items-center gap-1.5 z-20">
                    <Video className="w-3 h-3 text-cyan-400" />
                    <span>VIDEO DEMO WALKTHROUGH</span>
                  </div>
                </div>
              ) : (
                /* Primary Cover Photo — Adequately fitted to slot */
                <div
                  className="relative aspect-[16/9] max-h-[460px] w-full rounded-2xl overflow-hidden bg-[#040714] border border-white/10 group cursor-pointer transition-all duration-300 hover:border-cyan-400/40 hover:shadow-[0_12px_36px_rgba(0,0,0,0.6)] flex items-center justify-center"
                  onClick={() => onOpenGallery(project.title, allMediaImages, 0)}
                  title="Click to inspect high-resolution preview"
                >
                  {/* Ambient background blur that matches project palette and fills the slot */}
                  <img
                    src={project.coverImage || '/assets/LogoRayen.png'}
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 w-full h-full object-cover filter blur-2xl opacity-20 scale-105 pointer-events-none select-none"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 bg-[#040714]/40 pointer-events-none select-none" />

                  {/* Main Sharp Image — 100% adequately proportioned to slot size without cropping */}
                  <img
                    src={project.coverImage || '/assets/LogoRayen.png'}
                    alt={project.title}
                    loading="lazy"
                    className="relative z-10 max-h-full max-w-full w-auto h-auto object-contain p-2 sm:p-3 md:p-4 group-hover:scale-[1.02] transition-transform duration-500 rounded-xl"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/assets/LogoRayen.png';
                    }}
                  />

                  {/* Caption badge and Enlarge hint */}
                  <div className="absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-black/85 via-black/40 to-transparent flex items-center justify-between p-3 sm:p-4 pointer-events-none">
                    <span className="text-[11px] sm:text-xs font-mono text-cyan-300 font-semibold bg-black/80 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg border border-white/10 backdrop-blur-md pointer-events-auto">
                      {project.caption || 'Project Overview & Architecture'}
                    </span>
                    <span className="text-[11px] sm:text-xs font-mono text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5 bg-black/80 px-2 sm:px-2.5 py-1 rounded-lg border border-white/10 pointer-events-auto">
                      <ZoomIn className="w-3.5 h-3.5 text-cyan-400" /> Enlarge
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectCard;
