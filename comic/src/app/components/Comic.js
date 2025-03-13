import Image from 'next/image';
import styles from './Comic.module.css';
import React from 'react';

const Comic = ({ comic }) => {
  // Check if the comic thumbnail data exists
  const thumbnailUrl = comic.thumbnail?.path ? `${comic.thumbnail.path}.${comic.thumbnail.extension}` : null;

  return (
    <div className={styles.comic}>
      {thumbnailUrl ? (
        <img src={thumbnailUrl} alt={comic.title} />
      ) : (
        <div>No image available</div> // You can display a placeholder or fallback UI here
      )}
      <div className={styles.details}>
        <p>{comic.title}</p>
      </div>      
    </div>
  );
};

export default Comic;
