const router = require("express").Router();
const { run, abort } = require('../controllers/codes');
const withAuth = require("../middlewares/withAuth");


// router.route('/abort/:codeId').get(abort);
router.route('/run').post(run);
router.use(withAuth);

module.exports = router;