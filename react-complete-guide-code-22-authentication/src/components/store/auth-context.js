import React, { useState } from 'react';
const AuthContext = React.createContext({
  token: '',
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

const calculateRemainingTime = (expriationTime) => {
  const currentTime = new Date().getTime();
  const adjExpirationTime = new Date(expriationTime).getTime();
  const remainingDuration = adjExpirationTime - currentTime;
  return remainingDuration;
};

export const AuthContentProvider = (props) => {
  const initialToken = localStorage.getItem('token');
  const [token, setToken] = useState(initialToken);
  const userIsLoggendIn = !!token;

  const loginHandler = (token, expriationTime) => {
    setToken(token);
    localStorage.setItem('token', token);
    const remainingTime = calculateRemainingTime(expriationTime);

    setTimeout(logoutHandler, 3000);
  };
  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem('token');
  };
  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggendIn,
    login: loginHandler,
    logout: logoutHandler,
  };
  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
