import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ThumbnailButton } from './thumbnail-button';
import { Play, Grid, List, Filter, Search, X } from 'lucide-react';
import { cn } from '../../lib/utils';

interface VideoItem {
  id: string;
  title: string;
  description?: string;
  thumbnail: string;
  duration?: string;
  src?: string;
  externalLink?: string;
  category?: string;
  tags?: string[];
}

interface VideoGalleryProps {
  videos: VideoItem[];
  columns?: 1 | 2 | 3 | 4 | 5;
  layout?: 'grid' | 'list';
  showSearch?: boolean;
  showFilter?: boolean;
  showCategories?: boolean;
  thumbnailSize?: 'sm' | 'md' | 'lg' | 'xl';
  thumbnailVariant?: 'default' | 'minimal' | 'card';
  onVideoClick?: (video: VideoItem) => void;
  onVideoPlay?: (video: VideoItem) => void;
  className?: string;
  title?: string;
  description?: string;
}

export const VideoGallery: React.FC<VideoGalleryProps> = ({
  videos,
  columns = 3,
  layout = 'grid',
  showSearch = false,
  showFilter = false,
  showCategories = true,
  thumbnailSize = 'md',
  thumbnailVariant = 'card',
  onVideoClick,
  onVideoPlay,
  className,
  title,
  description
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentLayout, setCurrentLayout] = useState(layout);
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);

  // Filter videos based on search and category
  const filteredVideos = videos.filter(video => {
    const matchesSearch = !searchTerm || 
      video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      video.description?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = !selectedCategory || video.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Get unique categories
  const categories = Array.from(new Set(videos.map(v => v.category).filter(Boolean)));

  const getColumnsClass = () => {
    switch (columns) {
      case 1: return 'grid-cols-1';
      case 2: return 'grid-cols-1 md:grid-cols-2';
      case 3: return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
      case 4: return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4';
      case 5: return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5';
      default: return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
    }
  };

  const handleVideoClick = (video: VideoItem) => {
    if (onVideoClick) {
      onVideoClick(video);
    }
  };

  const handleVideoPlay = (video: VideoItem) => {
    setPlayingVideo(video.id === playingVideo ? null : video.id);
    if (onVideoPlay) {
      onVideoPlay(video);
    }
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory(null);
  };

  return (
    <div className={cn('w-full space-y-6', className)}>
      {/* Header */}
      {(title || description) && (
        <div className="text-center space-y-2">
          {title && (
            <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          )}
          {description && (
            <p className="text-gray-600 max-w-2xl mx-auto">{description}</p>
          )}
        </div>
      )}

      {/* Controls */}
      {(showSearch || showFilter || showCategories) && (
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          {/* Search */}
          {showSearch && (
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search videos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
              />
            </div>
          )}

          {/* Categories */}
          {showCategories && categories.length > 0 && (
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  !selectedCategory
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All
              </button>
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    selectedCategory === category
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          )}

          {/* Layout Toggle */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentLayout('grid')}
              className={`p-2 rounded-md ${
                currentLayout === 'grid'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentLayout('list')}
              className={`p-2 rounded-md ${
                currentLayout === 'list'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Active Filters */}
      {(searchTerm || selectedCategory) && (
        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-500">Filters:</span>
          {searchTerm && (
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full flex items-center gap-1">
              Search: "{searchTerm}"
              <button
                onClick={() => setSearchTerm('')}
                className="text-blue-600 hover:text-blue-800"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {selectedCategory && (
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full flex items-center gap-1">
              Category: {selectedCategory}
              <button
                onClick={() => setSelectedCategory(null)}
                className="text-blue-600 hover:text-blue-800"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          <button
            onClick={clearFilters}
            className="text-blue-600 hover:text-blue-800 underline"
          >
            Clear all
          </button>
        </div>
      )}

      {/* Videos Grid/List */}
      {filteredVideos.length === 0 ? (
        <div className="text-center py-12">
          <Play className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">No videos found</p>
          {(searchTerm || selectedCategory) && (
            <button
              onClick={clearFilters}
              className="text-blue-600 hover:text-blue-800 underline mt-2"
            >
              Clear filters to see all videos
            </button>
          )}
        </div>
      ) : (
        <motion.div
          className={cn(
            currentLayout === 'grid' 
              ? `grid ${getColumnsClass()} gap-6`
              : 'space-y-4'
          )}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {filteredVideos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={cn(
                currentLayout === 'list' && 'flex gap-4 items-start'
              )}
            >
              <div className={cn(
                currentLayout === 'list' && 'w-48 flex-shrink-0'
              )}>
                <ThumbnailButton
                  thumbnail={video.thumbnail}
                  title={video.title}
                  description={video.description}
                  duration={video.duration}
                  size={currentLayout === 'list' ? 'sm' : thumbnailSize}
                  variant={thumbnailVariant}
                  isPlaying={playingVideo === video.id}
                  onClick={() => handleVideoClick(video)}
                  onPlayPause={() => handleVideoPlay(video)}
                  externalLink={video.externalLink}
                  showTitle={currentLayout === 'grid'}
                  showDescription={currentLayout === 'grid'}
                />
              </div>
              
              {currentLayout === 'list' && (
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2">
                    {video.title}
                  </h3>
                  {video.description && (
                    <p className="text-gray-600 text-sm line-clamp-3 mb-3">
                      {video.description}
                    </p>
                  )}
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    {video.duration && (
                      <span className="flex items-center gap-1">
                        <Play className="w-3 h-3" />
                        {video.duration}
                      </span>
                    )}
                    {video.category && (
                      <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                        {video.category}
                      </span>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Results Count */}
      {filteredVideos.length > 0 && (
        <div className="text-center text-sm text-gray-500">
          Showing {filteredVideos.length} of {videos.length} videos
        </div>
      )}
    </div>
  );
};

export default VideoGallery; 