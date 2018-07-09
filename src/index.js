import React, {Component}                   from 'react'
import ReactDOM                             from 'react-dom'
import {BrowserRouter,
        Route,
        Redirect,
        Switch}                             from 'react-router-dom'
import {createStore, applyMiddleware}       from 'redux'
import {Provider}                           from 'react-redux'
import { routerMiddleware }                 from 'react-router-redux'
import thunk                                from 'redux-thunk'

import reducers                             from './redux/rootReducer.js'
import Main                                 from './jsx/main.jsx'
import DashBoard                            from './jsx/dashboard.jsx'

import './style/index.scss'

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore)

ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())}>
        <BrowserRouter>
            <Switch>
                <Route path="/dashboard" render={renderPrivateRoute} />
                <Route exact path="/" component={Main} />
            </Switch>
        </BrowserRouter>
    </Provider>
    , document.getElementById("movieflix-app")
)

function renderPrivateRoute (props) {
    const route = localStorage.accessToken ? <DashBoard /> : <Redirect to='/' />
    return route
}
