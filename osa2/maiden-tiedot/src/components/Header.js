import React from 'react';


const Header = ({ search,handleInput }) => {
  return (
    <div>
      <p>Find countries: <input name="search" value={search} onChange={handleInput}/></p>
    </div>
  )
}

export default Header;