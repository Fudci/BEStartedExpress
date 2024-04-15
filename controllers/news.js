const News = require("../models/news");

exports.newsAll = async (req, res, next) => {
  console.log(req.body, "log masukk");
  try {
    const NewsFindOne = await News.find();
    console.log(NewsFindOne, "this responseo");
    res.json(NewsFindOne);
  } catch (error) {
    res.status(400).send("eror");
  }
};

const mongoose = require("mongoose");

exports.paginationNews = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) - 1 || 0;
    const limit = parseInt(req.query.limit) || 5;

    // Construct query to fetch news articles
    const news = await News.find({})
      .sort({ _id: -1 }) // Sorting by ObjectId in descending order
      .skip(page * limit)
      .limit(limit);

    // Count total number of news articles
    const total = await News.countDocuments();

    // Prepare response object
    const response = {
      total,
      page: page + 1,
      limit,
      news,
    };

    // Send response
    res.status(200).json(response);
  } catch (error) {
    // Handle errors
    next(error);
  }
};
