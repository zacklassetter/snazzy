import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from '@mui/icons-material/Delete';
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import classes from "./SpecificItemView.module.css";
import useRequest from "../../hooks/useRequest";
import api from "../../Auth/authentication";
import React, { useContext } from "react";
import UserContext from "../../Context/UserContext";

function SpecificItem({ data }) {
  const [open, setOpen] = React.useState(false);
  const { user } = useContext(UserContext);
  const isAuthenticated = user?.id;
  const isStaff = user?.is_staff;
  const location = useLocation();
  const navigate = useNavigate();
  const prev = location.state?.from || '/';

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleUndo = () => {
    api.delete(`/api/cart/${data.id}/`);
    setOpen(false);
  };

  const handleDelete = () => {
    api.delete(`/api/items/${data.id}/`);
    navigate(prev, { replace: true });
  };

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleUndo}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  const addToCart = async () => {
    try {
      const res = await api.post("/api/cart", { item_id: data.id });
      setOpen(true);
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className={classes.specificItemView}>
      <img src={data.image} alt={data.name} />
      <div className={classes.itemMenu}>
        <div className={classes.itemDetails}>
          <h3>{data.name}</h3>
          <h4>Price: ${data.price}</h4>
          <p>{data.description}</p>
          
        </div>
        <div className={classes.cartButtons}>
          {isStaff && 
          <Button variant="outlined" color="error" startIcon={<DeleteIcon />} onClick={handleDelete}>
          Delete
        </Button>}
          <Button
            variant="contained"
            endIcon={<AddShoppingCartIcon />}
            onClick={() => {
              addToCart();
            }}
          >
            Add to Cart
          </Button>
          <Link to="/">
            <Button className={classes.returnButton}>Return to items</Button>
          </Link>
        </div>
      </div>

      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Item Added To Cart"
        action={action}
      />
    </div>
  );
}

function SpecificItemView() {
  const { id } = useParams();
  
  const { data, isLoading, error } = useRequest(`api/items/${id}/`);
  return <SpecificItem data={data} />;
}

export default SpecificItemView;
