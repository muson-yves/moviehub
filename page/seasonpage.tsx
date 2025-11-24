import React, { useState, useEffect } from 'react';
import { VideoPlayer } from '../component/VideoPlayer';
import { seasonAPI } from '../src/api';

interface Season {
  id: string;
  title: string;
  season_number: number;
  episodes: number;
  release_year: number;
  rating: number;
}

interface Video {
  id: string;
  title: string;
  src: string;
}

const StarIcon: React.FC<{className: string}> = ({className}) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
    </svg>
);

const SeasonCard: React.FC<{ season: Season; onSelect: (season: Season) => void; isSelected: boolean }> = ({ season, onSelect, isSelected }) => (
    <div 
      onClick={() => onSelect(season)}
      className={`relative bg-gray-900 rounded-lg overflow-hidden shadow-lg transition-all duration-300 group cursor-pointer h-full hover:scale-105 ${
        isSelected ? 'ring-4 ring-red-600 shadow-red-600/50' : 'hover:shadow-red-500/50'
      }`}
    >
        <div className="w-full h-full bg-gradient-to-br from-red-600 to-red-800 p-6 flex flex-col justify-between group-hover:from-red-500 group-hover:to-red-700 transition-all duration-300">
            <div>
                <h3 className="text-2xl font-bold text-white mb-2">Season {season.season_number}</h3>
                <p className="text-red-100 font-semibold mb-2">{season.title}</p>
            </div>
            <div className="space-y-2">
                <div className="flex justify-between text-sm text-red-100">
                    <span>{season.episodes} Episodes</span>
                    <span>{season.release_year}</span>
                </div>
                <div className="flex items-center gap-1">
                    <StarIcon className="w-4 h-4 text-yellow-400"/>
                    <span className="text-red-100">{season.rating.toFixed(1)}</span>
                </div>
            </div>
        </div>
    </div>
);

const SeasonPage: React.FC = () => {
  const [seasons, setSeasons] = useState<Season[]>([]);
  const [selectedSeason, setSelectedSeason] = useState<Season | null>(null);
  const [loading, setLoading] = useState(true);

  // All available video files
  const allVideos: Video[] = [
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

  // Mock seasons data
  const mockSeasons: Season[] = [
    { id: '1', title: 'The Beginning', season_number: 1, episodes: 10, release_year: 2022, rating: 8.5 },
    { id: '2', title: 'Rising Tensions', season_number: 2, episodes: 12, release_year: 2023, rating: 8.8 },
    { id: '3', title: 'The Reckoning', season_number: 3, episodes: 11, release_year: 2023, rating: 9.1 },
    { id: '4', title: 'New Horizons', season_number: 4, episodes: 10, release_year: 2024, rating: 8.6 },
    { id: '5', title: 'Final Stand', season_number: 5, episodes: 9, release_year: 2024, rating: 8.9 },
  ];

  useEffect(() => {
    const fetchSeasons = async () => {
      try {
        setLoading(true);
        const response = await seasonAPI.getAll(50);
        const fetchedSeasons = response.data || [];
        
        if (fetchedSeasons.length > 0) {
          setSeasons(fetchedSeasons);
          setSelectedSeason(fetchedSeasons[0]);
        } else {
          setSeasons(mockSeasons);
          setSelectedSeason(mockSeasons[0]);
        }
      } catch (err) {
        console.error('Error fetching seasons:', err);
        setSeasons(mockSeasons);
        setSelectedSeason(mockSeasons[0]);
      } finally {
        setLoading(false);
      }
    };

    fetchSeasons();
  }, []);

  return (
    <div className="space-y-8 animate-fadeIn pb-12">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 py-8 px-4 rounded-lg">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">TV Show Seasons</h1>
        <p className="text-blue-100">Watch all your favorite seasons with video content</p>
      </div>

      {/* Video Player for Selected Season */}
      {selectedSeason && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Now Playing: {selectedSeason.title}</h2>
          <div className="bg-black rounded-lg overflow-hidden">
            <VideoPlayer
              src={allVideos[(parseInt(selectedSeason.id) - 1) % allVideos.length].src}
              title={`Season ${selectedSeason.season_number}: ${selectedSeason.title}`}
            />
          </div>
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-2xl font-bold text-white mb-2">Season {selectedSeason.season_number}: {selectedSeason.title}</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-gray-300">
              <div>
                <p className="text-gray-400 text-sm">Episodes</p>
                <p className="text-xl font-bold text-white">{selectedSeason.episodes}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Release Year</p>
                <p className="text-xl font-bold text-white">{selectedSeason.release_year}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Rating</p>
                <div className="flex items-center gap-2">
                  <StarIcon className="w-5 h-5 text-yellow-400"/>
                  <p className="text-xl font-bold text-white">{selectedSeason.rating.toFixed(1)}</p>
                </div>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Status</p>
                <p className="text-xl font-bold text-green-400">Available</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Seasons Grid */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-white">All Seasons</h2>
        {loading ? (
          <div className="text-center text-gray-400 py-12">Loading seasons...</div>
        ) : seasons.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {seasons.map((season, index) => (
              <div 
                key={season.id}
                className="aspect-square animate-fadeInUp"
                style={{ animationDelay: `${0.05 * index}s` }}
              >
                <SeasonCard 
                  season={season} 
                  onSelect={setSelectedSeason}
                  isSelected={selectedSeason?.id === season.id}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-400 py-12">No seasons available.</div>
        )}
      </div>
    </div>
  );
};

export default SeasonPage;