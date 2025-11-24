import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { movieAPI } from '../src/api';
import { VideoPlayer } from '../component/VideoPlayer';

interface Movie {
  id: string;
  title: string;
  category: string;
  year: number;
  imageUrl?: string;
  rating: number;
  description?: string;
}

interface Video {
  id: string;
  title: string;
  src: string;
  poster?: string;
}

const StarIcon: React.FC<{className: string}> = ({className}) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
    </svg>
);

const MovieCard: React.FC<{ movie: Movie; onSelect: (movie: Movie) => void }> = ({ movie, onSelect }) => (
    <div 
      onClick={() => onSelect(movie)}
      className="relative bg-gray-900 rounded-lg overflow-hidden shadow-lg hover:shadow-red-500/50 transition-all duration-300 group cursor-pointer h-full hover:scale-105"
    >
        <img 
          src={movie.imageUrl || `https://picsum.photos/seed/movie${movie.id}/400/600`}
          alt={movie.title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-in-out" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
             <div className="transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-in-out">
                <h3 className="text-lg font-bold truncate">{movie.title}</h3>
                <div className="flex justify-between items-center text-sm text-gray-300 mt-2">
                    <span>{movie.year}</span>
                    <div className="flex items-center gap-1">
                        <StarIcon className="w-4 h-4 text-yellow-400"/>
                        <span>{movie.rating.toFixed(1)}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

const MoviePage: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);

  const formatCategory = (slug: string | undefined) => {
    if (!slug) return 'Movies';
    return slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const pageTitle = formatCategory(category);

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

  // Mock movie data for each category
  const mockMovies: Record<string, Movie[]> = {
    'action': [
      { id: '1', title: 'The Last Stand', category: 'action', year: 2023, rating: 7.9, description: 'An intense action-packed thriller' },
      { id: '2', title: 'Cyber Assault', category: 'action', year: 2024, rating: 8.3, description: 'High-tech action adventure' },
      { id: '3', title: 'Final Reckoning', category: 'action', year: 2023, rating: 7.8, description: 'Epic action showdown' },
      { id: '4', title: 'Neon Shadows', category: 'action', year: 2022, rating: 8.2, description: 'Dark and gritty action' },
      { id: '5', title: 'Iron Fist', category: 'action', year: 2024, rating: 8.0, description: 'Martial arts action' },
      { id: '6', title: 'Explosive Force', category: 'action', year: 2023, rating: 7.6, description: 'Action-packed adventure' },
    ],
    'horror': [
      { id: '7', title: 'Abyssal Terror', category: 'horror', year: 2024, rating: 7.8, description: 'Terrifying horror' },
      { id: '8', title: 'Forgotten Souls', category: 'horror', year: 2023, rating: 8.1, description: 'Supernatural horror' },
      { id: '9', title: 'The Haunting', category: 'horror', year: 2023, rating: 7.5, description: 'Psychological horror' },
      { id: '10', title: 'Cursed', category: 'horror', year: 2024, rating: 8.4, description: 'Dark horror tale' },
      { id: '11', title: 'Shadow Creatures', category: 'horror', year: 2023, rating: 7.9, description: 'Monster horror' },
      { id: '12', title: 'Nightmare Realm', category: 'horror', year: 2024, rating: 8.2, description: 'Surreal horror' },
    ],
    'love-story': [
      { id: '13', title: 'Hearts Entwined', category: 'love-story', year: 2024, rating: 8.7, description: 'Romantic love story' },
      { id: '14', title: 'Echoes of Love', category: 'love-story', year: 2023, rating: 8.5, description: 'Emotional romance' },
      { id: '15', title: 'Forever Together', category: 'love-story', year: 2024, rating: 8.3, description: 'Touching love tale' },
      { id: '16', title: 'Second Chances', category: 'love-story', year: 2023, rating: 8.1, description: 'Second chance romance' },
      { id: '17', title: 'Under the Stars', category: 'love-story', year: 2024, rating: 8.6, description: 'Romantic adventure' },
      { id: '18', title: 'Lost Love Found', category: 'love-story', year: 2023, rating: 8.4, description: 'Finding love again' },
    ],
    'true-event': [
      { id: '19', title: 'The Real Story', category: 'true-event', year: 2023, rating: 8.8, description: 'Based on true events' },
      { id: '20', title: 'Unbelievable', category: 'true-event', year: 2024, rating: 8.6, description: 'True crime drama' },
      { id: '21', title: 'Against All Odds', category: 'true-event', year: 2023, rating: 8.4, description: 'Inspiring true story' },
      { id: '22', title: 'The Witness', category: 'true-event', year: 2024, rating: 8.7, description: 'True events unfold' },
      { id: '23', title: 'Behind the Curtain', category: 'true-event', year: 2023, rating: 8.5, description: 'Revealing truth' },
      { id: '24', title: 'Fateful Day', category: 'true-event', year: 2024, rating: 8.3, description: 'True life tragedy' },
    ],
    '18-plus': [
      { id: '25', title: 'Adult Drama 1', category: '18-plus', year: 2024, rating: 8.2, description: 'Mature content drama' },
      { id: '26', title: 'Adult Drama 2', category: '18-plus', year: 2023, rating: 8.0, description: 'Mature storyline' },
      { id: '27', title: 'Adult Drama 3', category: '18-plus', year: 2024, rating: 8.5, description: 'Adult themes' },
      { id: '28', title: 'Adult Drama 4', category: '18-plus', year: 2023, rating: 7.9, description: 'Mature content' },
      { id: '29', title: 'Adult Drama 5', category: '18-plus', year: 2024, rating: 8.3, description: 'Advanced drama' },
      { id: '30', title: 'Adult Drama 6', category: '18-plus', year: 2023, rating: 8.1, description: 'Mature thriller' },
    ],
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        if (category) {
          const response = await movieAPI.getByCategory(category, 50);
          const fetchedMovies = response.data || [];
          
          if (fetchedMovies.length > 0) {
            setMovies(fetchedMovies);
            setSelectedMovie(fetchedMovies[0]);
          } else {
            // Fallback to mock data
            const categoryKey = category.toLowerCase();
            const categoryMovies = mockMovies[categoryKey] || [];
            setMovies(categoryMovies);
            if (categoryMovies.length > 0) {
              setSelectedMovie(categoryMovies[0]);
            }
          }
        }
      } catch (err) {
        console.error('Error fetching movies:', err);
        const categoryKey = category?.toLowerCase() || '';
        const categoryMovies = mockMovies[categoryKey] || [];
        setMovies(categoryMovies);
        if (categoryMovies.length > 0) {
          setSelectedMovie(categoryMovies[0]);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [category]);

  return (
    <div className="space-y-8 animate-fadeIn pb-12">
      {/* Category Header */}
      <div className="bg-gradient-to-r from-red-600 to-red-800 py-8 px-4 rounded-lg">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">{pageTitle}</h1>
        <p className="text-red-100">Explore {movies.length} amazing {pageTitle.toLowerCase()}</p>
      </div>

      {/* Video Player for Selected Movie */}
      {selectedMovie && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Now Playing: {selectedMovie.title}</h2>
          <div className="bg-black rounded-lg overflow-hidden">
            <VideoPlayer
              src={allVideos[(parseInt(selectedMovie.id) - 1) % allVideos.length].src}
              title={selectedMovie.title}
            />
          </div>
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-xl font-bold text-white mb-2">{selectedMovie.title}</h3>
            <div className="flex items-center gap-4 text-sm text-gray-300 mb-3">
              <span>{selectedMovie.year}</span>
              <div className="flex items-center gap-1">
                <StarIcon className="w-4 h-4 text-yellow-400"/>
                <span>{selectedMovie.rating.toFixed(1)}</span>
              </div>
            </div>
            <p className="text-gray-300">{selectedMovie.description || 'An amazing movie from this category.'}</p>
          </div>
        </div>
      )}

      {/* Movies Grid */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-white">All {pageTitle}</h2>
        {loading ? (
          <div className="text-center text-gray-400 py-12">Loading movies...</div>
        ) : movies.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {movies.map((movie, index) => (
              <div 
                key={movie.id}
                className="aspect-[2/3] animate-fadeInUp"
                style={{ animationDelay: `${0.05 * index}s` }}
              >
                <MovieCard movie={movie} onSelect={setSelectedMovie} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-400 py-12">No movies found in this category.</div>
        )}
      </div>
    </div>
  );
};

export default MoviePage;