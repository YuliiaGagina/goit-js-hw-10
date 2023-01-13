'use strict';



export class CountryApi {


  fetchCountries(countryName) {
    const params = new URLSearchParams({
      fields: 'name,capital,population,languages,flags',
    });

    return fetch(
      `https://restcountries.com/v3.1/name/${countryName}?${params}`
    ).then(res => {
     return res.json();
    });
  }
}

