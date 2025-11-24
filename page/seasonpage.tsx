import React from 'react';

const SeasonPage: React.FC = () => {
  return (
    <div className="text-center animate-fadeIn">
      <h1 className="text-4xl font-bold text-white border-b-2 border-blue-800 inline-block pb-2 px-4">
        Seasons
      </h1>
      <p className="mt-6 text-lg text-gray-400">
        Browse through your favorite TV show seasons here.
      </p>
    </div>
  );
};

export default SeasonPage;