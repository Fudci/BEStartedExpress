const {
  postItems,
  getItems,
  updateItems,
  deleteItem,
  getItemById
  } = require("../controllers/items");
  
  const express = require("express");
  const router = express.Router();
  const authorization = require("../middleware/authorization");
  const multerHelper = require("../util/multerHelp");

  
  router.get("/item", authorization,getItems);
  router.get("/item/:id",authorization, getItemById);
  router.post("/item",authorization, multerHelper.single("files"),postItems);
  router.patch("/item/:id",authorization,multerHelper.single("files"), updateItems );
  router.delete("/item/:id",authorization, deleteItem);
  
  module.exports = router;
  