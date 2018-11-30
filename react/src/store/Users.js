import * as actions from "./Users/actions"

const apiUseUrl = `http://128.187.106.130:3030/taw-hapi/api/1.0/user`

export function loginUser(creds) {
	let config = {
		method: "POST",
		headers: { "Content-Type": "application/x-www-form-urlencoded" },
		body: `username=${creds.username}&password=${creds.password}`
	}

	return dispatch => {
		// We dispatch requestLogin to kickoff the call to the API
		dispatch(actions.requestLogin(creds))

		return fetch(`${apiUseUrl}/session/create`, config)
			.then(response => {
				return response.json().then(user => ({ user, response }))
			})
			.then(({ user, response }) => {
				if (!response.ok) {
					// If there was a problem, we want to
					// dispatch the error condition
					dispatch(actions.loginError(user.message))
					return Promise.reject(user)
				} else {
					// If login was successful, set the token in local storage
					localStorage.setItem("id_token", user.id_token)
					// localStorage.setItem("access_token", user.access_token)
					// Dispatch the success action
					dispatch(actions.receiveLogin(user))
				}
			})
			.catch(err => console.log("Error: ", err))
	}
}

export function registerUser(creds) {
	let config = {
		method: "POST",
		headers: { "Content-Type": "application/x-www-form-urlencoded" },
		body: `username=${creds.username}&password=${creds.password}
		&email=${creds.email}&about=${creds.about}
		&lname=${creds.lasname}&fname=${creds.firstname}`
	}
	return dispatch => {
		// We dispatch requestLogin to kickoff the call to the API
		dispatch(actions.requestRegister(creds))

		return fetch(`${apiUseUrl}/register`, config)
			.then(response => {
				return response.json().then(user => ({ user, response }))
			})
			.then(({ user, response }) => {
				if (!response.ok) {
					// If there was a problem, we want to
					// dispatch the error condition
					dispatch(actions.registerError(user.message))
					return Promise.reject(user)
				} else {
					// If login was successful, set the token in local storage
					localStorage.setItem("id_token", user.id_token)
					// localStorage.setItem("access_token", user.access_token)
					// Dispatch the success action
					dispatch(actions.receiveRegister(user))
				}
			})
			.catch(err => console.log("Error: ", err))
	}
}

export function logoutUser() {
	return dispatch => {
		dispatch(actions.requestLogout())
		localStorage.removeItem("id_token")
		// localStorage.removeItem("access_token")
		dispatch(actions.receiveLogout())
	}
}

export function checkUserSession() {
	let token = localStorage.getItem("id_token")
	let config = {
		method: "POST",
		headers: { "Content-Type": "application/x-www-form-urlencoded" },
		body: `token=${token}`
	}

	return dispatch => {
		dispatch(actions.checkStoredToken())
		if (!token || token === "") {
			return dispatch(actions.storedCheckComplete(false))
		}

		return fetch(`${apiUseUrl}/validate`, config)
			.then(response => {
				return response.json().then(user => ({ user, response }))
			})
			.then(({ user, response }) => {
				if (user.user) {
					localStorage.setItem("id_token", user.token)
					dispatch(actions.storedCheckComplete(true))
				} else {
					localStorage.removeItem("id_token")
					dispatch(actions.storedCheckComplete(false))
				}
			})
			.catch(err => console.log("Error: ", err))
	}
}