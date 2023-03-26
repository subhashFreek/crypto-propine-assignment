const { DEPOSIT } = require("../../constants/crypto");

const portfolioCalculator = (tokenInfo, data) => {
  if (!tokenInfo[data.token]) {
    tokenInfo[data.token] =
      data.transaction_type === DEPOSIT
        ? Number(data.amount)
        : Number(-data.amount);
  } else {
    tokenInfo[data.token] =
      data.transaction_type === DEPOSIT
        ? Number(tokenInfo[data.token]) + Number(data.amount)
        : Number(tokenInfo[data.token]) - Number(data.amount);
  }
};

module.exports = { portfolioCalculator };
