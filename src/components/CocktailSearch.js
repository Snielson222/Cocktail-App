// src/components/CocktailSearch.js
import React, { useState, useEffect } from 'react';
import CocktailResults from './CocktailResults';

const CocktailSearch = () => {
  const [ingredientList, setIngredientList] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
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

  const handleIngredientClick = async (ingredient) => {
    let updatedIngredients;

    if (selectedIngredients.includes(ingredient)) {
      // Remove ingredient from the selection
      updatedIngredients = selectedIngredients.filter(
        (i) => i !== ingredient
      );
    } else {
      // Add ingredient to the selection
      updatedIngredients = [...selectedIngredients, ingredient];
    }

    setSelectedIngredients(updatedIngredients);

    if (updatedIngredients.length === 0) {
      setCocktails([]); // No ingredients selected, no cocktails to show
      return;
    }

    // Fetch cocktails for each selected ingredient
    const cocktailPromises = updatedIngredients.map((ing) =>
      fetchCocktails(ing)
    );

    const results = await Promise.all(cocktailPromises);

    // Find common cocktails that can be made with all selected ingredients
    const filteredCocktails = results.reduce((acc, curr) => {
      if (acc === null) {
        return curr;
      }
      return acc.filter((cocktail) =>
        curr.some((c) => c.idDrink === cocktail.idDrink)
      );
    }, null);

    setCocktails(filteredCocktails || []);
  };

  return (
    <div>
      <h1>Find Cocktails</h1>
      <div>
        <h3>Select Ingredients:</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {ingredientList.map((ingredient) => (
            <button
              key={ingredient.strIngredient1}
              onClick={() =>
                handleIngredientClick(ingredient.strIngredient1)
              }
              style={{
                margin: '5px',
                padding: '10px',
                backgroundColor: selectedIngredients.includes(
                  ingredient.strIngredient1
                )
                  ? 'lightblue'
                  : 'white',
                border: '1px solid gray',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              {ingredient.strIngredient1}
            </button>
          ))}
        </div>
      </div>

      {/* Render CocktailResults component */}
      <CocktailResults cocktails={cocktails} />
    </div>
  );
};

export default CocktailSearch;
