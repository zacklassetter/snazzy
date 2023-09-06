import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import classes from './LoginView.module.css';

function LoginView({ onLogin }) {
  const location = useLocation();
  const navigate = useNavigate();
  const prev = location.state?.from || '/';
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(username, password);
    navigate(prev, { replace: true });
  };

  return (
    <div className={classes.login}>
      <h1>Login</h1>
      <form className={classes.loginForm}>
        <label htmlFor="username">{'Username: '}
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <label htmlFor="password">{'Password: '}
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button type="submit" onClick={handleSubmit}>
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginView;
