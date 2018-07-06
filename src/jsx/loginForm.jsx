import React, { Component } from 'react'

export default class LoginForm extends Component {

    state = {
        email: '',
        password: ''
    }

    render () {
        const { email, password } = this.state
        return (
            <form id='loginForm'>
                <InputElement
                    type='text'
                    title='Email'
                    value={email}
                    onChange={text => this.setState({ email: text })}
                />
                <InputElement
                    type='password'
                    title='Password'
                    value={password}
                    onChange={text => this.setState({ password: text })}
                />
                <div className='button button-red button-transparent'>Login</div>
            </form>
        )
    }
}

class InputElement extends Component {

    state = {
        active: false
    }

    _handleOnFocus = () => {
        if (!this.state.active) this.setState({ active: true })
    }

    _handleOnBlur = () => {
        if (this.props.value.length > 0) return
        this.setState({ active: false })
    }

    render () {
        const { title, type, value, onChange } = this.props
        return (
            <div className='inputContainer'>
                <label className={this.state.active ? 'active': ''}>{title}</label>
                <input
                    type={type}
                    value={value}
                    onFocus={this._handleOnFocus}
                    onBlur={this._handleOnBlur}
                    onChange={e => onChange(e.target.value)}
                />
            </div>
        )
    }
}
