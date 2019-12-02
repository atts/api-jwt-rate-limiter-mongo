require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
var cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

//  apply to all requests
const limiter = require('./utils/rate-limiter');
app.use(limiter);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cors());

require("./utils/database");
require("./utils/analytics");
require("./routes/shorten")(app);
require("./routes/user")(app);


app.listen(PORT, () => {
    console.log(`Server started on port`, PORT);
});