import React from 'react';


const CountryDetails = ({ filteredCountries,search }) => {
  if (filteredCountries.length) {
    const { name, capital, population, languages, flag } = filteredCountries[0];
      return (
        <div>
          <h2>{name}</h2>
          <p>Capital {capital}</p>
          <p>Population {population}</p>
          <h3>Languages</h3>
          <ul>
            {languages.map(language => <li key={language.name}>{language.name}</li>)}          
          </ul>
          <img id="flag" src={flag} alt={`flag of ${name}`}/>
        </div>

      ) 
    } else if (search !== '') {
      return (
        <div>
          <p>No matches found!</p>
        </div>
      )
    } else {
      return null;
    }
  
}

export default CountryDetails