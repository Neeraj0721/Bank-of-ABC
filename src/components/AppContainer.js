import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Layout, Grid, Cell, Icon, Header, HeaderRow, HeaderTabs, Tab, Content, Button, Navigation, Chip, ChipContact } from 'react-mdl';
import { connect } from 'react-redux'
import * as actions from '../actions'
import { Route, Switch} from 'react-router-dom';
import AccountDetails from './pages/AccountDetails'
import RequireAuth from './higherordercomponents/requireauthentication'
import { Suspense } from 'react';
import bank from '../components/pages/UK-central-bank.jpg';

const Login = React.lazy(()=>import('./pages/Login'));
const Accounts = React.lazy(()=>import('./pages/Accounts'));
const FundTransfer = React.lazy(()=>import('./pages/FundTransfers'));


class AppContainer extends Component {

   // contextTypes in react provides access to context using Proptypes from react lib, use this to get access to router
   /*static contextTypes ={
       router: PropTypes.object
   }*/

 renderChip() {
console.log("renderChip");
      if(this.props.loggedIn){
console.log("renderChip is True");
let object = this.props.user;
let data=this.props.user;
console.log("renderChip is True",object);
console.log("renderChip is True a=",data);
if(this.props.user && this.props.user.name)
          {
              return(
              <Chip>
                  <ChipContact className="mdl-color--teal mdl-color-text--white">{this.props.user.name.substring(0,1)}</ChipContact>
                  {this.props.user.name}
              </Chip>
          )
        }
      }else {

          return null;
      }

  }

  render() {
    
    const tabMap = {
        0: {
            URL: '/',
            Title: 'Login',
            tabIndex: 0
        },
        1: {
            URL: '/accounts',
            Title: 'Accounts',
            tabIndex: 1
        },
        2: {
            URL: '/transfer',
            Title: 'Balance Transfer',
            tabIndex: 2
        }
    }

    const urlPath= window.location.pathname;
    let activeTabId;
    if(urlPath){
        const value = Object.values(tabMap).filter((tab) => {
            return tab.URL === urlPath;
        });

        activeTabId =  value[0].tabIndex;
    }else{
        activeTabId = 0;
    }

    return (
        <div>
        <Layout fixedHeader>
            <Header style={{backgroundColor:'royal blue'  }}>
                <HeaderRow style={{padding:'50px'}} title={( 
                  <span>
                    <Icon style={{fontSize: 'small', position: 'static', top: '100px' ,fontFamily:'sans-serif'}}/>
                    <span style={{fontSize: '100px', position: '-webkit-sticky', top: '100px' ,fontFamily:'unset'}}>BANK OF ABC</span>
                  </span>
                )} >

                    {this.renderChip()}

                </HeaderRow>
                <HeaderTabs ripple activeTab={activeTabId} onChange={(tabId) => {
                    if(tabId === 0 && this.props.loggedIn){
                        this.props.logoutUser();
                    }
                    this.props.history.replace(tabMap[tabId].URL);
                }}>
                    <Tab >{this.props.loggedIn? 'Logout': 'Login'}</Tab>
                    <Tab>Accounts</Tab>
                    <Tab>FundTransfer</Tab>
                    <Tab>CARDS</Tab>
                    <Tab>OFFERS</Tab>
                    <Tab>BILLPAYMENTS</Tab>
                    <Tab>LOANS</Tab>
                    <Tab>HELP</Tab>
                    <Tab>CUSTOMER CARE(24*7)</Tab>
                    <Tab>OTHERS</Tab>
                </HeaderTabs>
            </Header>
            <Content style={{background: `url(${ bank }) center/cover`}}>


              <div >
                  <Grid>
                      <Cell col={12} tablet={8} phone={4} >
                    <Switch>
                        <Route exact path="/" component={Login} />                        
                        <Route path="/accounts" component={RequireAuth(Accounts)}/>
                        <Route path="/transfer" component={RequireAuth(FundTransfer)}/>
                    </Switch>
                      </Cell>
                  </Grid>
              </div>

            </Content>
        </Layout>
        </div>
    );
  }
}

function mapStateToProps(state) {
    return {
        loggedIn: state.loggedInDetails.loggedIn,
        user: state.loggedInDetails.user
    }
}


export default connect(mapStateToProps, actions)(AppContainer);
