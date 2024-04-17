const Document = require("../models/document");
const imageKit = require("../util/imageKit");

exports.postDoc = async (req, res) => {
  try {
    // Check if file exists in the request
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Upload the file to the image kit
    const imageUpload = await imageKit.upload({
      file: req.file.buffer.toString("base64"),
      fileName: req.file.originalname,
      folder: "posttest",
      useUniqueFileName: false,
    });

    console.log(imageUpload, "Upload successful"); // Log success message

    // Respond with success status
    res.status(200).json({ message: "File uploaded successfully" });
  } catch (error) {
    console.error("Error:", error); // Log the error

    // Respond with error status and message
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.postDocMultiple = async (req, res) => {
  console.log(JSON.stringify(req.files));

  const document = [];
  const documentTwo = [];

  for (const [key, value] of Object.entries(req.body)) {
    console.log(`${key}: ${value}`);
    if (key.includes("Family")) {
      document.push(`${key}: ${value}`);
    } else {
      documentTwo.push(`${key}: ${value}`);
    }
  }

  req.files.forEach((el, index) => {
    console.log(el, index);
    if (index == 0) {
      document.push(el);
    } else {
      documentTwo.push(el);
    }
  });

  console.log(document);
  console.log(documentTwo);

  // upload.single("avatar");
  try {
    res.status(200).json("ok");
  } catch (error) {
    console.log(error, "eror nid");
    res.status(500).json({ message: error.message });
  }
};
