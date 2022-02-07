const ACTION_TO_KEY = {
  buy: "asks",
  sell: "bids",
};

const INVERSE_OF_ACTION = {
  buy: "sell",
  sell: "buy",
};

module.exports = {
  ACTION_TO_KEY,
  INVERSE_OF_ACTION,
}