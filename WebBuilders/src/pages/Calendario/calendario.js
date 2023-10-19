const express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
const path = require('path');


router.use(bodyParser.urlencoded({
    extended: true
}));

router.get('/calendario', (req, res) => {
    res.render(path.join(__dirname + "/Calendario", 'index.ejs'), { names: req.session.names });
});


module.exports = router;