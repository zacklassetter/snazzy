import Button from "@mui/material/Button";
import useRequest from '../../hooks/useRequest';
import React from 'react'
import { Link } from "react-router-dom";

function AddItemsButton() {
    const data = useRequest('api/users/current/');
    console.log(data);
  return (
    <Link to="/new-item">
      <Button>Post New Item</Button>
    </Link>
  )
}

export default AddItemsButton