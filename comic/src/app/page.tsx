'use client';
import React, { useState, useEffect } from 'react';
import Comic from './components/Comic';
import useMarvelAPI from './hooks/useMarvelAPI';
import Header from './components/Header';
import Footer from './components/Footer';
import FavoritesSidebar from './components/FavoritesSidebar';

interface ComicType {
  id: number;
  title: string;
  issueNumber?: number;
  thumbnail?: {
    path: string;
    extension: string;
  };
}

const Home = () => {
  const { data, loading, error } = useMarvelAPI();
  const [favorites, setFavorites] = useState<ComicType[]>([]);

  // Load favorites from localStorage on mount
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setFavorites(storedFavorites);
  }, []);

  // Save favorites to localStorage when updated
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Add to Favorites
  const addFavorite = (comic: ComicType) => {
    if (favorites.length >= 10) return; // Prevent adding more than 10
    if (favorites.find((fav) => fav.id === comic.id)) return; // Prevent duplicates
    setFavorites([...favorites, comic]);
  };

  // Remove from Favorites
  const removeFavorite = (id: number) => {
    setFavorites(favorites.filter((comic) => comic.id !== id));
  };

  const uniqueComics = Array.from(new Map(data.map((comic) => [comic.id, comic])).values());

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading comics</div>;

  return (
    <div className="flex flex-col min-h-screen">
      <Header favoriteCount={favorites.length} />

      {/* Favorites Sidebar (Fixed to Left) */}
      <FavoritesSidebar favorites={favorites} onRemoveFavorite={removeFavorite} />

      {/* Main Content (Shifted Right by Sidebar Width) */}
      <div className="flex-1 p-4 ml-64"> 
        <div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          style={{
            display: 'grid',
            gap: '20px',
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          }}
        >
          {uniqueComics.map((comic) => (
            <Comic
              key={comic.id}
              comic={comic}
              onAddFavorite={addFavorite}
              onRemoveFavorite={removeFavorite}
              isFavorite={favorites.some((fav) => fav.id === comic.id)}
            />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
