// Import necessary modules
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const UserRoute = require("./routes/userRoutes");
const DocumentRoutes = require("./routes/documentRoutes");
const AuthRoutes = require("./routes/authRouters");
const NewsRoutes = require("./routes/newsRoutes.js");

const handlingErrorBefore = require("./middleware/handlingErrorBeforeRoute.js");
const handlingErrorAfter = require("./middleware/handlingErrorAfterRoute.js");
const authorization = require("./middleware/authorization.js");

// Load environment variables from .env file
dotenv.config();

// Set up Express app
const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
const mongoString = process.env.MONGO;
mongoose
  .connect(mongoString)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// Configure body-parser for JSON and URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static("public"));

// Middleware for error handling before routes
app.use(handlingErrorBefore);


app.get("/", (req, res) => res.send("Express on Vercel"));

// Mount routes
app.use(UserRoute);

app.use(DocumentRoutes);
app.use(AuthRoutes);
app.use(NewsRoutes)

// Middleware for error handling after routes
app.use(handlingErrorAfter);

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
