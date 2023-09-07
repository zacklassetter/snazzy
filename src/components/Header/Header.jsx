import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import UserContext from "../../Context/UserContext";
import AddItemsButton from "./AddItemsButton";
import CurrentUser from "./CurrentUser";

// import CurrentUser from './CurrentUser';
import classes from "./Header.module.css";
// import UserContext from '../../Context/UserContext';
// import api from '../../Auth/authentication';
// import AddItemsButton from './AddItemsButton';

function Header({ onLogout }) {
  const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
    },
  }));

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
                <Link to="/cart">
                  <Button 
                    variant="text"
                    aria-label="cart" 
                    endIcon={<ShoppingCartIcon />}
                  >
                      Cart
                  </Button>
                </Link>
              </div>
              <Button
                variant="outlined"
                onClick={() => {
                  onLogout();
                  // redirect to home page
                  navigate("/", { replace: true });
                }}
              >
                Logout
              </Button>
            </>
          )
        }
        {!isAuthenticated && (
          <>
            <Link to="/login">
              <Button variant="contained">Login</Button>
            </Link>
            <Link to="/register">
              <Button variant="outlined">Register</Button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Header;
