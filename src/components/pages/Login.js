import React, { Component, PropTypes, useState } from 'react';
import { Card, CardText, CardTitle, CardActions, Button } from 'react-mdl';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../actions'
import renderField from '../common/renderformfields'
import {Redirect} from 'react-router-dom'
import bank from './UK-central-bank.jpg';
import validate from '../../utils'



class Login extends Component {
  state={
    username:"",
    pass:""
  }

  componentWillUpdate(nextProps){
    console.log("CompUpdate", nextProps);
      if(nextProps.loggedIn){
        console.log("Logged IN");
          if(nextProps.user){
            console.log("Accounts");
            console.log("nextProps.user.admin",nextProps.user.admin);
            
              this.props.history.push('/accounts');
          }
          else{
            this.props.getUser();
              console.log("get user");
          }
        }
          if(nextProps.error)
          {
            if(nextProps.error){
              this.setState({error: nextProps.error.message})
          }
        }
      }

  

    HandleSubmit=(e) => {
      e.preventDefault();
      console.log("Before");
      this.props.authenticateUser(this.state.username,this.state.pass);
      console.log("Handlesubmit");
    }



  render() {
    
    
    
    return (
      
      <div><br/><br/><br/>
        <Card shadow={1} style={{width: '100%', maxWidth: '400px', margin: 'auto'}}>
          <CardTitle expand style={{ minHeight: '150px', background: `url(${ bank }) center / cover` }}>
          
          </CardTitle>
            <form onSubmit={this.HandleSubmit}>
            <br/><br/>
                <CardText>
                <div>
                    <Field name="username" component={renderField} type="text" label="Email or Username" onChange={event => {this.state.username=event.target.value}}/>
                </div>
                <div>
                    <Field name="password" component={renderField} type="password" label="Password" onChange={event => {this.state.pass=event.target.value}}/>
                </div>
                </CardText>
                <Button colored style={{fontSize:"20px",width: '40%', maxWidth: '400px', margin: 'auto'}} type="submit" >Login</Button>
            </form>

            <Button colored style={{width: '100%',backgroundColor:'black',color:'white', maxWidth: '400px', margin: 'auto'}}type="submit" onClick={()=>this.props.history.push("/register")}>Create an account</Button>
        </Card>
      </div>
    );
  }
}

function mapStateToProps(state) {

    return {
        loggedIn: state.loggedInDetails.loggedIn,
        error: state.loggedInDetails.error,
        user: state.loggedInDetails.user
    }
}

export default connect(mapStateToProps, actions)(reduxForm({
    form: 'Login',
    validate
})(Login));
