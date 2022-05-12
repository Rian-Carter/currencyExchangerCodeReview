export default class CurrencyExchange {
  static async exchangeCurrency(startingCurrency, convertedCurrency) {
    try {
      const url = `https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/pair/${startingCurrency}/${convertedCurrency}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    } catch(error) {
      return error.message;
    }
  }
}