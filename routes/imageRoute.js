const imageController = require('../controllers/imageController')

module.exports = (publicRoute, protectedRoute) => {
    publicRoute.get('/thumbnail', FUNCTIONS.checkParamsGET(['url']), imageController.createThumbnail)
}
