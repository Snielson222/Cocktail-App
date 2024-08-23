// src/components/CocktailResults.js
import React, { useEffect, useState } from 'react';

const CocktailResults = ({ cocktails }) => {
  const [fullCocktailDetails, setFullCocktailDetails] = useState([]);

  useEffect(() => {
    // Function to fetch full details for each cocktail
    const fetchFullDetails = async () => {
      const detailedCocktails = await Promise.all(
        cocktails.map(async (cocktail) => {
          try {
            const response = await fetch(
              `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${cocktail.idDrink}`
            );
            const data = await response.json();
            return data.drinks ? data.drinks[0] : null;
          } catch (error) {
            console.error('Error fetching cocktail details:', error);
            return null;
          }
        })
      );
      setFullCocktailDetails(detailedCocktails.filter(Boolean));
    };

    if (cocktails.length > 0) {
      fetchFullDetails();
    } else {
      setFullCocktailDetails([]);
    }
  }, [cocktails]);

  return (
    <div>
      <h2>Cocktails That Can Be Made With Selected Ingredients</h2>
      {fullCocktailDetails && fullCocktailDetails.length > 0 ? (
        <ul>
          {fullCocktailDetails.map((cocktail) => (
            <div key={cocktail.idDrink}>
              <h3>{cocktail.strDrink}</h3>
              <img
                src={cocktail.strDrinkThumb}
                alt={cocktail.strDrink}
                style={{ width: '150px', height: '150px', borderRadius: '8px' }}
              />

              {/* Dynamically display ingredients and measures */}
              <ul>
                {Array.from({ length: 15 }, (_, i) => i + 1).map((num) => {
                  const measure = cocktail[`strMeasure${num}`];
                  const ingredient = cocktail[`strIngredient${num}`];
                  return ingredient ? (
                    <li key={num}>
                      {measure ? measure : ''} {ingredient}
                    </li>
                  ) : null;
                })}
              </ul>

              <p>{cocktail.strInstructions}</p>
            </div>
          ))}
        </ul>
      ) : (
        <div>
          <p>No cocktails found with the selected ingredients.</p>
          {/* Image linked to logo.webp */}
          <a href="/">
            <img
              src={`${process.env.PUBLIC_URL}/logo.webp`}
              alt="App Logo"
              style={{ width: '100px', marginTop: '20px' }}
            />
          </a>
        </div>
      )}
    </div>
  );
};

export default CocktailResults;
