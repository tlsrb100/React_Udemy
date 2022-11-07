import React, { useState } from 'react';

import Card from '../UI/Card';
import './IngredientForm.css';

const IngredientForm = React.memo(({ onAddIngredient }) => {
  const [inputState, setInputState] = useState({ title: '', amount: '' });
  const submitHandler = (event) => {
    event.preventDefault();
    // ...
    onAddIngredient(inputState);
  };
  console.log(inputState);
  return (
    <section className='ingredient-form'>
      <Card>
        <form onSubmit={submitHandler}>
          <div className='form-control'>
            <label htmlFor='title'>Name</label>
            <input
              onChange={(e) => {
                setInputState((pre) => ({ ...pre, title: e.target.value }));
              }}
              value={inputState.title}
              type='text'
              id='title'
            />
          </div>
          <div className='form-control'>
            <label htmlFor='amount'>Amount</label>
            <input
              onChange={(e) => {
                setInputState((pre) => ({ ...pre, amount: e.target.value }));
              }}
              value={inputState.amount}
              type='number'
              id='amount'
            />
          </div>
          <div className='ingredient-form__actions'>
            <button type='submit'>Add Ingredient</button>
          </div>
        </form>
      </Card>
    </section>
  );
});

export default IngredientForm;
