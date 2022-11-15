import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
    countryInfo : document.querySelector('.country-info'),
    countryList: document.querySelector('.country-list'),
    input : document.getElementById('search-box')
}

export function fetchCountries(name){
    fetch(`https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`)
   .then(response => {
    if(!response.ok){
    throw new Error(response.status)
    }
    return response.json()})
   .then(data => {
    const oneMatch = data.length === 1;
    const maxMatch = 10;
       // console.log(data)
        if(oneMatch){
           const markup = data.map(country => 
               `<li class="country-item">
               <div class="country-item__info">
               <img class="country-item__flag"src="${country.flags.svg}" alt="flag ${country.name.official}">
               <h1 class="country-item__name">${country.name.official}</h1>
               </div>
               <p class="country-item__capital">Capital :${country.capital}</p>
               <p class="country-item__population">Population :${country.population}</p>
               <p class="country-item__languages">Languages :${Object.values(country.languages)}</p>
               </li>
               `).join('')
               refs.countryList.innerHTML = markup;
           }
           else if(data.length <= maxMatch) {
               const markup = data.map(country => 
                  `<div class="country-item__info">
                  <img class="country-item__flag"src="${country.flags.svg}" alt="flag ${country.name.official}">
                   <h1 class="country-item__name">${country.name.official}</h1>
                   </div>
               `).join('')
               refs.countryList.innerHTML = "";
               refs.countryInfo.innerHTML = markup;
               
           }
           else if(data.length > maxMatch){
            refs.countryList.innerHTML = '';
            refs.countryInfo.innerHTML = '';
               Notify.info("Too many matches found. Please enter a more specific name.");
           }
   })
   .catch(error => {
    if (error.message === '404') {
        refs.countryList.innerHTML = '';
        refs.countryInfo.innerHTML = '';
        Notify.failure('Oops, there is no country with that name');
      }
      console.log(error);
   })
}
