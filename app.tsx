import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Header from './component/header';
import Footer from './component/footer';
import HomePage from './page/homepage';
import MoviePage from './page/moviepage';
import SeasonPage from './page/seasonpage';
import ContactPage from './page/contactpage';

const App: React.FC = () => {
  return (
    <HashRouter>
      <div className="min-h-screen bg-black text-gray-200 flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8 pt-24">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/movies/:category" element={<MoviePage />} />
            <Route path="/seasons" element={<SeasonPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
};

export default App;