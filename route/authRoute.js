const router = require('express').Router();

const { signUp, signIn } = require('../controllers/authController');



router.route('/signup').post(signUp)
router.route('/login').post(signIn)



module.exports = router;