// pages/index.tsx
'use client';
import React from 'react';
import Comic from './components/Comic';
import useMarvelAPI from './hooks/useMarvelAPI';
import Header from './components/Header';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';

const Home = () => {
  const { data, loading, error } = useMarvelAPI();

  const uniqueComics = Array.from(
    new Map(data.map((comic) => [comic.id, comic])).values()
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading comics</div>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <div style={{ display: 'flex', flex: 1 }}>
        <Sidebar />
        <div style={{ flex: 1, padding: '20px' }}></div>
    <div className="grid" style={{ display: 'grid', gap: '20px', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))' }}>
      {uniqueComics.map((comic) => (
        <Comic key={`${comic.id}-${comic.issueNumber}`} comic={comic} />
      ))}
    </div>
    </div>
    <Footer />
    </div>
  );
};

export default Home;

