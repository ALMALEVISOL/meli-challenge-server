const fetch = require("node-fetch");

const getItemById = async (req, res) => {
  try {
    const resItem = await fetch(
      `https://api.mercadolibre.com/items/${req.params.id}`
    );
    const item = await resItem.json();
    res.json(item);
  } catch (error) {
    console.log("Error in getItemById::::: ", error);
  }
};

const getCustomJSONItemById = async (req, res) => {
  try {
    const resItem = await fetch(
      `https://api.mercadolibre.com/items/${req.params.id}`
    );
    const item = await resItem.json();
    const resDescriptionItem = await fetch(
      `https://api.mercadolibre.com/items/${req.params.id}/description`
    );
    const itemDescription = await resDescriptionItem.json();
    const customJSON = {
      author: {
        name: "Alejandro",
        lastname: "Del Moral",
      },
      item: {
        id: item["id"],
        title: item["title"],
        price: {
          currency: item["currency_id"],
          amount: item["price"],
          decimals: parseFloat((item["price"] % 1).toFixed(4)),
        },
        picture: item["thumbnail"],
        condition: item["condition"],
        free_shipping: item["shipping"]["free_shipping"],
        sold_quantity: item["sold_quantity"],
        description: itemDescription["plain_text"],
      },
    };
    res.json(customJSON);
  } catch (error) {
    console.log("Error in getCustomJSONItemById::::: ", error);
  }
};

const getItemDescription = async (req, res) => {
  try {
    const resDescriptionItem = await fetch(
      `https://api.mercadolibre.com/items/${req.params.id}/description`
    );
    const item = await resDescriptionItem.json();
    res.json(item);
  } catch (error) {
    console.log("Error in getItemDescription::::: ", error);
  }
};

const getItemByQueryParam = async (req, res) => {
  try {
    const url = isValidateQueryParam(req, "limit")
      ? `https://api.mercadolibre.com/sites/MLA/search?q=${req.query.q}&limit=${req.query.limit}`
      : `https://api.mercadolibre.com/sites/MLA/search?q=${req.query.q}`;
    const resItems = await fetch(url);
    const items = await resItems.json();
    res.json(items);
  } catch (error) {
    console.log("Error in getItemByQueryParam::::: ", error);
  }
};

const getCustomJSONItemsByQueryParam = async (req, res) => {
  try {
    const url = isValidateQueryParam(req, "limit")
      ? `https://api.mercadolibre.com/sites/MLA/search?q=${req.query.q}&limit=${req.query.limit}`
      : `https://api.mercadolibre.com/sites/MLA/search?q=${req.query.q}`;
    const resItems = await fetch(url);
    const items = await resItems.json();
    const customJSON = {
      author: {
        name: "Alejandro",
        lastname: "Del Moral",
      },
      categories: [],
      items: items.results.map((item) => ({
        price: {
          currency: item["currency_id"],
          amount: item["price"],
          decimals: parseFloat((item["price"] % 1).toFixed(4)),
        },
        picture: item["thumbnail"],
        condition: item["condition"],
        free_shipping: item["shipping"]["free_shipping"],
        ...item,
      })),
    };
    res.json(customJSON);
  } catch (error) {
    console.log("Error in getItemByQueryParam::::: ", error);
  }
};

const isValidateQueryParam = (req, param) => {
  //String at the moment
  if (!req.query[param]) return false;
  if (req.query[param] === "null" || req.query[param] === "undefined")
    return false;
  if (isNaN(req.query[param])) return false;
  return true;
};

module.exports = {
  getItemById,
  getItemByQueryParam,
  getItemDescription,
  getCustomJSONItemById,
  getCustomJSONItemsByQueryParam,
};
