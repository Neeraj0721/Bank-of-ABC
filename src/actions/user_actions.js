import { LOGIN_SUCCESS } from './types'
import { LOGIN_ERROR } from './types'
import { FETCH_USER_SUCCESS } from './types'
import { FETCH_USER_ERROR } from './types'
import { LOGOUT } from './types'
import { URL } from './types'
import FetchAPI,{FetchLogin, FetchUser} from './fetchapi'
import { Redirect } from 'react-router'
import axios from 'axios'

function loginResolve(token) {
    console.log("loginResolve");
    console.log(token,"id");
    return {
        type: LOGIN_SUCCESS,
        payload: token
    }
}

function loginError(error) {
    console.log("loginError");
    console.log(error,"id");
    return {
        type: LOGIN_ERROR,
        payload: error
    }
}

function populateUser(user) {
    console.log("populateUser");
    console.log("User",user);
    console.log("User Name",user.name);
    return {
        type: FETCH_USER_SUCCESS,
        payload: user
    }
}

function fetchUserError(error){
    return {
        type: FETCH_USER_ERROR,
        payload: error
    }
}

function logOutUser(response){
    return {
        type: LOGOUT,
        payload: response
    }
}

// Action to authenticate user, returns an action with type AUTHENTICATE_USER and userToken Payload
export function authenticateUser(email,pass) {
    
    console.log("enter");
    //return (dispatch) => {


        return (dispatch) => {

            FetchLogin(email,pass).then((data) => {
                console.log("enter",data);
                if(data){
                dispatch(loginResolve(data));
                console.log("success");
                }
                else{
                    dispatch(loginError({message: 'Username or Password Incorrect'}));
                }
            }).catch((error) => {
                dispatch(loginError(error))
            })
        }
        //const data=await FetchLogin(email,pass);
        /*let userTokenPromise = fetch(`${ROOT_ROOT_URL}/Login`, {
            method: 'GET'
        });
        userTokenPromise*/
        
        //console.log(data);
        
        
        
     //fetch("http://localhost:8000/Login")
        //.then(response =>response.json())
        //.then(result =>
              /*this.props.data.map(user=>{
                if(user.email===email && user.password===pass)
                {
                  //this.state.redirect=true;
                  console.log(user);
                  loginResolve(user.id);
                  console.log(loginResolve(user.id));
                  //console.log(this.state.redirect);
                  //dispatch(loginResolve(user.id)));
                }
                
                /*if(this.state.redirect){
                  console.log("abc");
                   this.props.history.push("/dashboard");
          }*/
              
            //)
        
        /*.then((response) => {
            console.log(response);
            return response.json();
        })
        .then((data) => {
            dispatch(loginResolve(data.id))
            console.log(data);
        })*///.catch((error) => {
            //console.log(error.message);
            //dispatch(loginError(error))
        //})
    }
//}

// get user details once logged in
export function getUser() {
    /*console.log("GetUser Called 1 time");
    FetchAPI(2).then((data) => {
            console.log("populateUser(data)",data)
            populateUser(data)
        console.log("populateUser Done",data);
    }).catch(error => {
            fetchUserError(error);
        console.log(error);
    })

        console.log("GetUser Called 2  time");*/
    return (dispatch, getState) => {
        const token = getState().loggedInDetails.token;
        //const token=1;
        //console.log("GetUser Token",token);
        if (token){
            //console.log("fetching(data)");
            FetchUser(token).then((data) => {
                dispatch(
                    //console.log("populateUser(data)",data)
                    populateUser(data)
                );
                console.log("populateUser(data)",data);
                //dconsole.log("populateUser Done",data);
            }).catch(error => {
                dispatch (
                    fetchUserError(error)
                );
                console.log(error);
            })
        } else {
            dispatch(
                loginError({message: 'Please log in'})
                );
        }
    }
}

export function CreateUser(name,email,pass) {
    let msg=null;
    try{
    
    const response = axios.post(`${URL}/neeraj/login`,{
        username: email,
      password: pass,
      name: name,
      admin: true
    });
    console.log("2",response);
    const data = response.data;
    console.log("3",data);

    msg ="Account Created Successfully!! Please go to Login Page";
    }
        catch(error) {
            console.log("error");
                msg ="Some Error : "+ error;
            }

            return msg;
}



export function logoutUser() {

    return (dispatch, getState) => {
        const token = getState().loggedInDetails.token

        if (token){

                dispatch (logOutUser(token));
        } else {
            dispatch(loginError({message: 'login failed'}));
        }
    }
}