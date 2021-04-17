import React from 'react';
import { connect } from 'react-redux';
import { Form } from 'react-bootstrap';
import { validateFields } from '../common/common';
import { Link } from 'react-router-dom';
import { Card, CardText, CardTitle, CardActions, Button, Header, Layout, HeaderRow, Content, Grid, Cell } from 'react-mdl';
import bank from './UK-central-bank.jpg';
import { Field, reduxForm } from 'redux-form';
import renderField from '../common/renderformfields'
import validate from '../../utils'
import * as actions from '../../actions'

class Register extends React.Component {
  state = {
    full_name: '',
    email: '',
    password: '',
    cpassword: '',
    successMsg: '',
    errorMsg: '',
    isSubmitted: false
  };

  registerUser = (event) => {
    event.preventDefault();
    const { full_name, email, password, cpassword } = this.state;

    const fieldsToValidate = [
      { full_name },
      { email },
      { password },
      { cpassword }
    ];
console.log(this.full_name);
  
    if (full_name===''|| email==='' || password==='' || cpassword==='') {
      this.setState({
        errorMsg: {
          signup_error: 'Please fill all the fields.'
        }
      });
    } else {
      if (password !== cpassword) {
        this.setState({
          errorMsg: {
            signup_error: 'passwords does not match.'
          }
        });
      } else {
        const msg=actions.CreateUser(full_name,email,password);
        this.setState({ isSubmitted: true, successMsg: msg, errorMsg: '' });
      }
    }
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;
    console.log(name);
    console.log(value);
    this.setState({
      [name]: value
    });
  };

  render() {
    const { errorMsg, successMsg, isSubmitted } = this.state;
    return (
      <div>
            <Layout fixedHeader>
                <Header style={{backgroundColor:'orange', margin:'auto'}}>
                      <div style={{margin:'auto', width:'20%', fontWeight:'bold', fontSize:'20px'}}>
                      BANK OF ABC
                      </div>
                    </Header>
                    <Header style={{backgroundColor:'blue'}}>

                      <div style={{margin:'auto', width:'20%', fontWeight:'bold', fontSize:'20px'}}>
                        <span style={{ color:'white', fontWeight:'bold'}}>Register as Admin</span>
                      </div>
    
                        
                    </Header>

                <Content>


              <div >
                  <Grid>
                      <Cell col={12} tablet={8} phone={4} >

                      
        <Card shadow={1} style={{width: '100%', maxWidth: '400px', margin: 'auto'}}>
          <CardTitle expand style={{ minHeight: '150px', background: `url(${ bank }) center / cover` }}>
          
          </CardTitle>
            <form onSubmit={this.registerUser}>
            <br/><br/>
            {errorMsg && errorMsg.signup_error ? (
              <div style={{textAlign:'center', color:'red', border:'1px grey', borderRadius:'10px', backgroundColor: 'lightgrey', padding:'10px', fontWeight:'bold'}}>
                {errorMsg.signup_error}
              </div>
            ) : (
              isSubmitted && (
                <div style={{textAlign:'center',color:'green', border:'1px grey', borderRadius:'10px', backgroundColor: 'lightgrey', padding:'20px', fontWeight:'bold'}}>{successMsg}</div>
              )
            )}
                <CardText>
                <div>
                    <Field name="full_name" component={renderField} type="text" label="Enter Full Name" onChange={this.handleInputChange}/>
                </div>
                <div>
                    <Field name="email" component={renderField} type="email" label="Enter Email" onChange={this.handleInputChange}/>
                </div>
                <div>
                    <Field name="password" component={renderField} type="password" label="Enter Password" onChange={this.handleInputChange}/>
                </div>
                <div>
                    <Field name="cpassword" component={renderField} type="password" label="Enter Confirm Password" onChange={this.handleInputChange}/>
                </div>
                </CardText>
                <Button colored style={{fontSize:"20px",width: '40%', maxWidth: '400px', margin: 'auto'}} type="submit" >Sign Up</Button>&nbsp;&nbsp;&nbsp;&nbsp;
                <Button colored style={{fontSize:"10px", fontFamily:'sans-serif', fontWeight:'bold', margin: 'auto', color:'green'}} type="submit" onClick={()=>this.props.history.push("/")}>Already Have Account ? Sign In </Button>
            </form>
        </Card>

                      </Cell>
                  </Grid>
              </div>

            </Content>

                
            </Layout>
            </div>
    );


  }
}

export default reduxForm({
  form: 'editForm',
  validate
})(Register);