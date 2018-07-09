import axios            from 'axios'
import { createAction } from 'redux-actions'
import { push }         from 'react-router-redux'

// const HANDLE_LOGIN_USER = 'HANDLE_LOGIN_USER'
// const handleLoginUser = createAction(HANDLE_LOGIN_USER)

export function handleLoginUser(data) {
    console.log('DATA', data)
    return function(dispatch) {
        axios({
            url: 'http://localhost:8080/user/login',
            method: 'POST',
            data
        })
        .then(response => {
            console.log('RES', response)
            const { headers, data } = response
            const token = headers['x-auth']
            localStorage.accessToken = token
            // dispatch(push('/dashboard'))
            window.location = 'http://localhost:8080/dashboard'
        })
        .catch(e => console.log('ERR', e))
    }
}

export const actions = {
	handleLoginUser
}
