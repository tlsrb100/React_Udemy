import React, { useState, useEffect } from 'react';
import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from './IngredientList';

const Ingredients = () => {
  const [userIngredients, setUserIngredients] = useState([]);

  useEffect(() => {
    fetch(
      'https://react-http-459a2-default-rtdb.firebaseio.com/ingredients.json'
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        const loadedIngredients = [];
        for (const key in data) {
          loadedIngredients.push({
            id: key,
            title: data[key].title,
            amount: data[key].amount,
          });
        }
        setUserIngredients(loadedIngredients);
      });
  }, []);

  useEffect(() => {
    console.log('렌더링됨', userIngredients);
  });

  const filterIngredientsHandler = (filterIngredients) => {
    setUserIngredients(filterIngredients);
  };

  const addIngredientHandler = (ingredient) => {
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
        return res.json();
      })
      .then((data) => {
        setUserIngredients((pre) => {
          return [...pre, { id: data.name, ...ingredient }];
        });
      });
  };

  return (
    <div className='App'>
      <IngredientForm onAddIngredient={addIngredientHandler} />

      <section>
        <Search onLoadingIngredients={filterIngredientsHandler} />
        <IngredientList
          userIngredients={userIngredients}
          onRemoveItem={() => {}}
        ></IngredientList>
        {/* Need to add list here! */}
      </section>
    </div>
  );
};

export default Ingredients;
