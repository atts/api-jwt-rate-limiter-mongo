const mongoose = require("mongoose");
const { Schema } = mongoose;
const analyticsUrlSchema = new Schema({
  urlId: String,
  hitTime: Date
});
mongoose.model("analyticsUrl", analyticsUrlSchema);