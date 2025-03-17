import React, { useEffect, useState } from 'react';

interface Comic {
  id: number;
  title: string;
  issueNumber?: number;
  thumbnail?: {
    path: string;
    extension: string;
  };
}

interface FavoritesSidebarProps {
  favorites: Comic[];
  onRemoveFavorite: (id: number) => void;
}

const FavoritesSidebar: React.FC<FavoritesSidebarProps> = ({ favorites = [], onRemoveFavorite }) => {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    if (favorites.length > 0) {
      setIsOpen(true);
    }
  }, [favorites]);

  return (
    <>
      {/* Sidebar */}
      <aside style={{ width: '250px',color:'#000', backgroundColor: '#cccccc', padding: '20px', borderRight: '2px solid #ddd',float: 'left',margin: '10px' }}
        className={`fixed top-0 left-0 h-full w-64 bg-gray-900 text-white shadow-lg transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out p-4 z-50`}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Favorites ({favorites.length})</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-400 hover:text-red-500 transition"
            aria-label="Close Favorites Sidebar"
          >
            ✖
          </button>
        </div>

        <ul className="space-y-3 overflow-y-auto max-h-[70vh] pr-2">
          {favorites.length === 0 ? (
            <li className="text-gray-400">No favorites yet!</li>
          ) : (
            favorites.map((comic, index) => (
              <li
                key={comic.id ? `${comic.id}-${comic.issueNumber || index}` : `fallback-${index}`}
                className="flex items-center justify-between bg-gray-800 p-2 rounded-lg"
              >
                <div className="flex items-center">
                  <img
                    src={
                      comic.thumbnail?.path && comic.thumbnail?.extension
                        ? `${comic.thumbnail.path}.${comic.thumbnail.extension}`
                        : '/placeholder.jpg'
                    }
                    alt={comic.title}
                    width={50}
                    height={75}
                    className="mr-3 rounded-md"
                  />
                  <span className="text-sm">{comic.title}</span>
                </div>
                <button
                  onClick={() => onRemoveFavorite(comic.id)}
                  className="text-red-500 hover:text-red-700 transition"
                >
                  🗑
                </button>
              </li>
            ))
          )}
        </ul>
      </aside>

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 bg-gray-900 text-white p-2 rounded-lg z-50"
      >
        {isOpen ? '❮' : '❯'}
      </button>
    </>
  );
};

export default FavoritesSidebar;
