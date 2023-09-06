import axios from 'axios';
import jwt_decode from 'jwt-decode';

export function isTokenExpired(token) {
  const decodedToken = jwt_decode(token);
  const currentTime = Date.now() / 1000;

  return decodedToken.exp < currentTime;
}

const api = axios.create({
  baseURL: import.meta.env.MODE === "production" ? import.meta.env.VITE_HOST : 'http://localhost:8000',
});

api.interceptors.request.use(
  async (config) => {
    if (config.url.includes('/token')) return config;
    if (config.url.includes('/token/refresh')) return config;

    const accessToken = localStorage.getItem('access_token');

    if (accessToken) {
      const tokenExpired = isTokenExpired(accessToken);

      if (tokenExpired) {
        const refreshToken = localStorage.getItem('refresh_token');
        if (isTokenExpired(refreshToken)) {
          // Handle refresh token expired
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          return config;
        }

        try {
          const response = await api.post('/token/refresh/', {
            refresh: refreshToken,
          });

          localStorage.setItem('access_token', response.data.access);
          config.headers['Authorization'] = `Bearer ${response.data.access}`;
        } catch (error) {
          console.error('Error refreshing token:', error);
          // Handle token refresh failure, e.g. by logging out the user
        }
      } else {
        config.headers['Authorization'] = `Bearer ${accessToken}`;
      }
    }

    config.headers['Content-Type'] = 'application/json';

    return config;
  },
  (error) => Promise.reject(error),
);

export default api;
