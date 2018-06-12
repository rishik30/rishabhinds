const express = require('express')
const path = require('path')
var cors = require('cors')
const webpack = require('webpack')
const webpackDevMiddleware  = require('webpack-dev-middleware')
const webpackHotMiddleware  = require('webpack-hot-middleware')

//Modules from Local files
const config = require('./webpack.config.js')
// ----000000-----000000-----00000-----00000----- //

const port = process.env.PORT || 8080
const app = express()
const compiler = webpack(config)


app.use(express.static(path.resolve(__dirname)))
app.use(cors())
app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
    stats: {colors: true},
    noInfo: true
}));
app.use(webpackHotMiddleware(compiler, {
    log: console.log
}))

app.get('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'index.html'))
})

app.listen(port, () => {
    console.log(`Listening on port: ${port}`)
})
