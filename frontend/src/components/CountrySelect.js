// src/components/CountrySelect.js
import React, { useEffect, useState } from 'react';
import { fetchCountries } from '../utils/api';

const CountrySelect = ({ onSelect }) => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const cachedCountries = JSON.parse(localStorage.getItem('countries'));
    if (cachedCountries) {
      setCountries(cachedCountries);
    } else {
      fetchCountries().then(setCountries);
    }
  }, []);

  return (
    <select onChange={event => onSelect(event.target.value)}>
      <option value="">Select Country</option>
      {countries.map(country => (
        <option key={country.iso2Code} value={country.iso2Code}>
          {country.name}
        </option>
      ))}
    </select>
  );
};

export default CountrySelect;
