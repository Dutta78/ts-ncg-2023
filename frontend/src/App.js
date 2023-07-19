import React, { useState, useEffect } from 'react';
import axios from 'axios'; // You can use Axios for API calls
import DateRangeSelect from './components/DateRangeSelect'

import ChartComponent from './ChartComponent';


const App = () => {
  const [countries, setCountries] = useState([]);
  const [indicators, setIndicators] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedIndicator, setSelectedIndicator] = useState('');
  const [chartData, setChartData] = useState(null);
  const [chartType, setChartType] = useState('column'); // Default chart type is column
  const [viewName, setViewName] = useState('');
  const [savedViews, setSavedViews] = useState([]);

  useEffect(() => {
    fetchCountries();
    fetchIndicators();
    fetchSavedViews();
  }, []);

  const fetchCountries = async () => {
    // Placeholder data - Replace with actual API call
    const countriesData = [
      { id: 'USA', name: 'United States' },
      { id: 'GBR', name: 'United Kingdom' },
      { id: 'CAN', name: 'Canada' },
      // Add more countries...
    ];
    setCountries(countriesData);
  };

  const fetchIndicators = async () => {
    // Placeholder data - Replace with actual API call
    const indicatorsData = [
      { id: 'SP.POP.TOTL', name: 'Population, total' },
      { id: 'NY.GDP.MKTP.CD', name: 'GDP (current US$)' },
      { id: 'EN.ATM.CO2E.PC', name: 'CO2 emissions (metric tons per capita)' },
      // Add more indicators...
    ];
    setIndicators(indicatorsData);
  };

  const fetchIndicatorData = async () => {
    // Placeholder data - Replace with actual API call
    // Simulate fetching data for the selected country and indicator
    if (selectedCountry && selectedIndicator) {
      // Assuming chartData should be an array of objects with { x, y } properties
      const indicatorData = [
        { x: '2018', y: 100 },
        { x: '2019', y: 150 },
        { x: '2020', y: 200 },
        // Add more data points...
      ];
      setChartData(indicatorData);
    }
  };

  const processChartData = (data) => {
    // Placeholder data processing - Replace with actual data processing based on chartType
    // For simplicity, assuming the chart type doesn't affect the data format in this example
    return data;
  };

  const saveView = async () => {
    // Placeholder saveView - Replace with actual API call to the backend
    if (viewName && selectedCountry && selectedIndicator && chartData) {
      const newView = {
        name: viewName,
        country: selectedCountry,
        indicator: selectedIndicator,
        chartType,
        chartData,
      };
      // Here, you would make an API call to your backend to save the view
      console.log('Save this view:', newView);
      fetchSavedViews(); // Refresh the saved views list
    }
  };

  const fetchSavedViews = async () => {
    // Placeholder fetchSavedViews - Replace with actual API call to the backend
    // Simulate fetching saved views from the backend
    const savedViewsData = [
      {
        id: 1,
        name: 'View 1',
        country: 'USA',
        indicator: 'SP.POP.TOTL',
        chartType: 'line',
        chartData: [
          { x: '2018', y: 100 },
          { x: '2019', y: 150 },
          { x: '2020', y: 200 },
          // Add more data points...
        ],
      },
      // Add more saved views...
    ];
    setSavedViews(savedViewsData);
  };

  const handleDateRangeChange = (startDate, endDate) => {
    // Placeholder function for handling date range changes (if needed)
    console.log('Selected Start Date:', startDate);
    console.log('Selected End Date:', endDate);
  };

  return (
    <div>
      <div>
        {/* Country selection */}
        <label htmlFor="countrySelect">Select Country:</label>
        <select
          id="countrySelect"
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
        >
          <option value="">Select a country</option>
          {countries.map((country) => (
            <option key={country.id} value={country.id}>
              {country.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        {/* Indicator selection */}
        <label htmlFor="indicatorSelect">Select Indicator:</label>
        <select
          id="indicatorSelect"
          value={selectedIndicator}
          onChange={(e) => setSelectedIndicator(e.target.value)}
        >
          <option value="">Select an indicator</option>
          {indicators.map((indicator) => (
            <option key={indicator.id} value={indicator.id}>
              {indicator.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        {/* Date range selection */}
        <DateRangeSelect onDateRangeChange={handleDateRangeChange} />
      </div>

      <div>
        {/* Chart rendering */}
        {/* Assuming you have implemented a chart component (e.g., ChartComponent) */}
        {/* Pass chartData and chartType as props */}
        {/* Implement a switch or radio buttons to switch the chartType */}
        {/* For example, you can use chartType: 'line', 'bar', 'area', 'pie', etc. */}
        {/*<ChartComponent data={processChartData(chartData)} type={chartType} />}
      </div>

      <div>
        {/* Save view */}
        <label htmlFor="viewName">View Name:</label>
        <input
          type="text"
          id="viewName"
          value={viewName}
          onChange={(e) => setViewName(e.target.value)}
        />
        <button onClick={saveView}>Save View</button>
      </div>

      <div>
        {/* Display the list of saved views */}
        <h2>Saved Views</h2>
        <ul>
          {savedViews.map((view) => (
            <li key={view.id}>
              {view.name} - {view.country} - {view.indicator} - {view.chartType}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
