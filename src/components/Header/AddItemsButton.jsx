import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import classes from './Header.module.css'

function AddItemsButton() { 
  return (
    <div className={classes.newItem}>
    <Link to="/new-item">
      <Button>Post New Item</Button>
    </Link>
    </div>
  )
}

export default AddItemsButton