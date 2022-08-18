require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
mongoose.set("debug", process.env.isDebug);
const mongoUser = process.env.MONGO_USER;
const mongoPass = process.env.MONGO_PASSWORD;
const v1SubscriberRoutes = require("./src/v1/routes/subscriberRoutes");
const v1Mail = require("./src/v1/routes/mailRoutes");
const v1Brand = require("./src/v1/routes/brandRoutes");
const Bree = require("bree")

//const uri = `mongodb+srv://${mongoUser}:${mongoPass}@joy-cluster-v01.wpnl4.mongodb.net/?retryWrites=true&w=majority`;
const uri = `mongodb+srv://${mongoUser}:${mongoPass}@cluster0.1gktj1o.mongodb.net/?retryWrites=true&w=majority`;

const cors = require('cors');

const corsOption = {
    origin: ['http://localhost:3000'],
};
app.use(cors(corsOption));

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));
app.use("/api/v1/mail", v1Mail);
app.use("/api/v1/subscribers", v1SubscriberRoutes);
app.use("/api/v1/brands", v1Brand);

const bree = new Bree({
  jobs: [{ name: "hi", interval: "1m" }],
});
bree.start();

mongoose
  .connect(uri, {
    useUnifiedTopology: true,
  })
  .then((e) => {
    console.log("conectado");
  })
  .catch((err) => {
    console.log(err, "no conectado");
  }); 

app.listen(8000, () => {
  console.log("servidor escuchando en el puerto: 8000");
});

module.exports = {
  app,
};
