const express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
const path = require('path');
const checkCargo = require('../Cargo/cargo');


router.use(bodyParser.urlencoded({
    extended: true
}));


router.get('/', (req, res) => {
    res.render(path.join(__dirname, 'index.ejs'), { names: req.session.names });
});
router.get('/escolher',checkCargo("A"), (req, res) => {
    res.render(path.join(__dirname + "/Escolher", 'index.ejs'), { names: req.session.names });
});


module.exports = router;