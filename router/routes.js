const express = require('express')
const path = require('path')
const bcrypt = require('bcryptjs')
const { User } = require('../src/db/models/user.js')

module.exports = function (app) {
    const router = express.Router()

    //create a user
    router.post('/user', (req, res) => {
        console.log('REQ', req.body)
        var user = new User(req.body)
        user.save()
            .then((obj) => {
                console.log('USER', obj)
                return user.generateAuthToken()
            })
            .then((token) => {
                res.status(200).header('x-auth', token).send(user)
            })
            .catch(e=>{
                console.log('ERROR', e)
                res.send(e)
            })
    })

    //handle user login
    router.post('/user/login', (req, res) => {
    var user = new User(req.body)
    console.log('USER LOGIN', user)
    User.findOne({email: user.email})
        .then((doc) => {
            console.log('DOC', doc)
            // if(!doc) return new Promise.reject('User not found!!')
            // if(!doc) return res.send('User not found!!')
            return bcrypt.compare(user.password, doc.password)
        })
        .then((response) => {
            console.log('RESPONSE', response)
            if(response ===  true) {
                return user.generateAuthToken().then((token) => {
                    res.status(200).header('x-auth', token).send(user)
                })
            }
            else res.send('User not found!!')
        })
        .catch(e => {
            console.log('ERROR', e)
            res.send(e)
        })
})

    //all page requests
    router.get('/*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'index.html'))
    })

    app.use('/', router)
}
