const router = require('express-promise-router')();
const UserController = require('../controllers/user.controller');
const Authorization = require('../middlewares/authorization.middleware');

router.post(
    '/api/user',
    Authorization.auth(['ADMIN']),
    UserController.addNewUser
)

module.exports = router;