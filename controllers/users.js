const User = require("../models/users");
const imageKit = require("../util/imageKit");

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
  console.log(req, 'this');
  try {
    const { firstName, lastName, location, phoneNumber, address, email, password } = req.body;

    // Handle image upload
    const imageUpload = await imageKit.upload({
      file: req.file.buffer.toString("base64"),
      fileName: req.file.originalname,
      folder: "posttest",
      useUniqueFileName: false,
    });

    // Create a new user with the image URL
    const user = new User({
      firstName,
      lastName,
      location,
      phoneNumber,
      address,
      email,
      password,
      profilePicture: [{
        fileName: imageUpload.name,
        filePath: imageUpload.url,
      }],
    });

    // Save the user to the database
    const insertedUser = await user.save();
    res.status(201).json(insertedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    let imageUrl = null;
    if (req.file) {
      const imageUpload = await imageKit.upload({
        file: req.file.buffer.toString("base64"),
        fileName: req.file.originalname,
        folder: "posttest",
        useUniqueFileName: false,
      });
      imageUrl = imageUpload.url;
    }

    let updateData = {};
    for (let key in req.body) {
      if (req.body[key]) {
        updateData[key] = req.body[key];
      }
    }

    if (imageUrl) {
      updateData.profilePicture = { fileName: req.file.originalname, filePath: imageUrl };
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      status: 200,
      message: "Update User Successful",
      update: updatedUser,
    });
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
