require('../models/analytics');
const mongoose = require("mongoose");
const analyticsUrl = mongoose.model("analyticsUrl");

// adding the api hit details
async function addAnalytics(id) {
    try {
        const record = new analyticsUrl({
            urlId: id,
            hitTime: new Date()
        });
        await record.save();
        console.log(record);
    }
    catch (err) {
        console.log("Failed To Update Analytics");
    }
}

module.exports = { addAnalytics }
