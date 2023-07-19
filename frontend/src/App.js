import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DateRangeSelect from './components/DateRangeSelect';
import ChartComponent from './ChartComponent';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [indicators, setIndicators] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedIndicator, setSelectedIndicator] = useState('');
  const [chartData, setChartData] = useState(null);
  const [chartType, setChartType] = useState('column');
  const [viewName, setViewName] = useState('');
  const [savedViews, setSavedViews] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  useEffect(() => {
    fetchCountries();
    fetchIndicators();
    fetchSavedViews();
  }, []);

  const fetchCountries = async () => {
    try {
      const response = await axios.get('https://api.worldbank.org/v2/country?format=json');
      const countriesData = response.data[1];
      setCountries(countriesData);
    } catch (error) {
      console.error('Error fetching countries:', error);
    }
  };

  const fetchIndicators = async () => {
    try {
      const response = await axios.get('https://api.worldbank.org/v2/indicator?format=json');
      const indicatorsData = response.data[1];
      setIndicators(indicatorsData);
    } catch (error) {
      console.error('Error fetching indicators:', error);
    }
  };

  const fetchIndicatorData = async () => {
    if (selectedCountry && selectedIndicator) {
      try {
        const startDate = '2018'; // Replace with actual start date
        const endDate = '2020'; // Replace with actual end date
        const apiUrl = `https://api.worldbank.org/v2/country/${selectedCountry}/indicator/${selectedIndicator}?date=${startDate}:${endDate}&format=json`;
        const response = await axios.get(apiUrl);
        const indicatorData = response.data[1];
        setChartData(indicatorData);
      } catch (error) {
        console.error('Error fetching indicator data:', error);
        setChartData(null);
      }
    }
  };

  const processChartData = (data) => {
    // Placeholder data processing - Replace with actual data processing based on chartType
    // For simplicity, assuming the chart type doesn't affect the data format in this example
    return data;
  };

  const saveView = async () => {
    if (viewName && selectedCountry && selectedIndicator && chartData) {
      const newView = {
        name: viewName,
        country: selectedCountry,
        indicator: selectedIndicator,
        chartType,
        chartData,
      };
      // Here, you would make an API call to your backend to save the view
      // For example: await axios.post('/views/save', newView);
      // Java backend will get this and do his job
      console.log('Save this view:', newView);
      fetchSavedViews(); // Refresh the saved views list
    }
  };
  const handleCountryChange = (event) => {
    const { value } = event.target;
    // Filter the countries based on the user input
    const filteredCountries = countries.filter((country) =>
      country.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredCountries(filteredCountries);
    setSelectedCountry(value); // Update the selected country
  };

  const fetchSavedViews = async () => {
    // Placeholder fetchSavedViews - Replace with actual API call to the backend
    try {
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
    } catch (error) {
      console.error('Error fetching saved views:', error);
      setSavedViews([]);
    }
  };

  const handleDateRangeChange = (startDate, endDate) => {
    // Placeholder function for handling date range changes (if needed)
    console.log('Selected Start Date:', startDate);
    console.log('Selected End Date:', endDate);
  };

  return (
    <div>
      <div>
        {/* Country selection with autocomplete */}
        <label htmlFor="countrySelect">Select Country:</label>
        <input
          type="text"
          id="countrySelect"
          value={selectedCountry}
          onChange={handleCountryChange}
          list="countryOptions" // Connect input to the datalist options
        />
        <datalist id="countryOptions">
          {filteredCountries.map((country) => (
            <option key={country.id} value={country.name} />
          ))}
        </datalist>
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
        {/* Chart rendering */}
        {chartData ? (
          <ChartComponent data={processChartData(chartData)} type={chartType} />
        ) : (
          <div>No data available for the selected date range.</div>
        )}
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
        <table>
          <thead>
            <tr>
              <th>View Name</th>
              <th>Country</th>
              <th>Indicator</th>
              <th>Chart Type</th>
              <th>Date Range</th> {/* New column for DateRange */}
            </tr>
          </thead>
          <tbody>
            {savedViews.map((view) => (
              <tr key={view.id}>
                <td>{view.name}</td>
                <td>{view.country}</td>
                <td>{view.indicator}</td>
                <td>{view.chartType}</td>
                <td>
                  {view.startDate} to {view.endDate}
                </td> {/* Display the DateRange */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default App;
