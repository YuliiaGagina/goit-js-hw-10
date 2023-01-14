import './css/styles.css';
var debounce = require('lodash.debounce');
import Notiflix from 'notiflix';
import { CountryApi } from './fetchCountries';
import Notiflix from 'notiflix';

const countryApi = new CountryApi();

const DEBOUNCE_DELAY = 300;

const refs = {
  inputSsearchEl: document.querySelector('[id=search-box]'),
  introduceCountryEl: document.querySelector('.country-list'),
  countryInfoEl: document.querySelector('.country-info'),
};

const onSearchInput = e => {
  const countries = refs.inputSsearchEl.value.trim();
  if (countries === '') {
    refs.introduceCountryEl.innerHTML = '';
    refs.countryInfoEl.style.opacity = 0;
  }
  console.log();

  countryApi
    .fetchCountries(countries)
    .then(data => {
        console.log(data);
      if (data.status == '404') {
        Notiflix.Notify.failure('Oops, there is no country with that name');
      } else if (data.length >= 10) {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      } else if (data.length === 1) {
        refs.countryInfoEl.style.opacity = 1;
        renderDataAboutCountry(data);
      } else {
        refs.countryInfoEl.style.opacity = 0;
      }
      renderMurkup(data);
    })
    .catch(error => {
      console.log(error);
    });
};
refs.inputSsearchEl.addEventListener(
  'input',
  debounce(onSearchInput, DEBOUNCE_DELAY)
);

function renderMurkup(countries) {
  const markup = countries
    .map(country => {
      return ` <li class="country-list-item">
        <img class="country-img" width=200 height=150 src="${country.flags.svg}" alt="country">
        <p class="country-name">${country.name.official}</p>
        </li> `;
    })
    .join('');
  refs.introduceCountryEl.innerHTML = markup;
}

function renderDataAboutCountry(countries) {
    
  const datamarkup = countries
    .map(({capital, languages, population}) => {
      return `<ul class="list-information">
        <li class="list-information-item">Capital: ${capital} </li>
        <li class="list-information-item">Languages: ${languages} </li>
        <li class="list-information-item">Population: ${population} </li>
        </ul>`;
    })
    .join('');
  refs.countryInfoEl.innerHTML = datamarkup;
}
