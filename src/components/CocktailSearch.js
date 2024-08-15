// src/components/CocktailSearch.js
import React, { useState, useEffect } from 'react';
import CocktailResults from './CocktailResults';

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

  const fetchCocktails = async (ingredient) => {
    try {
      const response = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`
      );
      const data = await response.json();
      return data.drinks || [];
    } catch (error) {
      console.error(`Error fetching cocktails with ${ingredient}:`, error);
      return [];
    }
  };

  const fetchCocktailDetails = async (idDrink) => {
    try {
      const response = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idDrink}`
      );
      const data = await response.json();
      return data.drinks[0];
    } catch (error) {
      console.error(`Error fetching cocktail details with ID ${idDrink}:`, error);
      return null;
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (ingredient1 && ingredient2) {
      // Fetch cocktails for each ingredient
      const cocktails1 = await fetchCocktails(ingredient1);
      const cocktails2 = await fetchCocktails(ingredient2);

      // Find common cocktails in both arrays
      const commonCocktails = cocktails1.filter(cocktail1 =>
        cocktails2.some(cocktail2 => cocktail1.idDrink === cocktail2.idDrink)
      );

      // Fetch detailed information for each common cocktail
      const detailedCocktails = await Promise.all(
        commonCocktails.map(cocktail => fetchCocktailDetails(cocktail.idDrink))
      );

      // Filter those cocktails that contain both ingredients
      const filteredCocktails = detailedCocktails.filter(cocktail => {
        const ingredients = [
          cocktail.strIngredient1,
          cocktail.strIngredient2,
          cocktail.strIngredient3,
          cocktail.strIngredient4,
          cocktail.strIngredient5,
          cocktail.strIngredient6,
          cocktail.strIngredient7,
          cocktail.strIngredient8,
          cocktail.strIngredient9,
          cocktail.strIngredient10,
          cocktail.strIngredient11,
          cocktail.strIngredient12,
          cocktail.strIngredient13,
          cocktail.strIngredient14,
          cocktail.strIngredient15,
        ];
        return ingredients.includes(ingredient1) && ingredients.includes(ingredient2);
      });

      setCocktails(filteredCocktails);
    }
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

      {/* Render CocktailResults component */}
      <CocktailResults cocktails={cocktails} />
    </div>
  );
};

export default CocktailSearch;
