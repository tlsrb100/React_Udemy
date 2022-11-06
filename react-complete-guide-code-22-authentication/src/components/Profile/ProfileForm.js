import classes from './ProfileForm.module.css';
import React, { useRef, useContext } from 'react';
import AuthContext from '../store/auth-context';
import { useHistory } from 'react-router-dom';

const ProfileForm = () => {
  const newPasswordInputRef = useRef('');
  const API_URL = process.env.REACT_APP_FIREBASE_API_KEY;
  const authCtx = useContext(AuthContext);
  const history = useHistory();

  const submitHandler = (e) => {
    e.preventDefault();
    const enteredNewPassword = newPasswordInputRef.current.value;
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${API_URL}`;

    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        idToken: authCtx.token,
        password: enteredNewPassword,
        returnSecureToken: false,
      }),
      headers: {
        'content-type': 'apllication/json',
      },
    })
      .then((res) => {
        // history.replace('/');
        console.log('실행');
        return res.json();
      })
      .then((data) => {
        console.log(data);
        history.replace('/');
      });
  };
  return (
    <form onSubmit={submitHandler} className={classes.form}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input
          minLength='7'
          type='password'
          id='new-password'
          ref={newPasswordInputRef}
        />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
