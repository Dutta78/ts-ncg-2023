import axios from 'axios';

const API_BASE_URL = 'https://api.worldbank.org/v2';

export async function fetchCountries() {
  const response = await axios.get(`${API_BASE_URL}/country?per_page=300&format=json`);
  const countries = response.data[1].map(country => ({
    name: country.name,
    iso2Code: country.iso2Code,
  }));
  localStorage.setItem('countries', JSON.stringify(countries));
  return countries;
}

export async function fetchIndicators() {
  const response = await axios.get(`${API_BASE_URL}/indicator?per_page=1000&format=json`);
  const indicators = response.data[1].map(indicator => ({
    id: indicator.id,
    name: indicator.name,
  }));
  localStorage.setItem('indicators', JSON.stringify(indicators));
  return indicators;
}

export async function fetchData(country, indicator, startDate, endDate) {
  const response = await axios.get(
    `${API_BASE_URL}/country/${country}/indicator/${indicator}?date=${startDate}:${endDate}&format=json`
  );
  return response.data[1];
}
