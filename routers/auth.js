const router = require("express").Router();
const { signup, signin, logout } = require('../controllers/auth');


router.route('/signin').post(signin);
router.route('/signup').post(signup);
router.route('/logout').get(logout);

module.exports = router;