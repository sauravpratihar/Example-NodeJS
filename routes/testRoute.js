module.exports = (app) => {
    const testController = require('../controllers/testController')
    app.get('/', testController.test)
}