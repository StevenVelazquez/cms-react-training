import Image from 'next/image';
import styles from './Comic.module.css';

const Comic = ({ comic }) => {
  const { title, thumbnail } = comic;

  return (
    <div className={styles.comic}>
      <Image
        src={thumbnail}
        alt={title}
        width={250}
        height={375}
        layout="responsive"
      />
      <div className={styles.details}>
        <p>{title}</p>
      </div>
    </div>
  );
};

export default Comic;
