// src/components/IndicatorSelect.js
import React, { useEffect, useState } from 'react';
import { fetchIndicators } from '../utils/api';

const IndicatorSelect = ({ onSelect }) => {
  const [indicators, setIndicators] = useState([]);

  useEffect(() => {
    const cachedIndicators = JSON.parse(localStorage.getItem('indicators'));
    if (cachedIndicators) {
      setIndicators(cachedIndicators);
    } else {
      fetchIndicators().then(setIndicators);
    }
  }, []);

  return (
    <select onChange={event => onSelect(event.target.value)}>
      <option value="">Select Indicator</option>
      {indicators.map(indicator => (
        <option key={indicator.id} value={indicator.id}>
          {indicator.name}
        </option>
      ))}
    </select>
  );
};

export default IndicatorSelect;
