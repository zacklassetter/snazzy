import useRequest from '../../hooks/useRequest';
import React from 'react'

function AddItemsButton() {
    const data = useRequest('api/users/current/');
    console.log(data);
  return (
    <div>AddItemsButton</div>
  )
}

export default AddItemsButton