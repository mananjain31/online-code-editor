const router = require("express").Router();
const { run, stop, generateCodeId, save, getCodes, getCodeById, deleteCode } = require('../controllers/codes');
const withAuthMiddleware = require("../middlewares/withAuth");


router.route('/codeId').get(generateCodeId);
router.route('/run').post(run);
router.route('/stop/:codeId').delete(stop);
router.use(withAuthMiddleware);
router.route('/save').put(save);
router.route('/').get(getCodes);
router.route('/:id').get(getCodeById).delete(deleteCode)


module.exports = router;