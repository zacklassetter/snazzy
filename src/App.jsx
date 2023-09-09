import { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import classes from './components/SideNav/SideNav.module.css'
import './App.css'
import SideNav from './components/SideNav/SideNav';
import Header from './components/Header/Header';
import ItemDisplayView from './components/ItemDisplay/ItemDisplayView';
import SpecificItemView from './components/SpecificItemView/SpecificItemView';
import UserContext from './Context/UserContext';
import CartView from './components/Cart/CartView';
import { isTokenExpired } from './Auth/authentication';
import LoginView from './components/Login/LoginView';
import RegisterView from './components/Register/RegisterView';
import NewItemView from './components/NewItem/NewItemView';


function App() {
  const [user, setUser] = useState({ user: { username: '', id: null, is_staff: false } });

  // call 'http://localhost:8000/users/current/' to get current user
  // if user is logged in, display their name
  // else, display login button
  useEffect(() => {
    // Check if the access token is stored in the local storage
    const refreshToken = localStorage.getItem('refresh_token');
    if (refreshToken && !isTokenExpired(refreshToken)) {
      // Decode the access token to extract the user's information
      const decodedToken = jwt_decode(refreshToken);
      setUser({ user: { username: decodedToken.username, id: decodedToken.user_id, is_staff: decodedToken.is_staff  } });
    }
  }, []);

  const handleLogin = async (username, password) => {
    // Call the backend API to get the access token and refresh token
    const response = await fetch('/token/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();

    // Store the tokens in the local storage
    localStorage.setItem('access_token', data.access);
    localStorage.setItem('refresh_token', data.refresh);

    // Decode the access token to extract the user's information
    const decodedToken = jwt_decode(data.access);
    setUser({ user: { username: decodedToken.username, id: decodedToken.user_id, is_staff: decodedToken.is_staff  } });
  };

  const handleLogout = () => {
    // Remove the tokens from the local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setUser({ user: { username: '', id: null, is_staff: false } });
  };

  return (
    <BrowserRouter>
      <UserContext.Provider value={user}>
     
        <Header onLogout={handleLogout}/>
        <div className={classes.pageContainer}>
          <div className={classes.navContainer}>
            <SideNav />
          </div>
          <div className={classes.pageContentContainer}>
            <Routes>
              <Route path="/login" element={<LoginView onLogin={handleLogin} />} />
              <Route path="/register" element={<RegisterView />} />
              <Route path="/cart" element={<CartView />} />
              <Route path="/new-item" element={<NewItemView />} />
              <Route path="/:id" element={<SpecificItemView />} />
              
              <Route
                path="/"
                element={
                  <div>
                    <ItemDisplayView />
                  </div>
                }
              />
            </Routes>
          </div>
        </div>
      </UserContext.Provider >
    </BrowserRouter>
  )
}

export default App
