import { useState, useEffect } from 'react';
import axios from 'axios';
import md5 from 'md5';

interface ComicData {
  id: number;
  title: string;
  thumbnail: {
    path: string;
    extension: string;
  };
}

interface APIResponse {
  data: {
    results: ComicData[];
  };
}

const useMarvelAPI = () => {
  const [data, setData] = useState<APIResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const ts = new Date().getTime();
        const publicKey = '2f6241f0518fd4cf4b3c7486d2e32fa6';
        const privateKey = '50ab36493339f457594bd56336ac4a8dd78151fb';
        const hash = md5(ts + privateKey + publicKey);

        const url = `https://gateway.marvel.com/v1/public/comics?ts=${ts}&apikey=${publicKey}&hash=${hash}`;
        const response = await axios.get<APIResponse>(url);

        setData(response.data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};

export default useMarvelAPI;
