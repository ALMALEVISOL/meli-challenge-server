const express = require("express");
const router = express.Router();
const brandController = require("../../controllers/brandController");

router
  .get("/", brandController.getAllBrands)
  .get("/:id", brandController.getBrandById)
  .post("/", brandController.createNewBrand)
  .delete("/:id", brandController.deleteBrandById)
  .put("/:id", brandController.updateBrandById);

module.exports = router;