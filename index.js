const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
const cors = require("cors");
app.use(
  cors({
    origin: ["http://localhost:3000", "https://frontend.manhermak.com"],
  })
);

require("./routes/routes")(app);
require("dotenv").config();
require("./config/database").connect();

const { API_PORT } = process.env;
const port = process.env.PORT || API_PORT;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
