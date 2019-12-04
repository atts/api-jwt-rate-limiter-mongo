const mongoose = require("mongoose");
const mongoURI = process.env.MONGODB_URI;
const connectOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};
//Connect to MongoDB 
mongoose.Promise = global.Promise;
mongoose.connect(mongoURI, connectOptions, (err, db) => {
    if (err) console.log(`Error`, err);
    console.log(`Connected to MongoDB`);
});