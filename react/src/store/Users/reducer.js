import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_SUCCESS,
  TOKEN_CHECK_REQ,
  TOKEN_CHECK_DONE
} from "./types"

import initialState from "../../store/initialState"

export default function auth(state = initialState.user, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false,
        creds: action.creds
      })
    case LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: true,
        errorMessage: "",
        level:1,
        creds:null,
        userDetails: action.userDetails
      })
    case LOGIN_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false,
        errorMessage: action.message,
        creds:null
      })
    case LOGOUT_SUCCESS:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false
      })
    case TOKEN_CHECK_REQ:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false
      })
    case TOKEN_CHECK_DONE:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: action.isAuthenticated
      })
    default:
      return state
  }
}
