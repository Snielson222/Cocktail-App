// src/components/CocktailSearch.js
import React, { useState, useEffect } from 'react';
import CocktailResults from './CocktailResults';

const CocktailSearch = () => {
  const [alcoholicIngredients, setAlcoholicIngredients] = useState([]);
  const [nonAlcoholicIngredients, setNonAlcoholicIngredients] = useState([]);
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
        categorizeIngredients(data.drinks);
      } catch (error) {
        console.error('Error fetching ingredients:', error);
      }
    };

    fetchIngredients();
  }, []);

  // Categorize ingredients into alcoholic and non-alcoholic
  const categorizeIngredients = (ingredients) => {
    const alcoholicList = [];
    const nonAlcoholicList = [];

    ingredients.forEach((ingredient) => {
      const name = ingredient.strIngredient1.toLowerCase();

      // Simple categorization logic based on common knowledge
      // You can expand this with more detailed data if needed
      if (
        name.includes('vodka') ||
        name.includes('rum') ||
        name.includes('whiskey') ||
        name.includes('tequila') ||
        name.includes('gin') ||
        name.includes('brandy') ||
        name.includes('liqueur') ||
        name.includes('beer') ||
        name.includes('wine') ||
        name.includes('vermouth') ||
        name.includes('triple sec') ||
        name.includes('comfort') ||
        name.includes('bitters') ||
        name.includes('scotch') ||
        name.includes('amaretto') ||
        name.includes('applejack') ||
        name.includes('kahlua') ||
        name.includes('port') ||
        name.includes('sherry') ||
        name.includes('walker') ||
        name.includes('champagne') ||
        name.includes('rouge') ||
        name.includes('creme de') ||
        name.includes('ricard') ||
        name.includes('schnapps') ||
        name.includes('gall') ||
        name.includes('firewater') ||
        name.includes('lager') ||
        name.includes('sambuca') ||
        name.includes('irish cream') ||
        name.includes('jack daniels') ||
        name.includes('ale') ||
        name.includes('pisco') ||
        name.includes('absolut') ||
        name.includes('ouzo') ||
        name.includes('cognac') ||
        name.includes('everclear') ||
        name.includes('bourbon')
      ) {
        alcoholicList.push(ingredient);
      } 
      else if (name.includes('ger')) {
        nonAlcoholicList.push(ingredient);
      }
      else {
        nonAlcoholicList.push(ingredient);
      }
    });

    setAlcoholicIngredients(alcoholicList);
    setNonAlcoholicIngredients(nonAlcoholicList);
  };

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
        <h3>Alcoholic Ingredients:</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {alcoholicIngredients.map((ingredient) => (
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

        <h3>Non-Alcoholic Ingredients:</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {nonAlcoholicIngredients.map((ingredient) => (
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
