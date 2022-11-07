import React, { useEffect, useState } from 'react';

import Card from '../UI/Card';
import './Search.css';

const Search = React.memo(
  ({ onLoadingIngredients, filterIngredientsHandler }) => {
    const [enteredFilter, setEnteredFilter] = useState('');

    useEffect(() => {
      const query =
        enteredFilter.length === 0
          ? ''
          : `?orderBy="title"&equalTo="${enteredFilter}"`;
      fetch(
        'https://react-http-459a2-default-rtdb.firebaseio.com/ingredients.json' +
          query
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
          onLoadingIngredients(loadedIngredients);
        });
    }, [enteredFilter]);

    return (
      <section className='search'>
        <Card>
          <div className='search-input'>
            <label>Filter by Title</label>
            <input
              onChange={(e) => {
                setEnteredFilter(e.target.value);
              }}
              type='text'
              value={enteredFilter}
            />
          </div>
        </Card>
      </section>
    );
  }
);

export default Search;
