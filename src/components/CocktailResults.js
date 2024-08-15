// src/components/CocktailResults.js
import React from 'react';

const CocktailResults = ({ cocktails }) => {
  return (
    <div>
      <h2>Cocktail Results</h2>
      {cocktails && cocktails.length > 0 ? (
        <ul>
          {cocktails.map((cocktail) => (
            <li key={cocktail.idDrink}>
              <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
              <p>{cocktail.strDrink}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No cocktails found with the selected ingredients.</p>
      )}
    </div>
  );
};

export default CocktailResults;

