import React from 'react';
import { VideoGallery } from '../component/VideoPlayer';

const VideosPage: React.FC = () => {
  const videos = [
    {
      id: '1',
      title: 'Young CK - UMUGABO',
      src: '/videos/1.......Young CK - UMUGABO [Official Music Video] feat. Getts Kent _ Arnaud Gray(1080P_HD).mp4',
    },
    {
      id: '2',
      title: 'Young CK - UMURAVA',
      src: '/videos/1......Young CK - UMURAVA [Official Music Video](1080P_HD).mp4',
    },
    {
      id: '3',
      title: 'Akana by Davis D',
      src: '/videos/Akana_by_Davis_D_Feat__E.T_(Official_Video)(720p).mp4',
    },
    {
      id: '4',
      title: 'Alan Walker - Hero',
      src: '/videos/Alan Walker _ Sasha Alex Sloan - Hero (Official Music Video) - Alan Walker (720p, h264, youtube).mp4',
    },
    {
      id: '5',
      title: 'Ali Gatie - Scared of Love',
      src: '/videos/Ali_Gatie_-_Scared_of_Love_DJ_PiTY2022Official__Music_2022(Official_Music_Video_with_Lyrics)(720p).mp4',
    },
    {
      id: '6',
      title: 'Andy - BUMUNTU LIFE IS GOOD',
      src: '/videos/Andy BUMUNTU  LIFE IS GOOD  Visualiser   Pleasure  Pain Album_DJ_PiTY2023_1080p.mp4',
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white pt-20 pb-16">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-red-600 to-red-800 py-12 px-4 mb-12">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Video Gallery</h1>
          <p className="text-red-100 text-lg">
            Watch amazing music videos and content
          </p>
        </div>
      </div>

      {/* Videos Section */}
      <div className="max-w-6xl mx-auto px-4">
        <VideoGallery videos={videos} />
      </div>

      {/* Stats Section */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
        <div className="bg-gray-800 rounded-lg p-6 text-center">
          <div className="text-3xl font-bold text-red-600 mb-2">
            {videos.length}
          </div>
          <p className="text-gray-300">Total Videos</p>
        </div>
        <div className="bg-gray-800 rounded-lg p-6 text-center">
          <div className="text-3xl font-bold text-red-600 mb-2">4K</div>
          <p className="text-gray-300">Best Quality</p>
        </div>
        <div className="bg-gray-800 rounded-lg p-6 text-center">
          <div className="text-3xl font-bold text-red-600 mb-2">HD</div>
          <p className="text-gray-300">Crystal Clear</p>
        </div>
      </div>
    </div>
  );
};

export default VideosPage;
