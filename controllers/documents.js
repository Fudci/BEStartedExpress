const Document = require("../models/document");


exports.postDoc = async (req, res) => {
  console.log(req.file, "this body");
  // upload.single("avatar");
  try {
    // const users = await User.find();
    // res.json(users);
  } catch (error) {
    console.log(error, "eror nid");
    res.status(500).json({ message: error.message });
  }
};
