import React from 'react';
import classes from './CurrentUser.module.css';

function CurrentUser({ currentUser }) {
  return <div className={classes.username}>Hello {currentUser}</div>;
}

export default CurrentUser;
