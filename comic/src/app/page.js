import Comic from './components/Comic';
import comicsData from './data/comics';

const Home = () => {
  return (
    <div
      className="grid"
      style={{
        display: 'grid',
        gap: '20px',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
      }}
    >
      {comicsData.map((comic) => (
        <Comic key={comic.id} comic={comic} />
      ))}
    </div>
  );
};

export default Home;
