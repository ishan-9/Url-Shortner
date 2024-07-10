const express = require("express")
const router = express.Router();
const { Usersignup, UserlogIn ,LogOut} = require("../controller/user")

router.post('/', Usersignup)
router.post('/login', UserlogIn)
router.post('/logout',LogOut)

module.exports = router;