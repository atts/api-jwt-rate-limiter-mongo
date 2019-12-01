const mongoose = require("mongoose");
const mongoURI = process.env.MONGO_LOCAL_CONN_URL;
const connectOptions = { 
  keepAlive: true, 
  //reconnectTries: Number.MAX_VALUE,
  useUnifiedTopology: true ,
  useNewUrlParser: true
}; 
//Connect to MongoDB 
mongoose.Promise = global.Promise; 
mongoose.connect(mongoURI, connectOptions, (err, db) => 
{ 
  if (err) console.log(`Error`, err); 
  console.log(`Connected to MongoDB`); 
}); 