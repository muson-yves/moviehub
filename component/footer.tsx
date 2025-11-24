import React from 'react';

const InstagramIcon: React.FC<{className: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.584-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.069-1.645-.069-4.85s.011-3.584.069-4.85c.149-3.225 1.664 4.771 4.919-4.919 1.266.058 1.644.07 4.85.07zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.358-.2 6.78-2.618 6.98-6.98.059-1.281.073-1.689.073-4.948s-.014-3.667-.072-4.947c-.2-4.358-2.618-6.78-6.98-6.98-1.281-.059-1.689-.073-4.948-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44 1.441-.645 1.441-1.44-.645-1.44-1.441-1.44z"/></svg>
);

const TikTokIcon: React.FC<{className: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-2.43.05-4.84-.95-6.43-2.88-1.59-1.93-2.02-4.41-1.5-6.81.5-2.44 2.5-4.57 4.9-5.31.57-.17 1.18-.3 1.79-.31 1.56-.04 3.12-.02 4.68-.04 0-1.01 0-2.02.01-3.03-.01-1.52-.72-2.93-1.88-3.96-1.16-1.03-2.73-1.55-4.22-1.71V.02z"/></svg>
);

const WhatsAppIcon: React.FC<{className: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01s-.521.074-.792.372c-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
);

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 text-gray-400">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold text-white">MovieHub</h3>
            <p className="mt-2 text-sm">
              Your ultimate destination for discovering the latest and greatest in movies and series.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-white tracking-wider uppercase">Quick Links</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li><a href="#/" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="#/seasons" className="hover:text-white transition-colors">Seasons</a></li>
              <li><a href="#/movies/action" className="hover:text-white transition-colors">Movies</a></li>
              <li><a href="#/contact" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white tracking-wider uppercase">Legal</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white tracking-wider uppercase">Follow Us</h4>
             <div className="flex items-center space-x-4 mt-4">
                <a href="https://instagram.com/moviehub" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-white transition-colors">
                    <InstagramIcon className="h-6 w-6" />
                </a>
                <a href="https://tiktok.com/@moviehub" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="hover:text-white transition-colors">
                    <TikTokIcon className="h-6 w-6" />
                </a>
                <a href="https://wa.me/250796329328" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="hover:text-white transition-colors">
                    <WhatsAppIcon className="h-6 w-6" />
                </a>
            </div>
            <p className="text-sm mt-4">
                <a href="https://wa.me/250796329328" className="hover:text-white transition-colors">
                    +250 796 329 328
                </a>
            </p>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-800 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} MovieHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;