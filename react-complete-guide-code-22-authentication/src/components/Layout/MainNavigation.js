import { Link } from 'react-router-dom';
import { useContext } from 'react';
import classes from './MainNavigation.module.css';
import AuthContext from '../store/auth-context';

const MainNavigation = () => {
  const authCtx = useContext(AuthContext);
  const isLoggendIn = authCtx.isLoggedIn;
  const logoutHandler = () => {
    authCtx.logout();
  };
  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          {!isLoggendIn && (
            <li>
              <Link to='/auth'>Login</Link>
            </li>
          )}
          {isLoggendIn && (
            <li>
              <Link to='/profile'>Profile</Link>
            </li>
          )}
          {isLoggendIn && (
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
