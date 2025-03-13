import { useState, useEffect } from 'react';
import axios from 'axios';
import md5 from 'md5'; // Import the MD5 hashing function

const useMarvelAPI = (endpoint) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Generate the timestamp and hash for Marvel API authentication
        const ts = new Date().getTime();
        const publicKey = '2f6241f0518fd4cf4b3c7486d2e32fa6';  // Replace with your public API key
        const privateKey = '50ab36493339f457594bd56336ac4a8dd78151fb'; // Replace with your private API key
        const hash = md5(ts + privateKey + publicKey);  // Generate a hash using MD5

        // Create the complete URL with the ts, public key, and hash
        const url = `https://gateway.marvel.com/v1/public/comics?ts=${ts}&apikey=${publicKey}&hash=${hash}`;

        // Fetch data from Marvel API
        const response = await axios.get(url);
        setData(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint]);

  return { data, loading, error };
};

export default useMarvelAPI;
