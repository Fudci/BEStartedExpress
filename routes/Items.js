const {
  postItems,
  getItems,
  updateItems,
  deleteItem,
  getItemById
  } = require("../controllers/items");
  
  const express = require("express");
  const router = express.Router();
  
  router.get("/item", getItems);
  router.get("/item/:id", getItemById);
  router.post("/item", postItems);
  router.patch("/item/:id", updateItems );
  router.delete("/item/:id", deleteItem);
  
  module.exports = router;
  