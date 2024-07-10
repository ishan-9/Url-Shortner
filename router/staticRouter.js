const express = require("express")
const router = express.Router();
const { staticgetAllurls, Usersignup, Userlogin,StatgetAllUrls} = require("../controller/staticRoute")


router.get('/', staticgetAllurls)
router.get('/signup', Usersignup)
router.get('/login', Userlogin)
router.get('/all',StatgetAllUrls)

module.exports = router;

