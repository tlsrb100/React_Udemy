import React, { useState, useEffect, useCallback } from 'react';
import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from './IngredientList';
import ErrorModal from '../UI/ErrorModal';

const Ingredients = () => {
  const [userIngredients, setUserIngredients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    console.log('렌더링됨', userIngredients);
  });

  const filterIngredientsHandler = useCallback((filterIngredients) => {
    setUserIngredients(filterIngredients);
  }, []);

  const addIngredientHandler = (ingredient) => {
    setIsLoading(true);
    fetch(
      'https://react-http-459a2-default-rtdb.firebaseio.com/ingredients.json',
      {
        method: 'POST',
        body: JSON.stringify(ingredient),
        header: {
          'content-type': 'application/json',
        },
      }
    )
      .then((res) => {
        setIsLoading(false);
        return res.json();
      })
      .then((data) => {
        setUserIngredients((pre) => {
          return [...pre, { id: data.name, ...ingredient }];
        });
      });
  };

  const removeIngredientHandler = (ingredientID) => {
    setIsLoading(true);
    fetch(
      `https://react-http-459a2-default-rtdb.firebaseio.com/ingredients/${ingredientID}.jsssn`,
      {
        method: 'DELETE',
      }
    )
      .then((res) => {
        setIsLoading(false);
        setUserIngredients((pre) => {
          return pre.filter((el) => {
            return el.id !== ingredientID;
          });
        });
      })
      .catch((err) => {
        setIsLoading(false);
        setError('somethis is wrong');
      });
  };

  const clearError = () => {
    setError(null);
  };
  return (
    <div className='App'>
      {error && <ErrorModal onClose={clearError}>{error}</ErrorModal>}
      <IngredientForm
        onAddIngredient={addIngredientHandler}
        isLoading={isLoading}
      />

      <section>
        <Search onLoadingIngredients={filterIngredientsHandler} />
        <IngredientList
          userIngredients={userIngredients}
          onRemoveItem={removeIngredientHandler}
        ></IngredientList>
        {/* Need to add list here! */}
      </section>
    </div>
  );
};

export default Ingredients;
