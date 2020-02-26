import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { createStore } from 'redux'
import { userInfo } from './components/Redux/reducer'
import { Provider } from 'react-redux'

const store = createStore(userInfo)

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
)
