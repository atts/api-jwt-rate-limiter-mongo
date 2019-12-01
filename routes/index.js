'use strict';
const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
    res.render('connected', { title: 'Express' });
});

module.exports = router;
