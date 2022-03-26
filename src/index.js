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
    const convertedUSD = (response.conversion_rate * userInput).toFixed(2);
    $('#show-converted').append(`USD is worth ${convertedUSD} ${selectedExchange}.<br>`);
  } else {
    $(`#show-errors`).text(`There was an error: ${response}`);
    $('#show-errors').text(`There was an error: Please select a real currency`);

  }
}

async function makeApiCall(selectedCurrency, userInput, selectedExchange) {
  const response = await CurrencyExchange.exchangeCurrency(selectedCurrency);
  getElements(response, userInput, selectedExchange);
}

$(document).ready(function() {
  $('#displayExchangeRate').click(function() {
    let currency = parseInt($('#currency').val());
    let selectExchange = $('#selectExchange').val();
    clearFields();
    makeApiCall(selectExchange, currency, selectExchange);
    $('#show-results').show();
    $('#show-errors').show();
  });
});