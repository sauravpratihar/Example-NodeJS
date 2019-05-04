
module.exports = function (publicRoute, protectedRoute) {
    require('./routes/imageRoute')(publicRoute, protectedRoute)
    require('./routes/userRoute')(publicRoute, protectedRoute)
    // employeeRoute(apiRoutes)
   



    // const upload = multer({ dest: 'uploads/' })
    // const UploadController = require('./controllers/upload')


    // apiRoutes.post('/upload_file', upload.single('file'), UploadController.uploadFile)
  

  }
  