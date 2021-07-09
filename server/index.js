const express = require("express");
const cors = require("cors");
const app = express();
const jwtAuth = require("./routes/jwtAuth");
const dashboard = require("./routes/dashboard");

app.use(cors());
app.use(express.json()); // allows us to access the req.body

// ROUTES
// register and login routes
app.use("/auth", jwtAuth);

app.use("/dashboard", dashboard);

app.listen(3001, () => {
  console.log("Listening on port : 3001");
});
