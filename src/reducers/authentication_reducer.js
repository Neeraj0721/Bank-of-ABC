import { LOGIN_SUCCESS } from '../actions/types'
import { LOGIN_ERROR } from '../actions/types'
import { FETCH_USER_SUCCESS } from '../actions/types'
import { FETCH_USER_ERROR } from '../actions/types'
import { LOGOUT } from '../actions/types'


const initialState = {
    id: null,
    error: {
        message: null
    },
    loggedIn: false,
    user: null
}




export default function(state = initialState, action) {
console.log("switch");
    switch(action.type){
        case LOGIN_SUCCESS:
            console.log("sucess");
            console.log("action.payload",action.payload);
            return {...state, token: action.payload, loggedIn: true}
        case LOGIN_ERROR:
            console.log("login error");
            return {...state, error: action.payload}
        case FETCH_USER_SUCCESS:
            console.log("u success");
            return {...state, user: action.payload}
        case FETCH_USER_ERROR:
            console.log("user error");
            return {...state, error: action.payload}
        case LOGOUT:
            console.log("logout");
            return {...state, token: null, loggedIn: false, user: null}
        default:
            console.log("default");
            return state
    }

    return state;
}