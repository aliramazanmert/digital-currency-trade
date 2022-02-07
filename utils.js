const getMarketName = ({ base_currency, quote_currency, isInverse }) =>
  isInverse ? `${quote_currency}/${base_currency}` : `${base_currency}/${quote_currency}`;

module.exports = { getMarketName }