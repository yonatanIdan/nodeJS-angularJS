var express = require("express");
var router = express.Router();
const passport = require('./passport/passport');
const middleware = require('./passport/middleware');
const { fileController } = require('../controlles/fileController');

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

/* POST login user page */
router.post("/login", passport.authenticate("local", { session: false, failureRedirect: "/err" }),
  (req, res, next) => {
    res.json(req.user);
  });
router.get('/err', (req, res)=>{ res.status(401).send('not autorized') });

/* POST write file base64 */
router.post("/writefilebase64", middleware.checkToken, (req, res) => fileController.writeFileBase64(req, res));

module.exports = router;
