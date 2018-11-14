import * as actions from './Warehouse/actions'
export function loadApps() {
	return dispatch =>
		fetch(`${process.env.REACT_APP_API_URL}/taw-hapi/api/1.0/app/list`)
			.then(response => response.json())
			.then(json => dispatch(actions.loadWHSuccess(json)))
			.catch(error => console.log(error))
}
