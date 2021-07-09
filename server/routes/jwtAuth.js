const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const db = require("../db");
const jwtGenerator = require("../utils/jwtgenerator");
const validInfo = require("../middleware/validinfo");
const authorize = require("../middleware/authorization");

//* REGISTER
router.post("/register", validInfo, async (req, res) => {
  try {

    // todo: destructure the req.body (name, email, password)
    const { name, email, password } = req.body;

    // todo: check whether user exist or not
    const user = await db.query("SELECT * FROM users WHERE user_email = $1", [
      email
    ]);

    if (user.rows.length !== 0) {
      return res.status(401).json("User already exist");
    }

    // todo: Bcrypt the user password
    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);

    const bcryptPassword = await bcrypt.hash(password, salt);

    console.log(bcryptPassword);

    // todo: insert the new user into db
    const newUser = await db.query(
      "INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *",
      [name, email, bcryptPassword]
    );

    console.log(newUser.rows);

    // todo: generate jwt token
    const token = jwtGenerator(newUser.rows[0].user_id);

    res.json({ token });

  } catch (error) {
    console.error(error.message);
    res.status(500).send("server Error");
  }
});

//* LOGIN
router.post("/login", validInfo, async (req, res) => {
  try {
    // todo: destructure
    const { email, password } = req.body;

    // todo: check if user exists or not
    const user = await db.query("SELECT * FROM users WHERE user_email = $1", [
      email,
    ]);
    
    console.log(user);

    if (user.rows.length === 0) {
      return res.status(401).json("Password or Email is incorrect");
    }

    // todo: check if password matching with the one in database
    const validPassword = await bcrypt.compare(
      password,
      user.rows[0].user_password
    ); // boolean

    console.log(validPassword);

    if (!validPassword) {
      return res.status(401).json("Password or Email is incorrect");
    }

    // todo: generate jwt token
    const token = jwtGenerator(user.rows[0].user_id);
    res.json({ token });
    
  } catch (error) {
    console.error(error.message);
  }
});

router.post("/verify", authorize, (req, res) => {
  try {
    res.json(true);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server error");
  }
});

module.exports = router;
