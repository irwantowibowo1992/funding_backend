const UserService = require('../services/user.service');
const SuccessResult = require('../utils/response.util');

class UserController {
    async addNewUser(req, res) {
        const body = req.body;

        const data = await UserService.addNewUser(body);
        SuccessResult.make(res).sendMessageDataWithHumps(data);
    }
}

module.exports = new UserController()