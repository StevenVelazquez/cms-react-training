import { useState, useEffect } from 'react';
import md5 from 'md5';

interface Comic {
  id: number;
  title: string;
  issueNumber: number;
  thumbnail: {
    path: string;
    extension: string;
  };
  dates: { type: string; date: string }[];
  creators: { items: { role: string; name: string }[] };
}

const API_PUBLIC_KEY = '2f6241f0518fd4cf4b3c7486d2e32fa6';
const API_PRIVATE_KEY = '50ab36493339f457594bd56336ac4a8dd78151fb';

const useMarvelAPI = (page: number = 1, limit: number = 20) => {
  const [data, setData] = useState<Comic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const fetchComics = async (retries = 3) => {
      setLoading(true);
      setError(null);

      const ts = new Date().getTime().toString();
      const hash = md5(ts + API_PRIVATE_KEY + API_PUBLIC_KEY);
      const url = `https://gateway.marvel.com/v1/public/comics?ts=${ts}&apikey=${API_PUBLIC_KEY}&hash=${hash}&offset=${(page - 1) * limit}&limit=${limit}`;

      try {
        // Throttle the request to prevent 429 error (too many requests)
        timeoutId = setTimeout(async () => {
          const response = await fetch(url);

          if (response.status === 429 && retries > 0) {
            // Retry after a delay if rate limit exceeded
            const delay = Math.pow(2, 3 - retries) * 1000; // Exponential backoff
            setError(`Rate limit exceeded. Retrying in ${delay / 1000} seconds...`);
            setTimeout(() => fetchComics(retries - 1), delay);
            return;  // Exit the function to wait for retry
          }

          if (!response.ok) {
            throw new Error(`HTTP Error ${response.status}: ${response.statusText}`);
          }

          const result = await response.json();
          setData((prev) => [...prev, ...result.data.results]);
          setHasMore(result.data.results.length > 0);
        }, 1000); // 1-second delay for throttling

      } catch (err: any) {
        setError(err.message || 'Failed to fetch comics.');
      } finally {
        setLoading(false);
      }
    };

    fetchComics();

    // Clean up timeout if the component is unmounted before the request completes
    return () => clearTimeout(timeoutId);

  }, [page, limit]);

  return { data, loading, error, hasMore };
};

export default useMarvelAPI;
