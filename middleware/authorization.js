const jwt = require("jsonwebtoken");

const authorization = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(403).json({ error: "No credentials sent!" });
  }
  const token = req.headers.authorization;
  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    console.log(err, "this eror");
    if (err) {
      return res.status(403).json({ error: "Failed to authenticate token." });
    }
    req.user = decoded.userId;
    // this check when token is expired
    const currentTime = Date.now(); // Current time in seconds

    console.log(decoded, "this decode");
    const timestamp = decoded.iat * 1000;
    const date = new Date(timestamp);
    const dateNow = new Date(currentTime);

    const formattedDate = date.toLocaleString();
    console.log({
      expired: timestamp < currentTime,
      datenow: currentTime,
      iat: timestamp,
      formateIa: formattedDate,
      formatedDate: dateNow.toLocaleString(),
    });
    console.log(req.user, "this id");
    next();
  });
};

module.exports = authorization;
