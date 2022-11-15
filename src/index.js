import './css/styles.css';
import debounce from "lodash.debounce";
import {fetchCountries} from './fetchCountries.js'

const refs = {
    countryInfo : document.querySelector('.country-info'),
    countryList: document.querySelector('.country-list'),
    input : document.getElementById('search-box')
}


const DEBOUNCE_DELAY = 300;

refs.input.addEventListener('input',debounce(onSearch,DEBOUNCE_DELAY))

function onSearch(e) {
let name = e.target.value;
let NAME = name.trim().toLowerCase();
if(NAME === ''){
    refs.countryList.innerHTML = '';
    refs.countryInfo.innerHTML = '';
    return;
}
fetchCountries(NAME)

}

