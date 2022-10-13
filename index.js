require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const corsOption = {
  origin: ["https://almalevisol.uc.r.appspot.com", "http://localhost:3000"],
};
app.use(cors(corsOption));

const v1Item = require("./src/v1/routes/itemRoutes");
const v1Category = require("./src/v1/routes/categoryRoutes");

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));
app.use("/api/v1/items", v1Item);
app.use("/api/v1/categories", v1Category);

app.listen(8000, () => {
  console.log("servidor escuchando en el puerto: 8000");
});

module.exports = {
  app,
};
