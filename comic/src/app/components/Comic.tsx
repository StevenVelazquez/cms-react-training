import React from 'react';
import styles from './Comic.module.css';

interface ComicProps {
  comic: {
    id: number;
    title: string;
    issueNumber?: number;
    thumbnail?: {
      path: string;
      extension: string;
    };
  };
  onAddFavorite: (comic: ComicProps['comic']) => void;
  onRemoveFavorite: (id: number) => void;
  isFavorite: boolean;
}

const Comic: React.FC<ComicProps> = ({ comic, onAddFavorite, onRemoveFavorite, isFavorite }) => {
  const imageUrl = comic.thumbnail?.path && comic.thumbnail?.extension
    ? `${comic.thumbnail.path}.${comic.thumbnail.extension}`
    : '/placeholder.png'; // Use a fallback image

  return (
    <div className={`${styles.comic} bg-gray-800 p-4 rounded-lg shadow-md`}>
      <img
        src={imageUrl}
        alt={comic.title}
        className="w-full h-48 object-cover rounded-md"
      />
      <h3 className="text-lg font-bold mt-2 text-white">{comic.title}</h3>
      <p className="text-sm text-gray-400">Issue #{comic.issueNumber ?? 'N/A'}</p>

      <button
        onClick={() => (isFavorite ? onRemoveFavorite(comic.id) : onAddFavorite(comic))}
        className={`mt-2 px-4 py-2 rounded-md text-white transition ${
          isFavorite ? 'bg-red-500 hover:bg-red-700' : 'bg-blue-500 hover:bg-blue-700'
        }`}
      >
        {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
      </button>
    </div>
  );
};

export default Comic;
