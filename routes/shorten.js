require('../models/url');
const mongoose = require("mongoose");
const validUrl = require("valid-url");
const url = mongoose.model("url");
const shortid = require("shortid");
const errorUrl = 'http://localhost/error';
const analytics = require("../utils/analytics");
const jwt = require('jsonwebtoken');

var validateToken = function(token) {
    let result;
    const options = {
        expiresIn: '2d',
        issuer: 'https://dummysite.com'
    };
    try {
        // verifying if the token is valid
        result = jwt.verify(token, process.env.JWT_SECRET, options);
        if (result) {
            return true;
        } else {
            return false;
        }

    } catch (err) {
        //throw new Error(err);
        return false;
    }

}

module.exports = app => {
    app.get("https://api-url-shortener-service.herokuapp.com/:code", async(req, res) => {
        const urlCode = req.params.code;
        const item = await url.findOne({ urlCode: urlCode });
        if (item) {
            console.log(item._id);
            analytics.addAnalytics(item._id)
            return res.redirect(item.originalUrl); // in case only the API needs to utilized we can direct redirect from API itself.
        } else {
            return res.send(errorUrl);
        }
    });

    app.get("/api/item/:code", async(req, res) => {
        const token = req.headers.bearer;
        if (token && validateToken(token)) {
            const urlCode = req.params.code;
            const item = await url.findOne({ urlCode: urlCode });
            if (item) {
                console.log(item._id);
                analytics.addAnalytics(item._id)
                    //return res.redirect(item.originalUrl); // in case only the API needs to utilized we can direct redirect from API itself.
                return res.status(200).json(item.originalUrl);
            } else {
                return res.send(errorUrl);
            }
        } else {
            let result = {
                error: 'Authentication error. Token missing or invalid.',
                status: 401
            };
            res.status(401).send(result);
        }

    });

    app.post("/api/item", async(req, res) => {
        const token = req.headers.bearer;
        if (token && validateToken(token)) {
            const { originalUrl, shortBaseUrl, userId } = req.body;
            if (validUrl.isUri(shortBaseUrl)) {} else {
                return res
                    .status(401)
                    .json(
                        "Invalid Base Url"
                    );
            }
            const urlCode = shortid.generate();
            const expirationDate = new Date();
            const numOfDays = 2;
            expirationDate.setDate(expirationDate.getDate() + numOfDays);
            if (validUrl.isUri(originalUrl)) {
                try {
                    const item = await url.findOne({ originalUrl: originalUrl });
                    if (item) {
                        res.status(200).json(item);
                    } else {
                        shortUrl = shortBaseUrl + "/" + urlCode;
                        const item = new url({
                            originalUrl,
                            shortUrl,
                            urlCode,
                            expirationDate,
                            userId
                        });
                        await item.save();
                        res.status(200).json(item);
                    }
                } catch (err) {
                    res.status(401).json("Invalid User Id");
                }
            } else {
                return res
                    .status(500)
                    .json(
                        "Invalid Original Url"
                    );
            }
        } else {
            let result = {
                error: 'Authentication error. Token missing or invalid.',
                status: 401
            };
            res.status(401).send(result);
        }

    });
}