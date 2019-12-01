const mongoose = require("mongoose");
const { Schema } = mongoose;
const urlSchema = new Schema({
  originalUrl: String,
  urlCode: String,
  shortUrl: String,
  creationDate: { type: Date, default: Date.now },
  expirationDate: Date,
  userId: String,
  hitCount: Number,
  hitTime: Date
});
mongoose.model("url", urlSchema);