const brandSchema = require("../database/models/BrandModel");

const getAllBrands = (req, res) => {
  brandSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
};

const getBrandById = (req, res) => {
  const { id } = req.params;
  brandSchema
    .findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
};

const createNewBrand = (req, res) => {
  console.log( req.body )
  if( Array.isArray(req.body)  ){
    debugger
    brandSchema.insertMany(req.body)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
    return
  }
  
  const brand = brandSchema(req.body);
  brand
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
};

const deleteBrandById = (req, res) => {
  const { id } = req.params;
  brandSchema
    .remove({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
};

const updateBrandById = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  brandSchema
    .updateOne({ _id: id }, { $set: { name } })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
};

module.exports = {
    getAllBrands,
    getBrandById,
    createNewBrand,
    deleteBrandById,
    updateBrandById,
};
