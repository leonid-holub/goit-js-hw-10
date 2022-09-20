import { fetchCountries } from './js/fetchCountries';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import refs from './js/refs';
import { debounce } from 'lodash.debounce';
import './css/styles.css';

const DEBOUNCE_DELAY = 300;

refs.inputCountry.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch() {
  let countryNameForFetch = refs.inputCountry.value;
  fetchCountries(countryNameForFetch)
    .then(countries => {
      let info = '';
      let markup = '';
      if (countries.length > 1 && countries.length <= 10) {
        countries.forEach(function (country, index) {
          markup += `<li style="display: flex; align-items: center; gap: 10px"><img src="${country.flags[0]}" alt="" width="40"/> ${country.name.common}</li>`;
        });
      } else if (countries.length === 1) {
        info += `<p style="display: flex; align-items: center; gap: 10px"><img src="${
          countries[0].flags[0]
        }"
           alt="" width="40"/> <b style="font-size: 36px">
        ${countries[0].name.common}
        </b></p><p><b>Capital:</b> ${
          countries[0].capital
        }</p><p><b>Population:</b> ${
          countries[0].population
        }</p><p><b>Languages:</b> ${Object.values(countries[0].languages)}</p>`;
      } else if (countries.length > 10) {
        Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      }
      refs.countryList.innerHTML = markup;
      refs.countryInfo.innerHTML = info;
    })
    .catch(() => {
      Notify.failure('Oops, there is no country with that name');
    });
}

refs.countryList.style.cssText = `
display: flex;
flex-direction: column;
gap: 10px;
list-style: none;
padding: 0;
font-size: 24px;
`;

refs.countryInfo.style.fontSize = '24px';
