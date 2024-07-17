const { authentication, restrictTo } = require('../controllers/authController')
const { getUsers } = require('../controllers/usersController')

const router = require('express').Router()



router.route('/').get(authentication, restrictTo('0'), getUsers)


module.exports = router;