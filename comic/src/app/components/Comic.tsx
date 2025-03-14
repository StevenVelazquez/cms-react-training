import Image from 'next/image';
import styles from './Comic.module.css';
import React from 'react';

interface ComicProps {
  comic: {
    id: number;
    title: string;
    thumbnail: {
      path: string;
      extension: string;
    };
  };
}

const Comic: React.FC<ComicProps> = ({ comic }) => {
  const thumbnailUrl = comic.thumbnail?.path
    ? `${comic.thumbnail.path}.${comic.thumbnail.extension}`
    : null;

  return (
    <div className={styles.comic}>
      {thumbnailUrl ? (
        <img src={thumbnailUrl} alt={comic.title} />
      ) : (
        <div>No image available</div>
      )}
      <div className={styles.details}>
        <p>{comic.title}</p>
      </div>  
    </div>
  );
};

export default Comic;
