const User = require("../models/users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { generateOTP, sendOTP } = require("../util/otp");
require("dotenv").config();
const imageKit = require("../util/imageKit");


exports.register = async (req, res) => {
  try {
    const { firstName, lastName, location, phoneNumber, address, email, password } = req.body;

    const imageUpload = await imageKit.upload({
      file: req.file.buffer.toString("base64"),
      fileName: req.file.originalname,
      folder: "posttest",
      useUniqueFileName: false,
    });

    const passwordHash = await bcrypt.hash(password,10);


    const user = new User({
      firstName,
      lastName,
      location,
      phoneNumber,
      address,
      email,
      password : passwordHash,
      profilePicture: [{
        fileName: imageUpload.name,
        filePath: imageUpload.url,
      }],
    });

    const insertedUser = await user.save();
    res.status(201).json({
      status:201,
      message:'succes',
      data:insertedUser
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};



exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({email:email});
    console.log(user,'this found');
    if (!user) {
      throw next({ message: "User not found" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw next({ message: "Invalid credentials" });

      
    }

    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY);
    var token2 = jwt.sign({ foo: "bar" }, "secret key");
    
    // const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
    //   expiresIn: 60,
    // });
    // var token2 = jwt.sign({ foo: "bar" }, "secret key", { expiresIn: 60 * 60 }); // 1 sec
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
    // console.log(generateOTP());
    // const validOTP = await bcrypt.compare(otp, hashOTP);

    res.status(200).json({
      status:200,
      messages:'success',
      data:{
        user:user,
        token:token
      }
    });
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
