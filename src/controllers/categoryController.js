const fetch = require("node-fetch");

const geCategoryById = async (req, res) => {
  try {
    const resCategory = await fetch(
      `https://api.mercadolibre.com/categories/${req.params.id}`
    );
    const category = await resCategory.json();
    res.json(category);
  } catch (error) {
    console.log("Error in geCategoryById::::: ", error);
  }
};

module.exports = {
  geCategoryById,
};
