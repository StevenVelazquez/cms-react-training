'use client';

import React from 'react';
import Comic from './components/Comic';
import useMarvelAPI from './hooks/useMarvelAPI';

const Home: React.FC = () => {
  const { data, loading, error } = useMarvelAPI();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div
      className="grid"
      style={{
        display: 'grid',
        gap: '20px',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
      }}
    >
      {data?.data?.results.map((comic) => (
        <Comic key={comic.id} comic={comic} />
      ))}
    </div>
  );
};

export default Home;
