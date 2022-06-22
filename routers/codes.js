const router = require("express").Router();
const { run, stop, generateCodeId } = require('../controllers/codes');
const withAuth = require("../middlewares/withAuth");


router.route('/codeId').get(generateCodeId);
router.route('/run').post(run);
router.route('/stop/:codeId').delete(stop);
router.use(withAuth);
// router.route('/save/:codeId').delete(save);


module.exports = router;