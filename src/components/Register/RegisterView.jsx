import api from '../../Auth/authentication';
import React from 'react';
import classes from './RegisterView.module.css';

function ErrorRowRender({ row }) {
  return <div>{row}</div>;
}

function RegisterView() {
  // use /register
  const [formData, setFormData] = React.useState({
    username: '',
    password: '',
    password2: '',
    email: '',
    first_name: '',
    last_name: '',
  });
  const [error, setError] = React.useState(null);

  async function register() {
    try {
      const res = await api.post('/register/', formData);
      window.location.href = '/login';
    } catch (e) {
      console.log(e);
      setError(e.response.data);
    }
  }

  return (
    <div>
      <h1>Register</h1>
      <div className={classes.formContainer}>
        <label htmlFor="email">
          {'Email: '}
          <input
            type="text"
            value={formData.email || ''}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            id="email"
            placeholder="email"
          />
        </label>
        <label htmlFor="firstName">
          {'First Name: '}
          <input
            type="text"
            value={formData.first_name || ''}
            onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
            id="firstName"
            placeholder="First Name"
          />
        </label>
        <label htmlFor="lastName">
          {'Last Name: '}
          <input
            type="text"
            value={formData.last_name || ''}
            onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
            id="lastName"
            placeholder="Last Name"
          />
        </label>
        <label htmlFor="username">
          {'Username: '}
          <input
            type="text"
            value={formData.username || ''}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            id="username"
            placeholder="username"
          />
        </label>
        <label htmlFor="password">
          {'Password: '}
          <input
            type="text"
            value={formData.password || ''}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            id="password"
            placeholder="password"
          />
        </label>
        <label htmlFor="password">
          {'Confirm Password: '}
          <input
            type="text"
            value={formData.password2 || ''}
            onChange={(e) => setFormData({ ...formData, password2: e.target.value })}
            id="password"
            placeholder="password"
          />
        </label>

        <button type="submit" onClick={register}>
          Register
        </button>
      </div>
      {error &&
        [...Object.entries(error)].map((entry) => {
          const [key, value] = entry;
          return <ErrorRowRender row={`${key}: ${value}`} />;
        })}
    </div>
  );
}

export default RegisterView;
