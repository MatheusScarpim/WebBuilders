const express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
const path = require('path');


router.use(bodyParser.urlencoded({
    extended: true
}));


router.get('/', (req, res) => {
    res.render(path.join(__dirname, 'index.ejs'));
});


module.exports = router;