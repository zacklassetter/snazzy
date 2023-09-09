import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import UserContext from "../../Context/UserContext";
import CurrentUser from "./CurrentUser";

import { useTheme } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";

// import CurrentUser from './CurrentUser';
import classes from "./Header.module.css";
import { CATEGORIES } from "../../constants";
// import UserContext from '../../Context/UserContext';
// import api from '../../Auth/authentication';
// import AddItemsButton from './AddItemsButton';

function Header({ onLogout }) {
  const { user } = useContext(UserContext);
  const isAuthenticated = user?.id;
  const isStaff = user?.is_staff;
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  return (
    <div>
      <div className={classes.storeHeader}>
        <Link to="/">
          <h1>Snazzy Store</h1>
        </Link>
        <PersistentDrawerLeft open={open} setOpen={setOpen} />

        <div className={classes.userDisplay}>
          {
            // if user is logged in, display their name
            // else, display login button
            isAuthenticated && (
              <>
                <CurrentUser currentUser={user?.username} />
                {isStaff && (
                  <Link to="/new-item">
                    <Button variant="text">Post New Item</Button>
                  </Link>
                )}
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
      <div className={classes.subHeader}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{ mr: 2, ...(open && { display: "none" }) }}
        >
          <MenuIcon />
        </IconButton>
      </div>
    </div>
  );
}

const drawerWidth = 340;

function PersistentDrawerLeft({ open, setOpen }) {
  const theme = useTheme();
  // const [open, setOpen] = React.useState(false);

  const handleDrawerClose = () => {
    setOpen(false);
  };
  // const categories = [
  //   "clothing",
  //   "electronics",
  //   "books",
  //   "jewelery",
  //   "toys",
  //   "beauty",
  //   "sports",
  //   "outdoors",
  //   "home",
  //   "grocery",
  // ];

  return (
    <div>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <div className={classes.drawerHeader}>
          <strong>Categories</strong>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          {CATEGORIES.map((text, index) => (
            <Link key={index} to={`/items/${text.toLowerCase()}`}>
              <ListItem disablePadding>
                <ListItemButton>
                  {/* <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon> */}

                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
        </List>
        <Divider />
      </Drawer>
    </div>
  );
}

export default Header;
