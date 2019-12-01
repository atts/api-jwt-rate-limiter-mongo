const RateLimit = require('express-rate-limit');
const RedisStore = require('rate-limit-redis');

const limiter = new RateLimit({
    store: new RedisStore({
        expiry : 60
    }),
    max: 100, // limit each IP to 100 requests. post limit error - "Too many requests, please try again later."
});

module.exports =  limiter 