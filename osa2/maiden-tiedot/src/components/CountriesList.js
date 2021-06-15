import React from 'react';


const CountriesList = ({ filteredCountries, setSearch, search }) => {
  if (filteredCountries.length > 10) {
    if (search !== '') {
      return (
        <div>
          <p>Too many matches, specify another filter!</p>
        </div>
      )
    } else {
      return null;
    }
  } else {
    return (
      <div>
        {filteredCountries.map(country => 
          <p key={country.name}>{country.name} <button onClick={() => setSearch(country.name)}>Show</button></p>
        )}
      </div>
    )
  }
}

export default CountriesList;