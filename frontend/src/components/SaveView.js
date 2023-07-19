import React, { useState } from 'react';

const SaveView = ({ onSave }) => {
  const [name, setName] = useState('');

  const handleSave = () => {
    // Get the selected country, indicator, chart type, and date range
    // Pass this information to the onSave function to save the view
    //onSave(name, country, indicator, chartType, startDate, endDate);
  };

  return (
    <div>
      <input type="text" placeholder="Name" value={name} onChange={event => setName(event.target.value)} />
      <button onClick={handleSave}>Save View</button>
    </div>
  );
};

export default SaveView;
