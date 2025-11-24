import React, { useState } from 'react';

interface VideoPlayerProps {
  src: string;
  poster?: string;
  title: string;
  autoplay?: boolean;
  muted?: boolean;
  loop?: boolean;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  src,
  poster,
  title,
  autoplay = false,
  muted = false,
  loop = false,
}) => {
  return (
    <div className="w-full bg-black rounded-lg overflow-hidden shadow-lg">
      <video
        className="w-full h-auto"
        controls
        autoPlay={autoplay}
        muted={muted}
        loop={loop}
        poster={poster}
        title={title}
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="p-4 bg-gray-900">
        <h3 className="text-white font-semibold truncate">{title}</h3>
      </div>
    </div>
  );
};

interface Video {
  id: string;
  title: string;
  src: string;
  poster?: string;
}

interface VideoGalleryProps {
  videos: Video[];
  onVideoSelect?: (video: Video) => void;
  selectedVideoId?: string;
}

export const VideoGallery: React.FC<VideoGalleryProps> = ({
  videos,
  onVideoSelect,
  selectedVideoId,
}) => {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(
    videos[0] || null
  );

  const handleVideoSelect = (video: Video) => {
    setSelectedVideo(video);
    onVideoSelect?.(video);
  };

  return (
    <div className="w-full">
      {selectedVideo && (
        <div className="mb-8">
          <VideoPlayer
            src={selectedVideo.src}
            poster={selectedVideo.poster}
            title={selectedVideo.title}
          />
        </div>
      )}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {videos.map((video) => (
          <button
            key={video.id}
            onClick={() => handleVideoSelect(video)}
            className={`relative group overflow-hidden rounded-lg cursor-pointer transition-all ${
              selectedVideoId === video.id || selectedVideo?.id === video.id
                ? 'ring-4 ring-red-600'
                : 'hover:ring-2 hover:ring-red-400'
            }`}
          >
            <div className="aspect-video bg-gray-800 flex items-center justify-center">
              <div className="text-3xl text-gray-400 group-hover:text-red-600 transition-colors">
                ▶
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-2">
              <p className="text-white text-xs font-semibold line-clamp-2">
                {video.title}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
