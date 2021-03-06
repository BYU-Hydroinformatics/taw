import React from 'react'
import ReactDOM from 'react-dom'

import { Provider } from 'react-redux'
import { configureStore } from './store'

import { HashRouter, Route, Switch } from 'react-router-dom'

import indexRoutes from './routes/index.jsx'
import { loadApps } from './store/Warehouse'
import { checkUserSession } from './store/Users'

import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/css/animate.min.css'
import './assets/sass/light-bootstrap-dashboard.css?v=1.2.0'
import './assets/css/demo.css'
import './assets/css/pe-icon-7-stroke.css'

const store = configureStore()

store.dispatch(loadApps())
store.dispatch(checkUserSession())

ReactDOM.render(
	<Provider store={store}>
		<HashRouter>
			<Switch>
				{indexRoutes.map((prop, key) => {
					return (
						<Route
							to={prop.path}
							component={prop.component}
							key={key}
						/>
					)
				})}
			</Switch>
		</HashRouter>
	</Provider>,
	document.getElementById('root')
)
