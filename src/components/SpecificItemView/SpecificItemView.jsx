import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import TextField from '@mui/material/TextField';
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import classes from "./SpecificItemView.module.css";
import useRequest from "../../hooks/useRequest";
import api from "../../Auth/authentication";
import React, { useContext, useEffect, useState } from "react";
import UserContext from "../../Context/UserContext";
import "@fontsource/roboto";
import Box from "@mui/material/Box";
import { Avatar } from "@mui/material";

function SpecificItem({ data }) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("")
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
      setMessage("Item Added To Cart")
      setOpen(true);
      console.log(res);
    } catch (e) {
      if (e) {
        setMessage("Log in to add to cart")
        setOpen(true);
      }
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
        message={message}
        action={action}
      />
    </div>
  );
}

function SpecificItemView() {
  const { id } = useParams();
  const [reviews, setReviews] = useState({
    summary: { average: 0, count: 0 },
    reviews: [],
  });
  const [reviewsLoading, setReviewsLoading] = useState(true);

  const { data, isLoading, error } = useRequest(`api/items/${id}/`);
  // const { reviewData, reviewsLoading, reviewsError } = useRequest(`api/reviews/${id}/`);
  useEffect(() => {
    api
      .get(`api/reviews/${id}/`)
      .then((res) => {
        setReviews(res.data);
        setReviewsLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setReviewsLoading(false);
      });
  }, [id]);

  return (
    <>
      <SpecificItem data={data} />
      {!reviewsLoading && console.log(reviews)}
      {!reviewsLoading && (
        <Reviews reviews={reviews.reviews} summary={reviews.summary} id={id} />
      )}
    </>
  );
}
function Reviews({ reviews, summary, id }) {
  return (
    <div className={classes.reviewsSection}>
      <h2>Ratings & Reviews: </h2>

      <ReviewsHeader summary={summary} />

      <div className={classes.reviewsContainer}>
        <h3>Reviews</h3>
        {reviews.length === 0 && <>No Reviews yet...</>}
        {reviews &&
          reviews.map((i, elem) => {
            return <Review data={reviews[elem]} />;
          })}
      </div>
      <NewReview id={id}/>
    </div>
  );
}

function NewReview({ id }) {
  const [review, setReview] = useState({
    title: "",
    message: "",
    rating: 0
  })

  async function leaveReview() {
    api.put(`api/reviews/${id}/`, review)
    .then(res => window.location.reload())

  }

  return (
    <div className={classes.reviewForm}>
      <strong>Leave a Review...</strong>
      <Box
       sx={{
        // width: 200,
        display: "flex",
        alignItems: "center",
        gap: "8px",
      }}>
        {"Rating: "}
        <Rating
          name="hover-feedback"
          value={review.rating}
          precision={0.5}
          onChange={(event, newValue) => {
            setReview({...review,
            rating: newValue})
          }}
          // emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
        />
      </Box>
      <TextField
          id="outlined-singleline-static"
          label="title"
          value={review.title}
          onChange={(e) => {
            setReview({...review,
              title: e.target.value})
          }}
        />
      <TextField
          id="outlined-multiline-static"
          label="Written Review"
          multiline
          rows={4}
          value={review.message}
          onChange={(e) => {
            setReview({...review,
              message: e.target.value})
          }}
        />
      <Button
            variant="contained"
            // endIcon={<AddShoppingCartIcon />}
            onClick={() => {
              leaveReview();
            }}
            // sx={{
            //   // width: 200,
            //   maxWidth: "100px"
            // }}
          >Review</Button>
    </div>
  );
}

function ReviewsHeader({ summary }) {
  return (
    <div className={classes.overallRating}>
      <h3>Overall Rating</h3>
      <div className={classes.ratingHeaderBody}>
        <div className={classes.ratingsValues}>
          <Box
            sx={{
              // width: 200,
              display: "flex",
              alignItems: "baseline",
            }}
          >
            <strong>
              {summary.average ? summary.average.toFixed(1) : "0.0"}
            </strong>
            <Rating
              name="read-only"
              value={summary.average}
              readOnly
              precision={0.5}
            />
          </Box>
        </div>
        <div className={classes.ratingsDetails}>{summary.count} reviews</div>
      </div>
    </div>
  );
}

function Review({ data }) {
  return (
    <div className={classes.ratingBody}>
      <div className={classes.profileName}>
        <Avatar sx={{ width: 24, height: 24 }} />
        {data.username}
      </div>
      <Box
        sx={{
          // width: 300,
          display: "flex",
          alignItems: "center",
          gap: "8px",
          marginBottom: "4px",
        }}
      >
        <Rating
          name="read-only"
          value={data.rating}
          readOnly
          size="small"
          precision={0.5}
        />
        <strong>{data.title}</strong>
      </Box>
      <div className={classes.reviewed}>
        Reviewed {moment.utc(data.created, "YYYY-MM-DD[T]HH:mm:ss").fromNow()}
      </div>
      <div className={classes.reviewMessage}>{data.message}</div>
    </div>
  );
}

export default SpecificItemView;
