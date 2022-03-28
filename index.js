const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept",
    next()
  );
});

require("./routes/routes")(app);
require("dotenv").config();
require("./config/database").connect();

const { API_PORT } = process.env;
const port = process.env.PORT || API_PORT;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
