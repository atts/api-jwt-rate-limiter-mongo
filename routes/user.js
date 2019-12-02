require('../models/user');
const mongoose = require("mongoose");
const user = mongoose.model("user");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = app => {
    app.get("/api/user/:email/:password", async(req, res) => {
        const email = req.params.email;
        const password = req.params.password;
        const item = await user.findOne({ email: email });
        if (item) {
            // comparing password with encrypted password in DB
            const isAuthenticated = bcrypt.compareSync(password, item.password);
            if (isAuthenticated) {
                const payload = { user: user.name };
                const options = { expiresIn: '2d', issuer: 'https://dummysite.com' };
                const secret = process.env.JWT_SECRET;

                //generating JWT token
                const token = jwt.sign(payload, secret, options);
                console.log('TOKEN ' + token);
                let result = {};
                result.token = token;
                result.status = 200;
                result.user = { email: item.email, name: item.name };
                res.status(200).json(result);
            } else {
                res.status(401).json("password seems wrong");
            }

        } else {
            res.status(401).json("User not found");
        }
    });

    app.post("/api/user", async(req, res) => {
        const name = req.body.name;
        const email = req.body.email;
        //encrypting password before storing in DB
        req.body.password = bcrypt.hashSync(req.body.password, 10);
        const password = req.body.password;
        const createdOn = new Date();
        try {
            const item = await user.findOne({ email: email });
            if (item) {
                console.log("inside if");
                res.status(200).json("This email seems already registered. Please use different email or login using the same");
            } else {
                console.log("inside else");
                const item = new user({
                    name,
                    email,
                    password,
                    createdOn
                });
                await item.save();
                console.log(item);
                res.status(200).json("User is successfully registered");
            }
        } catch (err) {
            res.status(401).json("Some error occured");
        }

    });
};