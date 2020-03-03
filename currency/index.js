const axios = require('axios');
const money = require('money');

// conversion rate from the base currency to most used currencies
const RATES_URL = 'https://api.exchangeratesapi.io/latest';

// actual value of 1 Bitcoin in all the most used currencies in the promises array
const BLOCKCHAIN_URL = 'https://blockchain.info/ticker';
const CURRENCY_BITCOIN = 'BTC';

/**
 * check if one of the currency is Bitcoin (BTC)
 * @param {String} from - a currency (ex : EUR)
 * @param {String} to - a currency (ex : USD)
 */
const isAnyBTC = (from, to) => [from, to].includes(CURRENCY_BITCOIN);

module.exports = async opts => {
  const {amount = 1, from = 'USD', to = CURRENCY_BITCOIN} = opts;
  const promises = [];
  let base = from;

  const anyBTC = isAnyBTC(from, to);

  /**
   * if one of the currency is Bitcoin,
   * check if Bitcoin is the "from" currency
   * if not, base = from
   * otherwise, base = to  
   */
  if (anyBTC) {
    base = from === CURRENCY_BITCOIN ? to : from;

    
    //add a GET request from BLOCKCHAIN_URL to the promises array
    promises.push(axios(BLOCKCHAIN_URL));
  }
    
  // add at the beginning of the promises array a GET request to RATES_URL with the correct base
  promises.unshift(axios(`${RATES_URL}?base=${base}`));

  try {
    // start all the promises of the array
    const responses = await Promise.all(promises);
    const [rates] = responses;

    // set the params of money module (values of RATES_URL)
    money.base = rates.data.base;
    money.rates = rates.data.rates;

    const conversionOpts = {
      from,
      to
    };

    /**
     * if one of the currencies is Bitcoin
     * checks if the response has a property with the base currency
     * returns the data of BLOCKCHAIN_URL in blockchain
     */
    if (anyBTC) {
      const blockchain = responses.find(response =>
        response.data.hasOwnProperty(base)
      );

      //copy the data of 'BTC' (the last rate of the Bitcoin) in money.rates (add a key/value 'BTC' with the actual rate to the rates array)
      Object.assign(money.rates, {
        'BTC': blockchain.data[base].last
      });
    }

    /**
     * if one of the currencies is Bitcoin
     * reverse the values of from and to since all the values in money.rates are from Bitcoin and not to Bitcoin
     */
    if (anyBTC) {
      Object.assign(conversionOpts, {
        'from': to,
        'to': from
      });
    }

    return money.convert(amount, conversionOpts);
  } catch (error) {
    throw new Error (
      '💵 Please specify a valid `from` and/or `to` currency value!'
    );
  }
};
