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
    const resItems = await fetch(
      `https://api.mercadolibre.com/sites/MLA/search?q=${req.query.q}`
    );
    const items = await resItems.json();
    res.json(items);
  } catch (error) {
    console.log("Error in getItemByQueryParam::::: ", error);
  }
};

module.exports = {
  getItemById,
  getItemByQueryParam,
  getItemDescription,
};
