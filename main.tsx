import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';

// Movie Card Component
const MovieCard = ({ title, year, rating, image }: any) => (
  <div className="group relative bg-gray-900 rounded-lg overflow-hidden shadow-lg hover:shadow-blue-500/50 transition-all duration-300 hover:-translate-y-2 cursor-pointer h-full">
    <img src={image} alt={title} className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300" />
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
      <div className="w-full">
        <h3 className="text-white font-bold">{title}</h3>
        <div className="flex justify-between text-sm text-gray-300 mt-2">
          <span>{year}</span>
          <span>⭐ {rating}</span>
        </div>
      </div>
    </div>
  </div>
);

// Header Component
const Header = ({ currentPage, setCurrentPage, selectedCategory, setSelectedCategory }: any) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navItems = [
    { label: 'Home', id: 'home', hasDropdown: false },
    { label: 'Movies', id: 'movies', hasDropdown: true },
    { label: 'Seasons', id: 'seasons', hasDropdown: false },
    { label: 'Contact', id: 'contact', hasDropdown: false },
  ];

  const movieCategories = [
    { name: 'All Movies', id: 'all' },
    { name: 'Action', id: 'action' },
    { name: 'Horror', id: 'horror' },
    { name: 'Love Story', id: 'love-story' },
    { name: 'True Event', id: 'true-event' },
    { name: '+18', id: '18plus' },
  ];

  const handleNavClick = (id: string) => {
    setCurrentPage(id);
    setIsMobileMenuOpen(false);
  };

  const handleCategoryClick = (categoryId: string, categoryName: string) => {
    setCurrentPage('movies');
    setSelectedCategory({ id: categoryId, name: categoryName });
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-cover bg-center backdrop-blur-md border-b border-blue-500/20 shadow-lg shadow-blue-500/10" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1542204165-65bf26472b9b?q=80&w=2070&auto=format&fit=crop')` }}>
      {/* Background overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/85 to-black/90"></div>
      
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4 relative z-10">
        {/* Logo */}
        <div
          className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity flex-shrink-0"
          onClick={() => handleNavClick('home')}
        >
          <div className="h-8 w-8 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center text-white font-bold text-sm">🎬</div>
          <span className="font-bold text-lg bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent hidden sm:inline">MovieHub</span>
        </div>

        {/* Search Box */}
        <div className="hidden md:flex flex-1 max-w-xs">
          <div className="relative w-full group">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-2 px-3 pl-8 rounded-full bg-gray-800/60 backdrop-blur text-white text-sm placeholder-gray-400 border border-gray-700/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:bg-gray-800/80"
            />
            <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-sm">🔍</span>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden sm:flex gap-1">
          {navItems.map((item) => (
            <div key={item.id} className="relative group">
              <button
                onClick={() => handleNavClick(item.id)}
                className={`px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-1 ${
                  currentPage === item.id
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/50'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
              >
                {item.label}
                {item.hasDropdown && <span className="text-xs">▼</span>}
              </button>

              {/* Dropdown Menu */}
              {item.hasDropdown && (
                <div className="absolute left-0 mt-0 w-56 bg-gray-900 border border-blue-500/30 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 py-2 z-50">
                  {movieCategories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => handleCategoryClick(cat.id, cat.name)}
                      className={`block w-full text-left px-4 py-2 transition-colors ${
                        selectedCategory?.id === cat.id
                          ? 'bg-blue-600 text-white'
                          : 'text-gray-300 hover:bg-blue-600 hover:text-white'
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="sm:hidden p-2 rounded-lg hover:bg-gray-800 transition-colors text-gray-300"
        >
          {isMobileMenuOpen ? '✕' : '☰'}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="sm:hidden bg-gray-900/95 backdrop-blur border-b border-blue-500/20 py-4 animate-in fade-in slide-in-from-top-2 duration-300 relative z-10">
          {/* Mobile Search */}
          <div className="px-6 pb-4 md:hidden">
            <input
              type="text"
              placeholder="Search movies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-2 px-3 pl-8 rounded-full bg-gray-800 text-white text-sm placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 relative"
              style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27%23888%27 stroke-width=%272%27%3E%3Ccircle cx=%2711%27 cy=%2711%27 r=%278%27%3E%3C/circle%3E%3Cpath d=%27m21 21-4.35-4.35%27%3E%3C/path%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: '8px center', backgroundSize: '16px'}}
            />
          </div>
          
          {navItems.map((item) => (
            <div key={item.id}>
              <button
                onClick={() => handleNavClick(item.id)}
                className="w-full text-left px-6 py-3 text-gray-300 hover:bg-blue-600 hover:text-white transition-colors"
              >
                {item.label}
              </button>
              {item.hasDropdown && (
                <div className="pl-6 bg-gray-800/50">
                  {movieCategories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => handleCategoryClick(cat.id, cat.name)}
                      className={`w-full text-left px-6 py-2 text-sm transition-colors ${
                        selectedCategory?.id === cat.id
                          ? 'bg-blue-600 text-white'
                          : 'text-gray-400 hover:text-blue-400'
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </header>
  );
};

// Home Page
const HomePage = () => (
  <div className="space-y-16 animate-in fade-in duration-500">
    <section
      className="relative h-[60vh] -mt-24 bg-cover bg-center flex items-center justify-center text-center rounded-b-2xl overflow-hidden group"
      style={{ backgroundImage: `url('https://images.unsplash.com/photo-1542204165-65bf26472b9b?q=80&w=2070&auto=format&fit=crop')` }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/80"></div>
      <div className="relative z-10 p-4 max-w-3xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 animate-in fade-in slide-in-from-bottom-8 duration-700">
          Find Your Next <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">Favorite</span> Movie
        </h1>
        <p className="text-lg text-gray-200 mb-8 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
          Explore thousands of movies and series. All in one place.
        </p>
      </div>
    </section>

    <section>
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 border-l-4 border-blue-500 pl-4">Featured Movies</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="animate-in fade-in duration-500" style={{ animationDelay: `${i * 50}ms` }}>
            <MovieCard
              title={`Cybernetic Odyssey ${i}`}
              year="2024"
              rating={8.5 + i * 0.1}
              image={`https://picsum.photos/seed/movie${i}/400/600`}
            />
          </div>
        ))}
      </div>
    </section>

    <section>
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 border-l-4 border-blue-500 pl-4">Newly Added</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="animate-in fade-in duration-500" style={{ animationDelay: `${i * 50}ms` }}>
            <MovieCard
              title={`Star Runner ${i}`}
              year="2024"
              rating={8.0 + i * 0.15}
              image={`https://picsum.photos/seed/new${i}/400/600`}
            />
          </div>
        ))}
      </div>
    </section>
  </div>
);

// Movies Page with Category Filtering
const MoviesPage = ({ selectedCategory }: any) => {
  const categoryDescriptions: any = {
    all: {
      title: 'All Movies',
      description: 'Browse our complete collection of movies',
      icon: '🎬',
    },
    action: {
      title: 'Action Movies',
      description: 'High-octane thrills and explosive adventures',
      icon: '💥',
      keywords: ['explosions', 'chase scenes', 'hero', 'villain', 'combat'],
    },
    horror: {
      title: 'Horror Movies',
      description: 'Spine-chilling scares and supernatural tales',
      icon: '👻',
      keywords: ['scary', 'suspense', 'thriller', 'supernatural', 'mystery'],
    },
    'love-story': {
      title: 'Love Story Movies',
      description: 'Heartwarming romance and emotional journeys',
      icon: '💕',
      keywords: ['romance', 'love', 'passion', 'drama', 'emotion'],
    },
    'true-event': {
      title: 'True Event Movies',
      description: 'Based on real events and true stories',
      icon: '📖',
      keywords: ['biography', 'history', 'documentary', 'true story', 'real events'],
    },
    '18plus': {
      title: 'Adults Only Movies',
      description: 'Mature content for adult audiences',
      icon: '🔞',
      keywords: ['mature', 'adult', 'explicit', 'content', 'rated'],
    },
  };

  const currentCategory = categoryDescriptions[selectedCategory?.id || 'all'];

  const movies = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  return (
    <div className="animate-in fade-in duration-500 space-y-12">
      <div className="text-center mb-12">
        <div className="text-6xl mb-4">{currentCategory.icon}</div>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{currentCategory.title}</h1>
        <p className="text-gray-400 text-lg">{currentCategory.description}</p>
        {currentCategory.keywords && (
          <div className="mt-6 flex flex-wrap gap-2 justify-center">
            {currentCategory.keywords.map((keyword: string) => (
              <span key={keyword} className="bg-blue-500/20 border border-blue-500/50 text-blue-300 text-sm px-3 py-1 rounded-full">
                {keyword}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
        {movies.map((i) => (
          <div key={i} className="animate-in fade-in duration-500" style={{ animationDelay: `${i * 50}ms` }}>
            <MovieCard
              title={`${currentCategory.title.split(' ')[0]} Movie ${i}`}
              year="2024"
              rating={7.5 + Math.random() * 2}
              image={`https://picsum.photos/seed/${selectedCategory?.id}${i}/400/600`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

// Seasons Page
const SeasonsPage = () => (
  <div className="animate-in fade-in duration-500">
    <div className="text-center mb-12">
      <div className="text-6xl mb-4">📺</div>
      <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 border-b-4 border-blue-500 inline-block pb-2">TV Series Seasons</h1>
      <p className="text-gray-400 text-lg mt-4">Browse through your favorite TV show seasons</p>
    </div>

    <div className="space-y-8">
      {[
        { name: 'Breaking Bad', seasons: 5, description: 'A high school chemistry teacher turned drug kingpin' },
        { name: 'Game of Thrones', seasons: 8, description: 'Epic fantasy series with political intrigue and dragons' },
        { name: 'Stranger Things', seasons: 4, description: 'Supernatural mystery in a 1980s town' },
        { name: 'The Crown', seasons: 5, description: 'The drama behind the British royal family' },
      ].map((series) => (
        <div
          key={series.name}
          className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-lg p-6 hover:shadow-blue-500/20 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-blue-500/10"
        >
          <div className="mb-4">
            <h2 className="text-2xl font-bold text-white mb-2">{series.name}</h2>
            <p className="text-gray-400">{series.description}</p>
            <p className="text-sm text-blue-400 mt-2">{series.seasons} Seasons Available</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
            {Array.from({ length: series.seasons }).map((_, season) => (
              <button
                key={season}
                className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg shadow-blue-500/30"
              >
                S{season + 1}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

// Contact Page
const ContactPage = () => (
  <div className="animate-in fade-in duration-500 max-w-2xl mx-auto">
    <div className="text-center mb-12">
      <div className="text-6xl mb-4">💬</div>
      <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">Contact Us</h1>
      <p className="text-gray-400">We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
    </div>

    <form className="space-y-6 bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-2xl border border-blue-500/20 shadow-lg shadow-blue-500/10 mb-12">
      <div className="group">
        <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
        <input
          type="text"
          placeholder="John Doe"
          className="w-full py-3 px-4 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
        />
      </div>

      <div className="group">
        <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
        <input
          type="email"
          placeholder="john@example.com"
          className="w-full py-3 px-4 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
        />
      </div>

      <div className="group">
        <label className="block text-sm font-medium text-gray-300 mb-2">Subject</label>
        <input
          type="text"
          placeholder="How can we help?"
          className="w-full py-3 px-4 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
        />
      </div>

      <div className="group">
        <label className="block text-sm font-medium text-gray-300 mb-2">Message</label>
        <textarea
          placeholder="Your message here..."
          rows={5}
          className="w-full py-3 px-4 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 resize-none"
        ></textarea>
      </div>

      <button
        type="submit"
        className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg shadow-blue-500/50 transform hover:-translate-y-1"
        onClick={(e) => {
          e.preventDefault();
          alert('Thank you for your message! We will get back to you soon.');
        }}
      >
        Send Message
      </button>
    </form>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="text-center p-6 bg-gray-900 rounded-lg border border-blue-500/20 hover:border-blue-500/50 transition-colors">
        <div className="text-4xl mb-2">📧</div>
        <p className="text-gray-400">Email</p>
        <p className="text-white font-bold">contact@moviehub.com</p>
      </div>
      <div className="text-center p-6 bg-gray-900 rounded-lg border border-blue-500/20 hover:border-blue-500/50 transition-colors">
        <div className="text-4xl mb-2">📱</div>
        <p className="text-gray-400">Phone</p>
        <p className="text-white font-bold">+250 796 329 328</p>
      </div>
      <div className="text-center p-6 bg-gray-900 rounded-lg border border-blue-500/20 hover:border-blue-500/50 transition-colors">
        <div className="text-4xl mb-2">📍</div>
        <p className="text-gray-400">Location</p>
        <p className="text-white font-bold">Kigali, Rwanda</p>
      </div>
    </div>
  </div>
);

// Footer Component
const Footer = () => (
  <footer className="bg-gradient-to-r from-gray-900 via-black to-gray-900 border-t border-blue-500/20 text-gray-400 mt-20">
    <div className="container mx-auto py-12 px-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <div>
          <h3 className="text-lg font-bold text-white mb-4">MovieHub</h3>
          <p className="text-sm text-gray-500">Your ultimate destination for discovering movies and series. All in one place.</p>
        </div>
        <div>
          <h4 className="font-bold text-white uppercase mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#/" className="hover:text-blue-400 transition-colors">Home</a></li>
            <li><a href="#/movies" className="hover:text-blue-400 transition-colors">Movies</a></li>
            <li><a href="#/seasons" className="hover:text-blue-400 transition-colors">Seasons</a></li>
            <li><a href="#/contact" className="hover:text-blue-400 transition-colors">Contact</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-white uppercase mb-4">Legal</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-blue-400 transition-colors">Terms of Service</a></li>
            <li><a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-blue-400 transition-colors">Cookie Policy</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-white uppercase mb-4">Follow Us</h4>
          <div className="flex gap-4 text-2xl">
            <a href="#" className="hover:text-blue-400 transition-colors hover:scale-125 duration-300">📘</a>
            <a href="#" className="hover:text-blue-400 transition-colors hover:scale-125 duration-300">🐦</a>
            <a href="#" className="hover:text-blue-400 transition-colors hover:scale-125 duration-300">📷</a>
            <a href="#" className="hover:text-blue-400 transition-colors hover:scale-125 duration-300">▶️</a>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-600">
        <p>&copy; 2024 MovieHub. All rights reserved. Made with ❤️</p>
      </div>
    </div>
  </footer>
);

// Main App Component
const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState({ id: 'all', name: 'All Movies' });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage, selectedCategory]);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'movies':
        return <MoviesPage selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />;
      case 'seasons':
        return <SeasonsPage />;
      case 'contact':
        return <ContactPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-black text-gray-200 flex flex-col">
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
      <main className="flex-grow container mx-auto px-4 py-8 pt-24">
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
};

const root = document.getElementById('root');
if (root) {
  ReactDOM.createRoot(root).render(<React.StrictMode><App /></React.StrictMode>);
}
