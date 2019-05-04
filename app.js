const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const path = require('path')
const router = require('./routes')
const config = require('./config')
const FUNCTIONS = require('./functions');
require("dotenv").config();
const fileUpload = require('express-fileupload');

const app = express()
const publicRoute = express.Router()
const protectedRoute = express.Router();
app.use(fileUpload());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(morgan('dev'))
app.use(cors())

app.use('/public', publicRoute)
app.use('/private', protectedRoute)

protectedRoute.use(FUNCTIONS.protectedRouteConf)

app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
app.use('/static', express.static(path.join(__dirname, 'static')))

mongoose.Promise = require('bluebird')
mongoose.connect(config.database, {useNewUrlParser: true})
  .catch(err => console.error(err))

app.listen(config.port, '0.0.0.0', () => {
    console.log('Your server is running on ' + config.port)
})

router(publicRoute, protectedRoute)
