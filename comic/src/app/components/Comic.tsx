// components/Comic.tsx
import React from 'react';
import Image from 'next/image';
import useFavorites from '../hooks/useFavorites';

interface ComicProps {
  comic: {
    id: number;
    title: string;
    issueNumber: number;
    thumbnail: {
      path: string;
      extension: string;
    };
    dates: { type: string; date: string }[];
    creators: { items: { role: string; name: string }[] };
  };
}

const Comic: React.FC<ComicProps> = ({ comic }) => {
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  const isFavorite = favorites.includes(comic.id);

  // Create thumbnail URL using the path and extension
  const thumbnailUrl = comic.thumbnail?.path
    ? `${comic.thumbnail.path}.${comic.thumbnail.extension}`
    : null;

  // Extract published date
  const publishedDateObj = comic.dates.find((d) => d.type === 'onsaleDate');
  const publishedDate = publishedDateObj
    ? new Date(publishedDateObj.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : 'Unknown';

  // Handle favorite/unfavorite action
  const handleFavoriteToggle = () => {
    if (isFavorite) {
      removeFavorite(comic.id);
    } else {
      addFavorite(comic.id);
    }
  };

  return (
    <div className="border rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transform hover:scale-105 transition-all duration-200">
      {thumbnailUrl && (
        <Image
          src={thumbnailUrl}
          alt={comic.title}
          width={200}  // Adjust the width as needed
          height={300} // Adjust the height as needed
          layout="intrinsic"  // Ensure the image keeps its aspect ratio
        />
      )}
      <div className="p-4">
      <h3 className="text-xl font-semibold">{comic.title}</h3>
      <p>Issue: {comic.issueNumber}</p>
      <p>Published: {publishedDate}</p>
      <p>
        {comic.creators.items
          .map(
            (creator) =>
              `${creator.role.charAt(0).toUpperCase() + creator.role.slice(1)}: ${creator.name}`
          )
          .join(', ')}
      </p>

      <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md" onClick={handleFavoriteToggle}>
        {isFavorite ? 'Unfavorite' : 'Favorite'}
      </button>
    </div>
    </div>
  );
};

export default Comic;
