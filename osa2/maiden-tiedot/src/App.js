import React, { useEffect, useState } from "react";
import axios from 'axios';

// Components
import Header from "./components/Header";
import Weather from "./components/Weather";
import CountriesList from "./components/CountriesList";
import CountryDetails from "./components/CountryDetails";


function App() {
  const [ search, setSearch ] = useState('');
  const [ countries, setCountries ] = useState([]);
  const [ filteredCountries, setFilteredCountries ] = useState([]);
  
  const handleInput = ({ target }) => {
    setSearch(target.value);
  }

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        const { data } = response;
        setCountries(data);
      })
  }, [])

  useEffect(() => {
    const filtered = countries.filter(country => country.name.toLowerCase().includes(search.toLowerCase()));
    setFilteredCountries(filtered);
  }, [search,countries])

   return (
    <div>
      <Header search={search} handleInput={handleInput} />
      {filteredCountries.length > 1 ? 
        <CountriesList  
          filteredCountries={filteredCountries} 
          setSearch={setSearch}
          search={search} 
        /> 
        : 
        <CountryDetails 
          filteredCountries={filteredCountries} 
          search={search}          
        />}
      {filteredCountries.length === 1 ? 
        <Weather country={filteredCountries[0]}/> 
        : 
        null}
    </div>
  );
}

export default App;
