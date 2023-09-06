import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserContext from '../../Context/UserContext';
import AddItemsButton from './AddItemsButton';
import CurrentUser from './CurrentUser';
// import CurrentUser from './CurrentUser';
import classes from './Header.module.css';
// import UserContext from '../../Context/UserContext';
// import api from '../../Auth/authentication';
// import AddItemsButton from './AddItemsButton';

function Header({ onLogout }) {
  const { user } = useContext(UserContext);
  const isAuthenticated = user?.id;
  const isStaff = user?.is_staff;
  const navigate = useNavigate();
  return (
    <div className={classes.storeHeader}>
      <Link to="/">
        <h1>Snazzy Store</h1>
      </Link>
      {isStaff && <AddItemsButton />}
      <div className={classes.userDisplay}>
        {
          // if user is logged in, display their name
          // else, display login button
          isAuthenticated && (
            <>
              <CurrentUser currentUser={user?.username} />
              <div className={classes.cartCount}>
                <Link to="/cart">Cart</Link>
              </div>
              <button
                onClick={() => {
                  onLogout();
                  // redirect to home page
                  navigate('/', { replace: true })
                }}
              >
                Logout
              </button>
            </>
          )
        }
        {!isAuthenticated && (
          <>
          <Link to="/login">
            <button>Login</button>
          </Link>
          <Link to="/register">
          <button>Register</button>
        </Link>
        </>
        )}
      </div>
    </div>
  );
}

export default Header;
