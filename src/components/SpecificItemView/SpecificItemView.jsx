import { Link, useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import classes from './SpecificItemView.module.css';
import useRequest from '../../hooks/useRequest';
import api from '../../Auth/authentication';
import React from 'react';

function SpecificItem({ data }) {
  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const handleUndo = () => {
    api.delete(`/api/cart/${data.id}/`);
    setOpen(false);
  }

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
      const res = await api.post('/api/cart', { 'item_id': data.id });
      setOpen(true);
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className={classes.specificItemView}>
      <img src={data.image} alt={data.name} />
      <h3>{data.name}</h3>
      <p>{data.description}</p>
      <p>Price: ${data.price}</p>
      <button
        onClick={() => {
          addToCart();
        }}
      >
        Add to Cart
      </button>
      <Link to="/">
        <button className={classes.returnButton}>Return to items</button>
      </Link>
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
