const axios = require("axios");
const { getMarketName } = require("../utils");
const { ACTION_TO_KEY, INVERSE_OF_ACTION } = require("../constants");

const exchangeCurrency = async (req, res, next) => {
  const {
    body: { action, base_currency, quote_currency, amount },
  } = req;
  try {
    if (!Number(amount)) {
      throw new Error('Invalid amount')
    }
    const amountNumber = parseInt(amount);
    if (action !== 'buy' && action !== 'sell') {
      throw new Error('Invalid action')
    }
    const markets = await axios.get(`https://ftx.com/api/markets`);
    const spotMarkets = markets.data.result
      .filter((market) => market.type === "spot")
      .map((market) => market.name);

    const isDirect = spotMarkets.includes(
      getMarketName({ base_currency, quote_currency, isInverse: false })
    );
    const isInverse = spotMarkets.includes(
      getMarketName({ base_currency, quote_currency, isInverse: true })
    );

    if (!isInverse && !isDirect) {
      throw new Error("No such currency exchange exists");
    }

    const marketType = getMarketName({ base_currency, quote_currency, isInverse });

    const { data } = await axios.get(
      `https://ftx.com/api/markets/${marketType}/orderbook?depth=100`
    );

    let orders = data.result[ACTION_TO_KEY[isInverse ? INVERSE_OF_ACTION[action] : action]];

    if (isInverse) {
      orders = orders.map((order) => [1 / order[0], order[0] * order[1]]);
    }

    const { totalAmount, totalPrice } = orders.reduce(
      (prev, curr) => {
        const unitPrice = curr[0];
        const orderAmount = curr[1];

        const canTakeActionOnFullAmount = prev.totalAmount + orderAmount <= amountNumber;
        const amountToTakeAction = canTakeActionOnFullAmount
          ? orderAmount
          : amountNumber - prev.totalAmount;

        return {
          totalAmount: prev.totalAmount + amountToTakeAction,
          totalPrice: prev.totalPrice + unitPrice * amountToTakeAction,
        };
      },
      { totalAmount: 0, totalPrice: 0 }
    );

    res.json({
      total: totalPrice,
      price: totalPrice / totalAmount,
      currency: quote_currency,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { exchangeCurrency };
