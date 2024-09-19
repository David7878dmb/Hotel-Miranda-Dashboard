import { useNavigate } from 'react-router-dom';
import { useAuth } from './authContext';

function Login({ onLogin }) {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;


    login(username, password, navigate);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input data-cy="username" name="username" placeholder="Username" />
      <input data-cy="password" name="password" type="password" placeholder="Password" />
      <button data-cy="login" type="submit">Login</button>
    </form>
  );
}

export default Login;