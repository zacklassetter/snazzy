import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import classes from "./SpecificItemView.module.css";
import useRequest from "../../hooks/useRequest";
import api from "../../Auth/authentication";
import React, { useContext } from "react";
import UserContext from "../../Context/UserContext";
import "@fontsource/roboto";
import Box from "@mui/material/Box";

function SpecificItem({ data }) {
  const [open, setOpen] = React.useState(false);
  const { user } = useContext(UserContext);
  const isAuthenticated = user?.id;
  const isStaff = user?.is_staff;
  const location = useLocation();
  const navigate = useNavigate();
  const prev = location.state?.from || "/";

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
          {isStaff && (
            <Button
              variant="outlined"
              color="error"
              startIcon={<DeleteIcon />}
              onClick={handleDelete}
            >
              Delete
            </Button>
          )}
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
  return (
    <>
      <SpecificItem data={data} />
      <Reviews />
    </>
  );
}
function Reviews() {
  return (
    <div className={classes.reviewsSection}>
      <h2>Ratings & Reviews: </h2>
      <div className={classes.overallRating}>
        <h3>Overall Rating</h3>
        <div className={classes.ratingBody}>
          <div className={classes.ratingsValues}>
            <Box
              sx={{
                width: 200,
                display: "flex",
                alignItems: "center",
              }}
            >
              <strong>2.0</strong>
              <Rating name="read-only" value={2} readOnly />
            </Box>
            
          </div>
          <div className={classes.ratingsDetails}>114 out of 115 (99%) reviewers recommend this product</div>
        </div>
      </div>
      <div>
        <h3>Reviews</h3>
        <Review data={fakeReview} />
      </div>
    </div>
  );
}

const fakeReview = {
  "username": "Zack Lassetter",
  "title": "The WORST shirts",
  "created": "9-10-2023", //should be date
  "message": "The fabric is really irritating and it runs very small",
  "rating": 2.0

}

function Review({ data }) {
  return (
    <div className={classes.ratingBody}>
      <h4>{data.title}</h4>
      <div>{data.username}</div>
      <div>{data.rating}</div>
      <div>{data.created}</div>
      <div>{data.message}</div>
    </div>

  )
}


export default SpecificItemView;
