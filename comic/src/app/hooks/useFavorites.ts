import { useState } from 'react';

const useFavorites = () => {
  // State to hold favorite comic IDs
  const [favorites, setFavorites] = useState<number[]>(() => {
    // Load favorites from localStorage if available
    const savedFavorites = localStorage.getItem('favorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  // Add a comic to favorites
  const addFavorite = (comicId: number) => {
    setFavorites((prevFavorites) => {
      const newFavorites = [...prevFavorites, comicId];
      localStorage.setItem('favorites', JSON.stringify(newFavorites)); // Save to localStorage
      return newFavorites;
    });
  };

  // Remove a comic from favorites
  const removeFavorite = (comicId: number) => {
    setFavorites((prevFavorites) => {
      const newFavorites = prevFavorites.filter((id) => id !== comicId);
      localStorage.setItem('favorites', JSON.stringify(newFavorites)); // Save to localStorage
      return newFavorites;
    });
  };

  return {
    favorites,
    addFavorite,
    removeFavorite,
  };
};

export default useFavorites; // Default export
