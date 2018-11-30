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
		userDetails: user
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

export function requestRegister(creds) {
	return {
		type: types.REGISTER_REQUEST,
		isFetching: true,
		isAuthenticated: false,
		creds
	}
}

export function receiveRegister(user) {
	return {
		type: types.REGISTER_SUCCESS,
		isFetching: false,
		isAuthenticated: true,
		id_token: user.id_token
	}
}

export function registerError(message) {
	return {
		type: types.REGISTER_FAILURE,
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