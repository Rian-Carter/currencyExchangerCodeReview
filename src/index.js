import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/css/bootstrap.min.css';
import './css/styles/css';
import CurrencyExchange from './../src/js/currencyExchange.js';

function getElements(response, userInput, selectedCurrency) {
  if (response) {
    const convertUSD = (response.conversion_rate * userInput).toFixed(2);
    $('.showConverted').append(`USD is woth ${convertUSD} in ${selectedCurrency}.`);
  } else {
    $(`.showErrors`).text(`There was an error: ${response}`);
  }
}

async function makeApiCall(selectedCurrency, userInput) {
  const response = await CurrencyExchange.exchangeCurrency(selectedCurrency);
  console.log(response);
  getElements(response, userInput);
}

