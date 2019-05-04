const FUNCTIONS = require('../functions');
const userController = require('../controllers/userController')

module.exports = (publicRoute, protectedRoute) => {
    protectedRoute.get('/get_users', userController.getUsers)
    publicRoute.post('/add_user', FUNCTIONS.checkParamsPOST(['first_name', 'last_name', 'email', 'password']), userController.addUser)
    publicRoute.patch('/update_user', FUNCTIONS.checkParamsPOST(['user_id']), userController.updateUser)
    publicRoute.post('/delete_user', FUNCTIONS.checkParamsPOST(['user_id']), userController.deleteUsers)
    publicRoute.post('/login_user', FUNCTIONS.checkParamsPOST(['email', 'password']), userController.loginUser)

    
}