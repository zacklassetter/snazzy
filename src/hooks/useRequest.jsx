import { useState, useEffect } from 'react';
import api from '../Auth/authentication';

const useRequest = (url, body = undefined, params = undefined) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const headers = {
      'Content-Type': 'application/json',
    };
    if (body) {
      api
        .post(url, body, { headers })
        .then((res) => {
          setData(res.data);
          setIsLoading(false);
        })
        .catch((e) => {
          setError(e);
          setIsLoading(false);
        });
    } else if (url) {
      api
        .get(url, { headers: headers, params: params})
        .then((res) => {
          setData(res.data);
          setIsLoading(false);
        })
        .catch((e) => {
          setError(e);
          setIsLoading(false);
        });
    }
  }, [url, body, params]);
  return { data, isLoading, error };
};

export default useRequest;
