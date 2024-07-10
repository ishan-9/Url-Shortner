const express = require("express")
const router = express.Router();
const { createShortid, visitUrl, getanalytics,getAllUrls,deleteUrl} = require("../controller/url")
const {OnlyAdmin } = require('../middleware/auth');
const { defineAbility } = require("../middleware/defineAbility.middleware");
const { authorize } = require("../middleware/authorize.middleware");

router.get('/:shortId', visitUrl)
router.get('/analytics/:shortId', getanalytics)
router.post('/create', createShortid)
router.get('/',defineAbility(),authorize('manage','all'), getAllUrls)
router.post('/delete/:shortId',defineAbility(),authorize('manage','all') , deleteUrl)

module.exports = router;
