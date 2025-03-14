import Image from 'next/image';
import styles from './Comic.module.css';
import React from 'react';

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
  const thumbnailUrl = comic.thumbnail?.path
    ? `${comic.thumbnail.path}.${comic.thumbnail.extension}`
    : null;

  // Extract the published date
  const publishedDateObj = comic.dates.find((d) => d.type === 'onsaleDate');
  const publishedDate = publishedDateObj
    ? new Date(publishedDateObj.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : 'Unknown';

  return (
    <div className="comic-card">
      {thumbnailUrl && <img src={thumbnailUrl} alt={comic.title} />}
      <h3>{comic.title}</h3>
      <p>Issue: {comic.issueNumber}</p>
      <p>Published: {publishedDate}</p>
      <p>
        {comic.creators.items
          .map((creator) => `${creator.role.charAt(0).toUpperCase() + creator.role.slice(1)}: ${creator.name}`)
          .join(', ')}
      </p>
    </div>
  );
};

export default Comic;

