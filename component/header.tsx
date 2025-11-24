import React, { useState, useRef, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';

const MovieIcon: React.FC<{className: string}> = ({className}) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.5,4H4.5A2.5,2.5,0,0,0,2,6.5v11A2.5,2.5,0,0,0,4.5,20H19.5A2.5,2.5,0,0,0,22,17.5V6.5A2.5,2.5,0,0,0,19.5,4ZM8,8H6V6H8Zm4,0H10V6h2Zm4,0H14V6h2ZM8,12H6V10H8Zm4,0H10V10h2Zm4,0H14V10h2ZM8,16H6V14H8Zm4,0H10V14h2Zm4,0H14V14h2Z"/>
    </svg>
);

const Header: React.FC = () => {
  const [isMovieDropdownOpen, setMovieDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setMovieDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinkClasses = "px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-800 hover:text-white transition-all duration-300 transform hover:-translate-y-0.5";
  const activeLinkClasses = "bg-blue-600 text-white";

  const headerStyle: React.CSSProperties = {
    backgroundImage: `url('https://images.unsplash.com/photo-1489599849927-2ee91e4543e3?q=80&w=2072&auto=format&fit=crop')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'border-b border-gray-800' : 'border-b border-transparent'}`}
      style={headerStyle}
    >
      <div className={`transition-all duration-300 ${isScrolled ? 'bg-black/80 backdrop-blur-sm' : 'bg-black/60'}`}>
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex-shrink-0 flex items-center gap-2 text-white">
                <MovieIcon className="h-8 w-8 text-blue-500"/>
                <span className="font-bold text-xl">MovieHub</span>
              </Link>
            </div>

            <div className="hidden sm:block sm:ml-6">
              <div className="flex space-x-4">
                <NavLink to="/" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeLinkClasses : ''}`} end>Home</NavLink>
                
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setMovieDropdownOpen(!isMovieDropdownOpen)}
                    className={`${navLinkClasses} flex items-center`}
                  >
                    Movies
                    <svg className={`ml-2 h-5 w-5 transition-transform duration-200 ${isMovieDropdownOpen ? 'transform rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                  {isMovieDropdownOpen && (
                    <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-gray-800 ring-1 ring-black ring-opacity-5 z-20 transform scale-95 opacity-0 transition-all duration-200 ease-out group-focus:scale-100 group-focus:opacity-100" style={isMovieDropdownOpen ? {transform: 'scale(1)', opacity: 1} : {}}>
                      <Link to="/movies/action" onClick={() => setMovieDropdownOpen(false)} className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 transition-colors">Action</Link>
                      <Link to="/movies/horror" onClick={() => setMovieDropdownOpen(false)} className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 transition-colors">Horror</Link>
                      <Link to="/movies/love-story" onClick={() => setMovieDropdownOpen(false)} className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 transition-colors">Love Story</Link>
                      <Link to="/movies/true-event" onClick={() => setMovieDropdownOpen(false)} className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 transition-colors">True Event</Link>
                      <Link to="/movies/18-plus" onClick={() => setMovieDropdownOpen(false)} className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 transition-colors">+18</Link>
                    </div>
                  )}
                </div>
                
                <NavLink to="/seasons" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeLinkClasses : ''}`}>Seasons</NavLink>
                <NavLink to="/contact" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeLinkClasses : ''}`}>Contact Us</NavLink>
              </div>
            </div>
            
            <div className="sm:hidden">
              <button onClick={() => setMobileMenuOpen(!isMobileMenuOpen)} className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                <span className="sr-only">Open main menu</span>
                {isMobileMenuOpen ? (
                  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                ) : (
                  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" /></svg>
                )}
              </button>
            </div>
          </div>

          {isMobileMenuOpen && (
            <div className="sm:hidden bg-black/95 absolute w-full left-0">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <NavLink to="/" onClick={() => setMobileMenuOpen(false)} className={({ isActive }) => `block px-3 py-2 rounded-md text-base font-medium ${isActive ? activeLinkClasses : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`} end>Home</NavLink>
                <NavLink to="/seasons" onClick={() => setMobileMenuOpen(false)} className={({ isActive }) => `block px-3 py-2 rounded-md text-base font-medium ${isActive ? activeLinkClasses : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}>Seasons</NavLink>
                <NavLink to="/contact" onClick={() => setMobileMenuOpen(false)} className={({ isActive }) => `block px-3 py-2 rounded-md text-base font-medium ${isActive ? activeLinkClasses : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}>Contact Us</NavLink>
                <div className="border-t border-gray-700 my-2"></div>
                <span className="px-3 py-2 text-sm font-semibold text-gray-400">Movies</span>
                <NavLink to="/movies/action" onClick={() => setMobileMenuOpen(false)} className="block pl-6 pr-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Action</NavLink>
                <NavLink to="/movies/horror" onClick={() => setMobileMenuOpen(false)} className="block pl-6 pr-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Horror</NavLink>
                <NavLink to="/movies/love-story" onClick={() => setMobileMenuOpen(false)} className="block pl-6 pr-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Love Story</NavLink>
                <NavLink to="/movies/true-event" onClick={() => setMobileMenuOpen(false)} className="block pl-6 pr-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">True Event</NavLink>
                <NavLink to="/movies/18-plus" onClick={() => setMobileMenuOpen(false)} className="block pl-6 pr-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">+18</NavLink>
              </div>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;