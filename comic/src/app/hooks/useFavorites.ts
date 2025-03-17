import { useState, useEffect } from 'react';

const FAVORITES_KEY = 'favorites';

interface Comic {
  id: number;
  title: string;
  issueNumber: number;
  thumbnail: {
    path: string;
    extension: string;
  };
  dates?: { type: string; date: string }[];
  creators?: { items: { role: string; name: string }[] };
}

export default function useFavorites() {
  const [favorites, setFavorites] = useState<Comic[]>(() => {
    // Load favorites from localStorage on initial render
    if (typeof window !== 'undefined') {
      try {
        const storedFavorites = localStorage.getItem(FAVORITES_KEY);
        return storedFavorites ? JSON.parse(storedFavorites) : [];
      } catch (error) {
        console.error('Error loading favorites from localStorage:', error);
        return [];
      }
    }
    return [];
  });

  // Save to localStorage when favorites change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    }
  }, [favorites]);

  const addFavorite = (comic: Comic) => {
    if (!comic || !comic.id) return; // Prevent adding invalid comics
    if (favorites.length >= 10) return; // Limit to 10 comics
    if (favorites.some((fav) => fav.id === comic.id)) return; // Prevent duplicates

    setFavorites((prevFavorites) => [...prevFavorites, comic]);
  };

  const removeFavorite = (comicId: number) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((comic) => comic.id !== comicId)
    );
  };

  return { favorites, addFavorite, removeFavorite };
}
