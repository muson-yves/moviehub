import React from 'react';
import { useParams } from 'react-router-dom';

const MoviePage: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  
  const formatCategory = (slug: string | undefined) => {
    if (!slug) return 'Movies';
    return slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const pageTitle = formatCategory(category);

  return (
    <div className="text-center animate-fadeIn">
      <h1 className="text-4xl font-bold text-white border-b-2 border-blue-800 inline-block pb-2 px-4">
        {pageTitle}
      </h1>
      <p className="mt-6 text-lg text-gray-400">
        Content for the {pageTitle} category will be displayed here.
      </p>
    </div>
  );
};

export default MoviePage;