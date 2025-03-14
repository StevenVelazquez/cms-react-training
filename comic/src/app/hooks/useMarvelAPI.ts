// hooks/useMarvelAPI.ts
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

interface UseMarvelAPIResponse {
  data: Comic[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;  // For pagination support
}

const useMarvelAPI = (page: number = 1, limit: number = 20) => {
  const [data, setData] = useState<Comic[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const publicKey = '2f6241f0518fd4cf4b3c7486d2e32fa6';
  const privateKey = '50ab36493339f457594bd56336ac4a8dd78151fb';
  const ts = new Date().getTime().toString();
  const hash = md5(ts + privateKey + publicKey);  // Generate the hash for authentication

  const url = `https://gateway.marvel.com/v1/public/comics?ts=${ts}&apikey=${publicKey}&hash=${hash}&offset=${(page - 1) * limit}&limit=${limit}`;

  useEffect(() => {
    const fetchComics = async () => {
      try {
        const response = await fetch(url);
        
        // Check if the response status is OK (status code 200)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        
        // Assuming the API returns comics in result.data.results and pagination information
        const fetchedComics = result.data.results;
        setData((prevData) => [...prevData, ...fetchedComics]);

        // Check if there's more data to load
        setHasMore(fetchedComics.length > 0);
        setLoading(false);
      } catch (err: any) {
        setError(err.message || 'An unknown error occurred');
        setLoading(false);
      }
    };

    fetchComics();
  }, [page, url]);  // Re-run when the page changes

  return { data, loading, error, hasMore };
};

export default useMarvelAPI;
