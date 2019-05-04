const imageController = require('../controllers/imageController')
const FUNCTIONS = require('../functions');

module.exports = (publicRoute, protectedRoute) => {
    publicRoute.get('/thumbnail', FUNCTIONS.checkParamsGET(['url']), imageController.createThumbnail)
}
