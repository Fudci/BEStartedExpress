const User = require("../models/users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { generateOTP, sendOTP } = require("../util/otp");
require("dotenv").config();

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  console.log("register", req.body);
  try {
    const isAlreadyExist = await User.findOne({ name });
    console.log(isAlreadyExist);
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword, "this passwrod");
    const newUser = new User({
      name,
      email,
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

exports.login = async (req, res, next) => {
  const { name, password } = req.body;
  try {
    const user = await User.findOne({ $or: [{ name: name }, { email: name }] });
    if (!user) {
      throw next({ message: "User not found" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw next({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: 60,
    });
    var token2 = jwt.sign({ foo: "bar" }, "secret key", { expiresIn: 60 * 60 }); // 1 sec
    console.log(token2);
    setTimeout(() => {
      try {
        var decoded = jwt.verify(token2, "secret key");
        console.log(decoded, "dec0de token");
      } catch (err) {
        console.log("error", err);
      }
    }, 2000);
    const OTP = generateOTP();
    // if (name.includes("@gmail.com")) {
    //   sendOTP(name, OTP);
    // }
    console.log(generateOTP());
    // const validOTP = await bcrypt.compare(otp, hashOTP);

    res.status(200).json({ token });
  } catch (error) {
    next({ message: "Error logging in" });
  }
};

exports.verifyOTP = async (req, res) => {
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
      exp: Math.floor(Date.now() / 1000) + 60 * 60, // it will be expired after 120s
    });

    // console.log(Math.floor(Date.now() / 1000) + 60 * 60, "thissss expire");
    // const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY);

    const OTP = generateOTP();
    if (name.includes("@gmail.com")) {
      sendOTP(name, OTP);
    }
   
    console.log(generateOTP());
    const validOTP = await bcrypt.compare(otp, hashOTP);

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Error logging in" });
  }
};
