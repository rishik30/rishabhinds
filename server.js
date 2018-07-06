const express = require('express')
const path = require('path')
var cors = require('cors')
const webpack = require('webpack')
const webpackDevMiddleware  = require('webpack-dev-middleware')
const webpackHotMiddleware  = require('webpack-hot-middleware')
const bodyParser = require('body-parser')

//Modules from Local files
const config = require('./webpack.config.js')
require('./src/db/db-connect.js')
// ----000000-----000000-----00000-----00000----- //

const port = process.env.PORT || 8080
const app = express()
const compiler = webpack(config)

app.use(cors())
//Parsing incoming requests
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(express.static(path.resolve(__dirname)))
app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
    stats: {colors: true},
    noInfo: true
}));
app.use(webpackHotMiddleware(compiler, {
    log: console.log
}))

// ROUTES
require('./router/routes.js')(app)

app.listen(port, () => {
    console.log(`Listening on port: ${port}`)
})
