import { Switch, Route, Redirect } from 'react-router-dom';
import { useContext } from 'react';

import Layout from './components/Layout/Layout';
import UserProfile from './components/Profile/UserProfile';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import AuthContext from './components/store/auth-context';

function App() {
  const authCtx = useContext(AuthContext);
  return (
    <Layout>
      <Route>
        <Route path='/' exact>
          <HomePage />
        </Route>
        {!authCtx.isLoggedIn && (
          <Route path='/auth'>
            <AuthPage />
          </Route>
        )}
        {authCtx.isLoggedIn && (
          <Route path='/profile'>
            <UserProfile />
          </Route>
        )}
        <Route path='*'>
          <Redirect to='/' />
        </Route>
      </Route>
    </Layout>
  );
}

export default App;
