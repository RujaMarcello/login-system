const bcrypt = require("bcrypt");
const pool = require("../pool");
const router = require("express").Router();
const jwt = require("jsonwebtoken");
const { isEmailValid, isPasswordValid } = require("../helper.js");

router.get("/", async (req, res) => {
  const response = await pool.query("SELECT * FROM users");
  res.status(200).send(response.rows);
});

router.get("/get-emails", async (req, res) => {
  const response = await pool.query("SELECT email FROM users");
  res.status(200).send(response.rows);
});

router.post("/login-data", async (req, res) => {
  try {
    const data = req.body;
    const emailExist = await isEmailValid(data.email);
    if (!emailExist) {
      if ((await isPasswordValid(data.password, data.email)) == true) {
        return res.status(200).json("You are logged");
      } else {
        return res.status(409).json("Wrong email or password");
      }
    } else {
      return res.status(409).json("Wrong email or password");
    }
  } catch (error) {}
});

router.post("/register", async (req, res) => {
  try {
    const data = req.body;
    const emailIsValid = await isEmailValid(data.email);
    if (!emailIsValid) {
      return res.status(409).json("Email is allredy used");
    }
    const saltRounds = bcrypt.genSaltSync(10);
    const cryptedPassword = bcrypt.hashSync(data.password, saltRounds);
    const response = await pool.query(
      "INSERT INTO users (first_name , last_name, email , password) VALUES ($1, $2, $3 , $4)",
      [data.firstName, data.lastName, data.email, cryptedPassword]
    );
    return res.status(200).json("Succesfully");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
