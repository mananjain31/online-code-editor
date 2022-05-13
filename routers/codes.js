const router = require("express").Router();
const { run, abort } = require('../controllers/codes');


// router.route('/abort/:codeId').get(abort);
router.route('/run').post(run);

module.exports = router;