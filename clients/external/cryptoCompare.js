const axios = require("axios");
const { GET_METHOD, SUCCESS } = require("../../constants/http");

const currentCryptoValue = async (tokenName, currency) => {
  try {
    let config = {
      method: GET_METHOD,
      maxBodyLength: Infinity,
      url: process.env.CRYPTOCOMPARE_URL,
      headers: {},
      params: {
        fsym: tokenName,
        tsyms: currency,
        api_key: process.env.CRYPTOCOMPARE_API_KEY,
      },
    };

    let response = await axios.request(config);
    if (response.status == SUCCESS) {
      return response.data[currency];
    } else {
      throw response;
    }
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = { currentCryptoValue };
