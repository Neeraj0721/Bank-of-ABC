import { URL } from './types'
import axios from 'axios'
import {loginResolve} from './user_actions'
import { string } from 'prop-types';

//import loginResolve from './user_actions'
async function fetchAPI(token){
 let a=null;
  try{  
        console.log("-1--");  
        const response=await window.fetch(`${URL}/verma/account/${token}`,{
            method: 'GET'
        });
        console.log("-2--",response);
        const account= await response.json();
        console.log("-3--");
        console.log("accounts---",account);
        console.log(account.type);
        a=account;
        console.log("a in accounts",a);
  }
  catch(error){
    console.log(error);
  }
  return a;
}

async function FetchUser(token){
  let a=null;
   try{  
         console.log("-1--");  
         const response=await window.fetch(`${URL}neeraj/login/${token}`,{
             method: 'GET'
         });
         console.log("-2--",response);
         const user= await response.json();
         console.log("-3--");
         console.log("accounts---",user);
         console.log(user);
         a=user;
         console.log("a in accounts",a);
   }
   catch(error){
     console.log(error);
   }
   return a;
 }

async function FetchLogin(username,pass) {
  let a=null;
  try {
      // fetch data from a ROOT_URL endpoint
      console.log("1");
      const response = await window.fetch(`${URL}/neeraj/login`);
      console.log("2",response);
      const data = await response.json();
      console.log("3",data);
  console.log("data fetched");
  data.map(user=>{
    if(user.username===username && user.password===pass)
    {
        console.log("continue");
      //this.state.redirect=true;
      console.log(user);
      //loginResolve(user.id);
      console.log(user.id);
      
        a=user.id;
        console.log("return");
        console.log("a=",a);
        
      //console.log(this.state.redirect);
      //dispatch(loginResolve(user.id)));
    }
    else{
        console.log("terminate");
        //return null;
    }

})
    } catch (error) {
      //alert(error); // catches both errors
      console.log(error);
    }
    return a;
  }

export default fetchAPI;
export {FetchLogin};
export {FetchUser};