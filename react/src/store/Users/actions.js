import * as types from "./types"

export function requestLogin(creds) {
	return {
		type: types.LOGIN_REQUEST,
		isFetching: true,
		isAuthenticated: false,
		creds
	}
}

export function receiveLogin(user) {
	return {
		type: types.LOGIN_SUCCESS,
		isFetching: false,
		isAuthenticated: true,
		id_token: user.id_token,
		userDetails:user.user
	}
}

export function loginError(message) {
	return {
		type: types.LOGIN_FAILURE,
		isFetching: false,
		isAuthenticated: false,
		message
	}
}

export function requestLogout() {
	return {
		type: types.LOGOUT_REQUEST,
		isFetching: true,
		isAuthenticated: true
	}
}

export function receiveLogout() {
	return {
		type: types.LOGOUT_SUCCESS,
		isFetching: false,
		isAuthenticated: false
	}
}

export function checkStoredToken() {
	return {
		type: types.TOKEN_CHECK_REQ,
		isFetching: true,
		isAuthenticated: false
	}
}

export function storedCheckComplete(isAuthenticated) {
	return {
		type: types.TOKEN_CHECK_DONE,
		isFetching: false,
		isAuthenticated
	}
}