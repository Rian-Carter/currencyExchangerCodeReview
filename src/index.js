import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import CurrencyExchange from './../src/js/currencyExchange.js';

function clearFields() {
  $('#show-converted').text("");
  $('#show-errors').hide();
}

function getElements(response, userInput, convertedCurrency, startingCurrency) {
  if (response) {
    const amount = (response.conversion_rate * userInput).toFixed(2);
    $('#show-converted').append(`Your ${startingCurrency} is worth ${amount} ${convertedCurrency}.<br>`);
    $('#show-errors').text("");
  } else {
    $(`#show-errors`).text(`There was an error: ${response}`);
    $('#show-errors').text(`There was an error: Please select a real currency`);
  }
}

async function makeApiCall(startingCurrency, userInput, convertedCurrency) {
  const response = await CurrencyExchange.exchangeCurrency(startingCurrency, convertedCurrency);
  getElements(response, userInput, convertedCurrency, startingCurrency);
}

$(document).ready(function() {
  $('#displayExchangeRate').click(function() {
    let amount = parseInt($('#currency').val());
    let convertedCurrency = $('#selectExchange').val();
    let startingCurrency = $('#startingCurrency').val();
    makeApiCall(startingCurrency, amount, convertedCurrency);
    clearFields();
    $('#show-results').show();
    $('#show-errors').show();
  });
});