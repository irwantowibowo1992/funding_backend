const UserModel = require('../models/user.model');
const UserRoleModel = require('../models/userRole.model')

class UserRepository {
    async addNewUser(data) {
        let response;
        await UserModel.transaction(async (trx) => {
            const dataUser = await UserModel.query(trx).insertAndFetch({
                name: data.name,
                email: data.email,
                username: data.username,
                password: data.password,
                user_status: 'ACTIVE'
            });
    
            const dataUserRole = await UserRoleModel.query(trx).insert({
                user_id: dataUser.id,
                role: data.role,
            });

            response = {
                ...dataUser,
                ...dataUserRole
            }
        })
        

        return response;
    }
}

module.exports = new UserRepository();