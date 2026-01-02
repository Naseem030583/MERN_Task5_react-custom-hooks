import { useState, useEffect, useCallback } from 'react';


const useFetch = (url) => {

  const [data, setData] = useState(null);
  
  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      setData(result);
    } catch (err) {

      if (err.name === 'TypeError') {
        setError('Network error. Please check your connection.');
      } else {
        setError(err.message || 'An unexpected error occurred');
      }
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [url]);


  useEffect(() => {
    if (url) {
      fetchData();
    }
  }, [url, fetchData]);


  return { data, loading, error, refetch: fetchData };
};

export default useFetch;
