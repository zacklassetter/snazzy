import { useEffect, useState } from 'react';
// import useRequest from '../../hooks/useRequest';
import api from '../../Auth/authentication';
import classes from './CartView.module.css';

function CartView() {
  // const { data: cart, isLoading, error } = useRequest('http://localhost:8000/cart');
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  const fetchData = async () => {
    try {
      const res = await api.get('/api/cart');
      setCart(res.data);
      setIsLoading(false);
    } catch (e) {
      setError(true);
      console.log(e);
    }
  };

  const removeItem = async (id) => {
    try {
      setIsLoading(true);
      await api.delete(`/api/cart/${id}/`);
      fetchData();
    } catch (e) {
      setIsLoading(false);
      setError(true);
      console.log(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={classes.cart}>
      <h1>Cart</h1>
      {isLoading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {!isLoading && (
        <div>
          <div>Items in cart: {cart.items.length}</div>
          <div className={classes.itemList}>
            {cart.items.map((item) => (
              <div className={classes.itemDetails} key={item.id}>
                <div className={classes.a}>
                  <img className={classes.image} src={item.image} alt={item.name} />
                  <div>{item.name}</div>
                  <div>${item.price}</div>
                </div>
                {/* add x remove buttons */}
                <button
                  type="button"
                  className={classes.removeButton}
                  onClick={() => {
                    removeItem(item.id);
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="30px" height="30px">
                    <path d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z" />
                  </svg>
                </button>
              </div>
            ))}
            <h2>Total: ${cart.total}</h2>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartView;
