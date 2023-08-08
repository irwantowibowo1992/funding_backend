const UserRepository = require('../repositories/user.repository');
const AuthRepository = require('../repositories/auth.repository');

class UserService {
    async addNewUser(data) {
        const checkUser = await AuthRepository.getUserByEmail(data.email);

        if(checkUser) {
            const error = new Error('Data is exists');
            error.statusCode = 422;
            throw error;
        }

        const response = await UserRepository.addNewUser(data);

        return {
            name: response.name,
            email: response.email,
            userStatus: response.user_status,
            role: response.role
        }
    }
}

module.exports = new UserService();