import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Clock, ExternalLink } from 'lucide-react';
import { cn } from '../../lib/utils';

interface ThumbnailButtonProps {
  thumbnail: string;
  title?: string;
  description?: string;
  duration?: string;
  isPlaying?: boolean;
  onClick?: () => void;
  onPlayPause?: () => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'minimal' | 'card';
  showControls?: boolean;
  showDuration?: boolean;
  showTitle?: boolean;
  showDescription?: boolean;
  aspectRatio?: 'video' | 'square' | 'wide' | 'tall';
  overlayOpacity?: number;
  externalLink?: string;
}

export const ThumbnailButton: React.FC<ThumbnailButtonProps> = ({
  thumbnail,
  title,
  description,
  duration,
  isPlaying = false,
  onClick,
  onPlayPause,
  className,
  size = 'md',
  variant = 'default',
  showControls = true,
  showDuration = true,
  showTitle = true,
  showDescription = true,
  aspectRatio = 'video',
  overlayOpacity = 0.4,
  externalLink
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'h-32 text-sm';
      case 'lg':
        return 'h-64 text-lg';
      case 'xl':
        return 'h-80 text-xl';
      default:
        return 'h-48 text-base';
    }
  };

  const getAspectRatioClass = () => {
    switch (aspectRatio) {
      case 'square':
        return 'aspect-square';
      case 'wide':
        return 'aspect-[21/9]';
      case 'tall':
        return 'aspect-[9/16]';
      default:
        return 'aspect-video';
    }
  };

  const getVariantClasses = () => {
    switch (variant) {
      case 'minimal':
        return 'rounded-md shadow-sm';
      case 'card':
        return 'rounded-lg shadow-md border border-gray-200';
      default:
        return 'rounded-lg shadow-lg';
    }
  };

  const handleClick = () => {
    if (externalLink) {
      window.open(externalLink, '_blank');
    } else if (onClick) {
      onClick();
    }
  };

  const handlePlayPause = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onPlayPause) {
      onPlayPause();
    }
  };

  const handleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMuted(!isMuted);
  };

  return (
    <motion.div
      className={cn(
        'relative group cursor-pointer overflow-hidden bg-gray-100',
        getAspectRatioClass(),
        getVariantClasses(),
        getSizeClasses(),
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
    >
      {/* Thumbnail Image */}
      <div className="absolute inset-0">
        <img
          src={thumbnail}
          alt={title || 'Video thumbnail'}
          className="w-full h-full object-cover"
        />
        
        {/* Overlay */}
        <motion.div
          className="absolute inset-0 bg-black"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? overlayOpacity : 0 }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Play Button */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ 
          scale: isHovered || isPlaying ? 1 : 0.8,
          opacity: isHovered || isPlaying ? 1 : 0.8
        }}
        transition={{ duration: 0.2 }}
      >
        <motion.button
          className={cn(
            'flex items-center justify-center rounded-full bg-white shadow-lg backdrop-blur-sm',
            size === 'sm' ? 'w-12 h-12' : 
            size === 'lg' ? 'w-20 h-20' : 
            size === 'xl' ? 'w-24 h-24' : 'w-16 h-16'
          )}
          onClick={handlePlayPause}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          {isPlaying ? (
            <Pause className={cn(
              'text-gray-800',
              size === 'sm' ? 'w-4 h-4' : 
              size === 'lg' ? 'w-8 h-8' : 
              size === 'xl' ? 'w-10 h-10' : 'w-6 h-6'
            )} />
          ) : (
            <Play className={cn(
              'text-gray-800 ml-1',
              size === 'sm' ? 'w-4 h-4' : 
              size === 'lg' ? 'w-8 h-8' : 
              size === 'xl' ? 'w-10 h-10' : 'w-6 h-6'
            )} />
          )}
        </motion.button>
      </motion.div>

      {/* Duration Badge */}
      {showDuration && duration && (
        <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs font-medium flex items-center gap-1">
          <Clock className="w-3 h-3" />
          {duration}
        </div>
      )}

      {/* External Link Badge */}
      {externalLink && (
        <div className="absolute top-2 left-2 bg-blue-600 bg-opacity-90 text-white px-2 py-1 rounded text-xs font-medium flex items-center gap-1">
          <ExternalLink className="w-3 h-3" />
          Link
        </div>
      )}

      {/* Bottom Controls */}
      <AnimatePresence>
        {showControls && isHovered && (
          <motion.div
            className="absolute bottom-2 left-2 right-2 flex items-center justify-between"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center gap-2">
              <motion.button
                className="p-1 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-70 transition-colors"
                onClick={handleMute}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isMuted ? (
                  <VolumeX className="w-4 h-4" />
                ) : (
                  <Volume2 className="w-4 h-4" />
                )}
              </motion.button>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
                {isPlaying ? 'Playing' : 'Paused'}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Title and Description */}
      {variant === 'card' && (showTitle || showDescription) && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4 pt-8">
          {showTitle && title && (
            <h3 className="text-white font-semibold text-sm mb-1 line-clamp-2">
              {title}
            </h3>
          )}
          {showDescription && description && (
            <p className="text-white text-xs opacity-90 line-clamp-2">
              {description}
            </p>
          )}
        </div>
      )}
    </motion.div>
  );
};

// Preset variants for common use cases
export const VideoThumbnail: React.FC<Omit<ThumbnailButtonProps, 'variant'>> = (props) => (
  <ThumbnailButton {...props} variant="default" />
);

export const VideoCard: React.FC<Omit<ThumbnailButtonProps, 'variant'>> = (props) => (
  <ThumbnailButton {...props} variant="card" />
);

export const MinimalVideoThumbnail: React.FC<Omit<ThumbnailButtonProps, 'variant'>> = (props) => (
  <ThumbnailButton {...props} variant="minimal" />
);

export default ThumbnailButton; 