const fs = require("fs");
const csvParser = require("csv-parser");
const argv = require("../../config/cli");
const { INPUT_FILE_PATH, CURRENCY } = require("../../constants/crypto");
const { clearLoader } = require("../../utils/loader");
const { currentCryptoValue } = require("../../clients/external/cryptoCompare");
const { portfolioCalculator } = require("../portfolioCalculator");

let tokens = [];
let tokenInfo = {};

const tokenInformation = (dir, loading) => {
  fs.createReadStream(`${dir}/${INPUT_FILE_PATH}`)
    .pipe(csvParser())
    .on("data", (data) => {
      // check if token is present or not
      if (!tokens.includes(data.token)) {
        tokens.push(data.token);
      }

      if (argv.token && argv.date) {
        // user have input token and date
        if (
          data.token === argv.token &&
          data.timestamp >= argv.startTimestamp &&
          data.timestamp < argv.endTimestamp
        ) {
          // given date and token, calculat portfolio value of that token on that date
          portfolioCalculator(tokenInfo, data);
        }
      } else if (argv.date) {
        // user have input only date
        if (
          data.timestamp >= argv.startTimestamp &&
          data.timestamp < argv.endTimestamp
        ) {
          // given a date, calculate the portfolio value per token on that date
          portfolioCalculator(tokenInfo, data);
        }
      } else if (argv.token) {
        // user have input only token
        if (data.token === argv.token) {
          // Given a token, calculate the latest portfolio value for that token
          portfolioCalculator(tokenInfo, data);
        }
      } else {
        // Given no parameters, calculate the latest portfolio value per token in USD
        portfolioCalculator(tokenInfo, data);
      }
    })
    .on("end", async () => {
      if (Object.keys(tokenInfo).length === 0) {
        clearLoader(loading);
        if (argv.date && argv.token) {
          if (tokens.includes(argv.token)) {
            console.error(
              `No transactions found for token ${argv.token} on ${argv.date}`
            );
          } else {
            console.error(`${argv.token} token not found`);
          }
        } else if (argv.token) {
          console.error(`${argv.token} token not found`);
        } else if (argv.date) {
          console.error(`No transaction found on ${argv.date} `);
        } else {
          console.error("No transactions data found in the CSV");
        }
        return;
      } else {
        for (let [token, amount] of Object.entries(tokenInfo)) {
          tokenInfo[token] =
            amount * (await currentCryptoValue(token, CURRENCY));
        }
        clearLoader(loading);
        console.log(`Your portfolio for the request in ${CURRENCY}`);
        console.log(tokenInfo);
      }
    })
    .on("error", (err) => console.log(err));
};

module.exports = { tokenInformation };
