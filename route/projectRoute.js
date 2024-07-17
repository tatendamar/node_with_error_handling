const { createProject, getAllProjects, getProjectById, updateProject, deleteProject } = require('../controllers/projectController');
const { authentication, restrictTo } = require('../controllers/authController');

const router = require('express').Router();


router.route('/').post(authentication,restrictTo('1'), createProject)
router.route('/').get(authentication, getAllProjects)
router.route('/:id').get(authentication, getProjectById)
router.route('/:id').patch(authentication, updateProject)
router.route('/:id').delete(authentication, deleteProject)


module.exports = router;