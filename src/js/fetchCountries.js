import refs from './refs';
export { fetchCountries };

function fetchCountries(country) {
  if (country.length > 0) {
    return fetch(
      `https://restcountries.com/v3/name/${country.trim()}?fields=name,capital,population,flags,languages`
    ).then(r => {
      if (r.ok) {
        return r.json();
      }
      throw error;
    });
  }
  refs.countryList.innerHTML = '';
  refs.countryInfo.innerHTML = '';
}
