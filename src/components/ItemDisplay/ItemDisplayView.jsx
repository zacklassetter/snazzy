import { Link, useParams } from 'react-router-dom';
import useRequest from '../../hooks/useRequest.jsx';
import LoadingState from '../LoadingState/LoadingState.jsx';
import classes from './ItemDisplay.module.css';

function ItemDisplay({ data }) {
  return (
    <div className={classes.itemList}>
      {data.map((item) => (
        <Link to={`/${item.id}`} key={item.id}>
          <div className={classes.itemElement}>
            <img src={item.image} alt={item.name} />
            <strong>{item.name}</strong>
            <div className={classes.category}>{item.category}</div>
            <div className={classes.description}>{item.description}</div>
            <div>Price: ${item.price}</div>
          </div>
        </Link>
      ))}
    </div>
  );
}

function ItemDisplayView() {
  const params = useParams();

  const { data, isLoading, error } = useRequest('/api/items', undefined, params);

  return (
    <div>
      {isLoading && <LoadingState />}
      {!isLoading && <ItemDisplay data={data} />}
    </div>
  );
}

export default ItemDisplayView;
