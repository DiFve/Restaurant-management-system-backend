const http = require("http");
const app = require("./routes");
require("./config/database").connect();
require("dotenv").config();
const server = http.createServer(app);

const { API_PORT } = process.env;
const port = process.env.PORT || API_PORT;

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
