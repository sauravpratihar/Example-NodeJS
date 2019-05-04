const imageController = require('../controllers/imageController')

module.exports = (publicRoute, protectedRoute) => {
    publicRoute.get('/thumbnail', imageController.createThumbnail)
}