const User = require("../models/users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

exports.register = async (req, res) => {
  const { name, email, gender, password } = req.body;
  console.log("register", req.body);
  try {
    const isAlreadyExist = await User.findOne({ name });
    console.log(isAlreadyExist);
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword, "this passwrod");
    const newUser = new User({
      name,
      email,
      gender,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
    if (isAlreadyExist) {
      throw "User sudah ada";
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  const { name, password } = req.body;
  try {
    const user = await User.findOne({ $or: [{ name: name }, { email: name }] });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Error logging in" });
  }
};
