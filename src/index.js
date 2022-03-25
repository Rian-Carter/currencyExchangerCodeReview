import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import CurrencyExchange from './../src/js/currencyExchange.js';

function clearFields() {
  $('#show-converted').text("");
  $('#show-errors').val("");
}

function getElements(response, userInput, selectedExchange) {
  if (response) {
    // console.log(response);
    const convertedUSD = (response.conversion_rate * userInput).toFixed(2);
    // console.log(convertedUSD);
    // console.log(selectedExchange);
    $('#show-converted').append(`USD is worth ${convertedUSD} in ${selectedExchange}.<br>`);
  } else {
    $(`#show-errors`).text(`There was an error: ${response}`);
  }
}

async function makeApiCall(selectedCurrency, userInput, selectedExchange) {
  const response = await CurrencyExchange.exchangeCurrency(selectedCurrency);
  // console.log(response);
  getElements(response, userInput, selectedExchange);
}

$(document).ready(function() {
  $('#displayExchangeRate').click(function() {
    let currency = parseInt($('#currency').val());
    let selectExchange = $('#selectExchange').val();
    console.log(selectExchange);
    clearFields();
    makeApiCall(selectExchange, currency, selectExchange);
  });
});