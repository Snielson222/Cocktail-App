// src/components/CocktailResults.js
import React from 'react';

const CocktailResults = ({ cocktails }) => {
  console.log("🚀 ~ CocktailResults ~ cocktails:", cocktails)
  return (
    <div>
      <h2>Cocktails That Can Be Made With Selected</h2>
      {cocktails && cocktails.length > 0 ? (
        <ul>
          {cocktails.map((cocktail) => (
            <div key={cocktail.idDrink}>
              <h3>{cocktail.strDrink}</h3>
              <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
              <p>{cocktail.strMeasure1} {cocktail.strIngredient1}</p>
                <p>{cocktail.strMeasure2} {cocktail.strIngredient2}</p>
                <p>{cocktail.strMeasure3} {cocktail.strIngredient3}</p>
                <p>{cocktail.strMeasure4} {cocktail.strIngredient4}</p>
                <p>{cocktail.strMeasure5} {cocktail.strIngredient5}</p>
                <p>{cocktail.strMeasure6} {cocktail.strIngredient6}</p>
                <p>{cocktail.strMeasure7} {cocktail.strIngredient7}</p>
                <p>{cocktail.strMeasure8} {cocktail.strIngredient8}</p>
                <p>{cocktail.strMeasure9} {cocktail.strIngredient9}</p>
                <p>{cocktail.strMeasure10} {cocktail.strIngredient10}</p>
                <p>{cocktail.strMeasure11} {cocktail.strIngredient11}</p>
                <p>{cocktail.strMeasure12} {cocktail.strIngredient12}</p>
                <p>{cocktail.strMeasure13} {cocktail.strIngredient13}</p>
                <p>{cocktail.strMeasure14} {cocktail.strIngredient14}</p>
                <p>{cocktail.strMeasure15} {cocktail.strIngredient15}</p>
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

