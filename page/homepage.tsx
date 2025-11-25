import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { VideoPlayer, VideoGallery } from '../component/VideoPlayer';

const HomePage: React.FC = () => {
  const [videoIndex, setVideoIndex] = useState(0);

  // All available video files
  const videos = [
    { id: '1', src: '/videos/1.......Young CK - UMUGABO [Official Music Video] feat. Getts Kent _ Arnaud Gray(1080P_HD).mp4', title: 'Young CK - UMUGABO' },
    { id: '2', src: '/videos/1......Young CK - UMURAVA [Official Music Video](1080P_HD).mp4', title: 'Young CK - UMURAVA' },
    { id: '3', src: '/videos/Akana_by_Davis_D_Feat__E.T_(Official_Video)(720p).mp4', title: 'Akana by Davis D' },
    { id: '4', src: '/videos/Alan Walker _ Sasha Alex Sloan - Hero (Official Music Video) - Alan Walker (720p, h264, youtube).mp4', title: 'Alan Walker - Hero' },
    { id: '5', src: '/videos/Ali_Gatie_-_Scared_of_Love_DJ_PiTY2022Official__Music_2022(Official_Music_Video_with_Lyrics)(720p).mp4', title: 'Ali Gatie - Scared of Love' },
    { id: '6', src: '/videos/Andy BUMUNTU  LIFE IS GOOD  Visualiser   Pleasure  Pain Album_DJ_PiTY2023_1080p.mp4', title: 'Andy - BUMUNTU LIFE IS GOOD' },
  ];

  return (
    <div className="space-y-12 pb-12">
      <style>{`
        .text-shadow { text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.8); }
      `}</style>
      
      {/* Hero Video Section */}
      <section 
        className="relative h-[60vh] -mt-24 bg-cover bg-center flex items-end justify-center rounded-b-2xl overflow-hidden"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=2070&auto=format&fit=crop')` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
        <div className="relative z-10 p-8 max-w-4xl w-full mb-8">
          <h1 className="text-5xl md:text-7xl font-black text-white text-shadow mb-4 animate-fadeInUp" style={{animationDelay: '0.1s'}}>
            VideoHub
          </h1>
          <p className="text-xl text-gray-200 mb-6 text-shadow animate-fadeInUp" style={{animationDelay: '0.2s'}}>
            Discover amazing music videos and content. Stream unlimited entertainment.
          </p>
          <Link to="/videos" className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-all duration-300 transform hover:scale-105 animate-fadeInUp" style={{animationDelay: '0.3s'}}>
            Explore Videos Now →
          </Link>
        </div>
      </section>

      {/* Featured Video Player */}
      <section className="animate-fadeIn" style={{animationDelay: '0.4s'}}>
        <div className="bg-gradient-to-r from-red-600 to-orange-600 rounded-2xl p-8 mb-6">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">🔥 Featured Now</h2>
          <p className="text-red-100 text-lg">Watch the latest trending videos</p>
        </div>
        <div className="space-y-6">
          <div className="bg-black rounded-2xl overflow-hidden shadow-2xl">
            <VideoPlayer
              src={videos[videoIndex].src}
              title={videos[videoIndex].title}
            />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {videos.map((video, idx) => (
              <button
                key={video.id}
                onClick={() => setVideoIndex(idx)}
                className={`py-3 px-4 rounded-lg font-semibold text-sm transition-all duration-300 transform hover:scale-105 ${
                  videoIndex === idx
                    ? 'bg-red-600 text-white ring-3 ring-red-400 shadow-lg shadow-red-600/50'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                <div className="truncate">{video.title}</div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Video Grid - All Videos */}
      <section className="animate-fadeIn" style={{animationDelay: '0.5s'}}>
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 mb-6">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">📺 All Videos</h2>
          <p className="text-blue-100 text-lg">Browse our complete video collection</p>
        </div>
        <VideoGallery videos={videos} />
      </section>

      {/* Stats Section */}
      <section className="animate-fadeIn" style={{animationDelay: '0.6s'}}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-gradient-to-br from-red-600 to-red-800 rounded-2xl p-8 text-center transform hover:scale-105 transition-transform">
            <div className="text-4xl font-black text-white mb-2">{videos.length}</div>
            <div className="text-red-100 font-semibold">Total Videos</div>
          </div>
          <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-8 text-center transform hover:scale-105 transition-transform">
            <div className="text-4xl font-black text-white mb-2">4K</div>
            <div className="text-blue-100 font-semibold">Max Quality</div>
          </div>
          <div className="bg-gradient-to-br from-green-600 to-green-800 rounded-2xl p-8 text-center transform hover:scale-105 transition-transform">
            <div className="text-4xl font-black text-white mb-2">24/7</div>
            <div className="text-green-100 font-semibold">Always Available</div>
          </div>
          <div className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-2xl p-8 text-center transform hover:scale-105 transition-transform">
            <div className="text-4xl font-black text-white mb-2">∞</div>
            <div className="text-purple-100 font-semibold">Unlimited Streaming</div>
          </div>
        </div>
      </section>

      {/* Featured Content Categories */}
      <section className="animate-fadeIn" style={{animationDelay: '0.7s'}}>
        <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 rounded-2xl p-8 mb-6">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">✨ Categories</h2>
          <p className="text-indigo-100 text-lg">Explore videos by category</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link to="/videos" className="group bg-gradient-to-br from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 rounded-2xl p-8 text-white transform hover:scale-105 transition-all shadow-lg hover:shadow-2xl">
            <div className="text-4xl mb-4">🎵</div>
            <h3 className="text-2xl font-bold mb-2">Music Videos</h3>
            <p className="text-pink-100 group-hover:text-white transition-colors">Watch amazing music videos</p>
          </Link>
          <Link to="/movies/action" className="group bg-gradient-to-br from-orange-600 to-yellow-600 hover:from-orange-500 hover:to-yellow-500 rounded-2xl p-8 text-white transform hover:scale-105 transition-all shadow-lg hover:shadow-2xl">
            <div className="text-4xl mb-4">🎬</div>
            <h3 className="text-2xl font-bold mb-2">Action Movies</h3>
            <p className="text-orange-100 group-hover:text-white transition-colors">High-octane entertainment</p>
          </Link>
          <Link to="/seasons" className="group bg-gradient-to-br from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 rounded-2xl p-8 text-white transform hover:scale-105 transition-all shadow-lg hover:shadow-2xl">
            <div className="text-4xl mb-4">📺</div>
            <h3 className="text-2xl font-bold mb-2">TV Series</h3>
            <p className="text-cyan-100 group-hover:text-white transition-colors">Binge-worthy series</p>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;