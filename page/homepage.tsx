import React, { useState, useEffect } from 'react';
import { movieAPI } from '../src/api';

const StarIcon: React.FC<{className: string}> = ({className}) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
    </svg>
);

const MovieCard: React.FC<{ imageUrl: string; title: string; year: string; rating: number }> = ({ imageUrl, title, year, rating }) => (
    <div className="relative bg-gray-900 rounded-lg overflow-hidden shadow-lg hover:shadow-blue-500/50 transition-shadow duration-300 group cursor-pointer h-full">
        <img src={imageUrl} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
             <div className="transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-in-out">
                <h3 className="text-lg font-bold truncate">{title}</h3>
                <div className="flex justify-between items-center text-sm text-gray-300 mt-1">
                    <span>{year}</span>
                    <div className="flex items-center gap-1">
                        <StarIcon className="w-4 h-4 text-yellow-400"/>
                        <span>{rating.toFixed(1)}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

const SearchIcon: React.FC<{className: string}> = ({className}) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
);


const HomePage: React.FC = () => {
  const [featuredMovies, setFeaturedMovies] = useState<any[]>([]);
  const [newlyAddedMovies, setNewlyAddedMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fallback mock data
  const mockFeaturedMovies = [
    { id: '1', title: 'Cybernetic Odyssey', year: 2024, imageUrl: 'https://picsum.photos/seed/movie1/400/600', rating: 8.5 },
    { id: '2', title: 'The Last Stand', year: 2023, imageUrl: 'https://picsum.photos/seed/movie2/400/600', rating: 7.9 },
    { id: '3', title: 'Echoes of Eternity', year: 2024, imageUrl: 'https://picsum.photos/seed/movie3/400/600', rating: 9.1 },
    { id: '4', title: 'Neon Shadows', year: 2022, imageUrl: 'https://picsum.photos/seed/movie4/400/600', rating: 8.2 },
    { id: '5', title: 'Quantum Rift', year: 2025, imageUrl: 'https://picsum.photos/seed/movie5/400/600', rating: 8.8 },
    { id: '6', title: 'Forgotten Kingdom', year: 2021, imageUrl: 'https://picsum.photos/seed/movie6/400/600', rating: 7.5 },
  ];

  const mockNewlyAddedMovies = [
    { id: '7', title: 'Starlight Runner', year: 2024, imageUrl: 'https://picsum.photos/seed/new1/400/600', rating: 8.1 },
    { id: '8', title: 'Abyssal Zone', year: 2024, imageUrl: 'https://picsum.photos/seed/new2/400/600', rating: 7.8 },
    { id: '9', title: 'Chronos Paradox', year: 2023, imageUrl: 'https://picsum.photos/seed/new3/400/600', rating: 8.4 },
    { id: '10', title: 'Solar Flare', year: 2024, imageUrl: 'https://picsum.photos/seed/new4/400/600', rating: 8.0 },
    { id: '11', title: 'Ironclad Valor', year: 2023, imageUrl: 'https://picsum.photos/seed/new5/400/600', rating: 7.6 },
    { id: '12', title: 'Whispering Woods', year: 2024, imageUrl: 'https://picsum.photos/seed/new6/400/600', rating: 8.9 },
  ];

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        // Fetch all movies and split them
        const response = await movieAPI.getAll(50);
        const movies = response.data || [];
        
        if (movies.length > 0) {
          // Show first 6 as featured
          setFeaturedMovies(movies.slice(0, 6));
          // Show next 6 as newly added
          setNewlyAddedMovies(movies.slice(6, 12));
        } else {
          // Fallback to mock data if no movies in database
          setFeaturedMovies(mockFeaturedMovies);
          setNewlyAddedMovies(mockNewlyAddedMovies);
        }
      } catch (err) {
        console.error('Error fetching movies:', err);
        setError('Failed to load movies');
        // Fallback to mock data on error
        setFeaturedMovies(mockFeaturedMovies);
        setNewlyAddedMovies(mockNewlyAddedMovies);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="space-y-16">
      <style>{`
        .text-shadow { text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.8); }
      `}</style>
      
      <section 
        className="relative h-[70vh] -mt-24 bg-cover bg-center flex items-center justify-center text-center rounded-b-xl overflow-hidden"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1542204165-65bf26472b9b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')` }}
      >
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="relative z-10 p-4 max-w-3xl w-full">
          <h1 className="text-4xl md:text-6xl font-bold text-white text-shadow mb-4 animate-fadeInUp" style={{animationDelay: '0.1s'}}>Find Your Next Favorite Movie</h1>
          <p className="text-lg text-gray-200 mb-8 text-shadow animate-fadeInUp" style={{animationDelay: '0.2s'}}>Explore thousands of movies and series. All in one place.</p>
          <div className="relative animate-fadeInUp" style={{animationDelay: '0.3s'}}>
            <input 
              type="text" 
              placeholder="Search for a movie, tv show..."
              className="w-full py-4 pl-12 pr-4 rounded-full bg-white/20 backdrop-blur-sm text-white placeholder-gray-300 border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
            />
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-6 w-6 text-gray-300"/>
          </div>
        </div>
      </section>

      <section className="animate-fadeIn" style={{animationDelay: '0.4s'}}>
        <h2 className="text-3xl font-bold text-blue-400 mb-6 border-l-4 border-blue-500 pl-4">Featured Movies</h2>
        {loading ? (
          <div className="text-center text-gray-400">Loading movies...</div>
        ) : error ? (
          <div className="text-center text-red-400">{error}</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
            {(featuredMovies.length > 0 ? featuredMovies : mockFeaturedMovies).map((movie, index) => (
              <div 
                key={movie.id || movie.title} 
                className="aspect-[2/3] animate-fadeInUp"
                style={{ animationDelay: `${0.1 * index + 0.5}s` }}
              >
                <MovieCard {...movie} year={movie.year.toString()} />
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="animate-fadeIn" style={{animationDelay: '0.6s'}}>
        <h2 className="text-3xl font-bold text-blue-400 mb-6 border-l-4 border-blue-500 pl-4">Newly Added</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {(newlyAddedMovies.length > 0 ? newlyAddedMovies : mockNewlyAddedMovies).map((movie, index) => (
            <div 
              key={movie.id || movie.title} 
              className="aspect-[2/3] animate-fadeInUp"
              style={{ animationDelay: `${0.1 * index + 0.7}s` }}
            >
              <MovieCard {...movie} year={movie.year.toString()} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;