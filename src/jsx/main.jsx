import React, { Component } from 'react'
// import WebFont from 'webfontloader'

import LoginForm from './loginForm.jsx'

export default class Main extends Component {

    // componentDidMount () {
    //     WebFont.load({
    //         google: {
    //             families: ['Anton', 'Cabin:400,600', 'Lato: 400', 'sans-serif']
    //         }
    //     })
    // }

    onClick = e => {
        e.preventDefault()
        axios({
            url: 'http://localhost:8080/user/login',
            method: 'POST',
            data: {
                email: 'rishabhk3003@gmail.com',
                password: 'password'
            }
        })
        .then(res => console.log('RESPONSE', res))
    }

	render () {
		return (
			<main>
                <LoginForm />
			</main>
		)
	}
}
