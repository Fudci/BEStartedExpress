const Document = require("../models/document");

exports.postDoc = async (req, res) => {
  console.log(JSON.stringify(req.file), JSON.stringify(req.body));

  // upload.single("avatar");
  try {
    res.status(200).json("ok");
  } catch (error) {
    console.log(error, "eror nid");
    res.status(500).json({ message: error.message });
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
