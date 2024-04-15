const User = require("../models/users");

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUserById = async (req, res) => {
  const { name, email } = req.body;
  console.log(name, email, "this body");
  try {
    const user = await User.findById(req.params.id);
    const userName = await User.findOne({ name });
    const userEmail = await User.findOne({ email });
    console.log(userName, "name", userEmail, "email");

    res.json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.saveUser = async (req, res) => {
  const user = new User(req.body);
  try {
    const inserteduser = await user.save();
    res.status(201).json(inserteduser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const updateduser = await User.updateOne(
      { _id: req.params.id },
      { $set: req.body }
    );

    const PayLoad = {
      status: 200,
      message: "Update User Berhasil ",
      update: req.body,
    };
    res.status(200).json(PayLoad);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const deleteduser = await User.deleteOne({ _id: req.params.id });
    const PayLoad = {
      status: 200,
      message: "Delete User Berhasil ",
      update: req.body,
    };

    res.status(200).json(PayLoad);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
