// client/src/hooks/useFetch.js
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { errorToast } from '../utils/toast';

// Base URL setup (Ensure your server URL is in the .env file)
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

const useFetch = (endpoint, initialData = [], dependencies = []) => {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useAuth(); // Get token for protected routes

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    const fetchData = async () => {
      try {
        const headers = {};
        // Attach token if available and endpoint is protected or needs user context
        if (token) {
          headers.Authorization = `Bearer ${token}`;
        }
        
        const response = await axios.get(`${API_BASE_URL}${endpoint}`, { headers });
        
        if (isMounted) {
          setData(response.data);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.response ? err.response.data.message : 'Network Error');
          errorToast(err.response ? err.response.data.message : 'Failed to fetch data');
          setData(initialData);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endpoint, token, ...dependencies]);

  return { data, loading, error, setData };
};

export default useFetch;