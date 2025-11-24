import { initDatabase, runAsync } from '../config/database.js';
import { Movie } from '../models/Movie.js';
import { Season } from '../models/Season.js';

const seedDatabase = async () => {
  try {
    console.log('Initializing database...');
    await initDatabase();
    console.log('Database initialized');

    // Clear existing data
    await runAsync('DELETE FROM movies');
    await runAsync('DELETE FROM seasons');
    console.log('Cleared existing data');

    // Seed movies
    const moviesData = [
      // Action movies
      { title: 'Cybernetic Odyssey', year: 2024, rating: 8.5, category: 'Action', description: 'A thrilling sci-fi action film about futuristic technology', imageUrl: 'https://picsum.photos/seed/movie1/400/600', duration: 128, director: 'James Director', cast: 'Action Star' },
      { title: 'The Last Stand', year: 2023, rating: 7.9, category: 'Action', description: 'An intense action thriller', imageUrl: 'https://picsum.photos/seed/movie2/400/600', duration: 110, director: 'Action Director' },
      { title: 'Neon Shadows', year: 2022, rating: 8.2, category: 'Action', description: 'Neon-lit cyberpunk action', imageUrl: 'https://picsum.photos/seed/movie4/400/600', duration: 95 },
      
      // Horror movies
      { title: 'Echoes of Eternity', year: 2024, rating: 9.1, category: 'Horror', description: 'A psychological horror masterpiece', imageUrl: 'https://picsum.photos/seed/movie3/400/600', duration: 115, director: 'Horror Master' },
      { title: 'Quantum Rift', year: 2025, rating: 8.8, category: 'Horror', description: 'Interdimensional horror', imageUrl: 'https://picsum.photos/seed/movie5/400/600', duration: 120 },
      
      // Drama movies
      { title: 'Forgotten Kingdom', year: 2021, rating: 7.5, category: 'Drama', description: 'A emotional journey through kingdoms lost', imageUrl: 'https://picsum.photos/seed/movie6/400/600', duration: 145 },
      { title: 'Starlight Runner', year: 2024, rating: 8.1, category: 'Drama', description: 'A heartwarming drama about dreams', imageUrl: 'https://picsum.photos/seed/new1/400/600', duration: 135 },
      
      // Love Story movies
      { title: 'Abyssal Zone', year: 2024, rating: 7.8, category: 'Love Story', description: 'A deep ocean romance', imageUrl: 'https://picsum.photos/seed/new2/400/600', duration: 125 },
      { title: 'Whispering Woods', year: 2024, rating: 8.9, category: 'Love Story', description: 'A magical forest love tale', imageUrl: 'https://picsum.photos/seed/new6/400/600', duration: 130 },
      
      // Sci-Fi movies
      { title: 'Chronos Paradox', year: 2023, rating: 8.4, category: 'Sci-Fi', description: 'A mind-bending time travel adventure', imageUrl: 'https://picsum.photos/seed/new3/400/600', duration: 140 },
      { title: 'Solar Flare', year: 2024, rating: 8.0, category: 'Sci-Fi', description: 'Space exploration thriller', imageUrl: 'https://picsum.photos/seed/new4/400/600', duration: 118 },
      
      // Adventure movies
      { title: 'Ironclad Valor', year: 2023, rating: 7.6, category: 'Adventure', description: 'An epic adventure across continents', imageUrl: 'https://picsum.photos/seed/new5/400/600', duration: 155 }
    ];

    for (const movieData of moviesData) {
      await Movie.create(movieData);
    }
    console.log(`✓ Seeded ${moviesData.length} movies`);

    // Seed seasons
    const seasonsData = [
      { title: 'Breaking Reality', year: 2024, rating: 8.9, imageUrl: 'https://picsum.photos/seed/series1/400/600', episodes: 10 },
      { title: 'Digital Dreams', year: 2023, rating: 8.3, imageUrl: 'https://picsum.photos/seed/series2/400/600', episodes: 8 },
      { title: 'Cosmic Chronicles', year: 2024, rating: 8.7, imageUrl: 'https://picsum.photos/seed/series3/400/600', episodes: 12 },
      { title: 'The Midnight Files', year: 2023, rating: 8.1, imageUrl: 'https://picsum.photos/seed/series4/400/600', episodes: 10 },
      { title: 'Lost Horizons', year: 2024, rating: 8.5, imageUrl: 'https://picsum.photos/seed/series5/400/600', episodes: 9 }
    ];

    for (const seasonData of seasonsData) {
      await Season.create(seasonData);
    }
    console.log(`✓ Seeded ${seasonsData.length} seasons`);

    console.log('✓ Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
