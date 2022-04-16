require("dotenv/config");

const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;
const API_URL = process.env.API_URL;

app.use(cors());
app.options("*", cors());

// Middleware
app.use(express.json());
app.use(morgan("tiny"));

// Routes
const categoriesRoute = require("./routes/categories");
const productsRoute = require("./routes/products");
const ordersRoute = require("./routes/orders");
const usersRoute = require("./routes/users");

app.use(`${API_URL}/products`, productsRoute);
app.use(`${API_URL}/categories`, categoriesRoute);
app.use(`${API_URL}/orders`, ordersRoute);
app.use(`${API_URL}/users`, usersRoute);

// DB connection
mongoose
  .connect(process.env.DB_CONNECTION)
  .then(() => console.log("Connection to DB established!"))
  .catch((err) => console.log(err));

app.listen(PORT, () => {
  console.log("Server running on http://localhost:3000");
});
