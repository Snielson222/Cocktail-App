// src/components/CocktailSearch.js
import React, { useState } from 'react';

const CocktailSearch = () => {
  const [ingredient1, setIngredient1] = useState('');
  const [ingredient2, setIngredient2] = useState('');
  const [cocktails, setCocktails] = useState([]);

  const fetchCocktails = async () => {
    try {
      const response = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient1},${ingredient2}`
      );
      const data = await response.json();
      setCocktails(data.drinks);
    } catch (error) {
      console.error('Error fetching cocktails:', error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchCocktails();
  };

  return (
    <div>
      <h1>Find Cocktails</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="First Ingredient"
          value={ingredient1}
          onChange={(e) => setIngredient1(e.target.value)}
        />
        <input
          type="text"
          placeholder="Second Ingredient"
          value={ingredient2}
          onChange={(e) => setIngredient2(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {cocktails && (
        <ul>
          {cocktails.map((cocktail) => (
            <li key={cocktail.idDrink}>
              <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
              <p>{cocktail.strDrink}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CocktailSearch;
