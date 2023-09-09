import React from 'react';
import classes from './SideNav.module.css';

function SideNav() {
  const categories = [
    'clothing',
    'electronics',
    'books',
    'jewelery',
    'toys',
    'beauty',
    'sports',
    'outdoors',
    'home',
    'grocery',
  ];
  return (
    <div className={classes.categories}>
      <strong>Fliters</strong>
      <ul>
        {categories.map((category) => (
          <li>{category}</li>
        ))}
      </ul>
    </div>
  );
}

export default SideNav;
