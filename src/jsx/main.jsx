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

	render () {
		return (
			<main>
                <LoginForm />
			</main>
		)
	}
}
