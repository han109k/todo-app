const express = require("express");
const cors = require("cors");
const app = express();
const jwtAuth = require("./routes/jwtAuth");
const dashboard = require("./routes/dashboard");

app.use(cors());
app.use(express.json()); // allows us to access the req.body

// ROUTES
// register and login routes
app.use("/api/v2/auth", jwtAuth);

app.use("/api/v2/dashboard", dashboard);

const port = 5001;
app.listen(port, () => {
  console.log(`Listening on port : ${port}`);
});
