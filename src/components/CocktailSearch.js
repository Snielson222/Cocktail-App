// src/components/CocktailSearch.js
import React, { useState, useEffect } from 'react';

const CocktailSearch = () => {
  const [ingredientList, setIngredientList] = useState([]);
  const [ingredient1, setIngredient1] = useState('');
  const [ingredient2, setIngredient2] = useState('');
  const [cocktails, setCocktails] = useState([]);

  // Fetch the list of ingredients when the component mounts
  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const response = await fetch(
          'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list'
        );
        const data = await response.json();
        setIngredientList(data.drinks);
      } catch (error) {
        console.error('Error fetching ingredients:', error);
      }
    };

    fetchIngredients();
  }, []);

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
        <select value={ingredient1} onChange={(e) => setIngredient1(e.target.value)}>
          <option value="">Select First Ingredient</option>
          {ingredientList.map((ingredient) => (
            <option key={ingredient.strIngredient1} value={ingredient.strIngredient1}>
              {ingredient.strIngredient1}
            </option>
          ))}
        </select>

        <select value={ingredient2} onChange={(e) => setIngredient2(e.target.value)}>
          <option value="">Select Second Ingredient</option>
          {ingredientList.map((ingredient) => (
            <option key={ingredient.strIngredient1} value={ingredient.strIngredient1}>
              {ingredient.strIngredient1}
            </option>
          ))}
        </select>

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
