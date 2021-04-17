import React, { Component } from 'react';
import { Card, CardTitle, CardText, Icon, List, ListItem, ListItemContent, ListItemAction } from 'react-mdl';
import AccountDetails from './AccountDetails'

import { connect } from 'react-redux'
import * as actions from '../../actions'

const creditColor = 'rgb(76, 175, 80)';
const debitColor = 'rgb(213,0,0)';

class Accounts extends Component {
    

  componentWillMount() {
     this.props.clearActiveAccount();
    console.log("clearActiveAccount Done");
     this.props.fetchAccounts();
    console.log("fetchAccounts Done");
  }

  callBack(){
      console.log("callBack");
      this.props.clearActiveAccount();
  }

  render() {


    
    console.log("rendering");
    if(this.props.account){
        console.log("account found", this.props.account);
        return (
            <div>
            <AccountDetails activeAccount={this.props.account} callFunc={()=>this.callBack.bind(this)}/>
            </div>
        )
    }

    if(this.props.accounts.owner){
        return (
            <div>
            <Card shadow={3} style={{width: '100%', margin: 'auto'}} className="test-card-accounts">
                <CardTitle>
                    <h2 className="mdl-card__title-text">My Accounts</h2>
                </CardTitle>

                <CardText></CardText>

                <List>
                        <ListItem key={this.props.accounts.id} threeLine style={{borderTop: '1px solid #eee'}} onClick={() => { this.props.fetchAccountTransactions(this.props.accounts.id) }}>
                           <ListItemContent  subtitle={this.props.accounts.owner.name}> 
                                {this.props.accounts.type} <small>Account Number: {this.props.accounts.accountNo}</small>
                            </ListItemContent> 

                            <ListItemAction>
                  <span className="test-account-balance" style={{color: this.props.accounts.balance > 0? creditColor: debitColor}}>
                    {(this.props.accounts.balance >= 0? 'Rs.': '-Rs.')}{Math.abs(this.props.accounts.balance).toFixed(2)}
                  </span>
                            </ListItemAction>
                        </ListItem>
                </List>
                <br />
            </Card>
            </div>
        );
    }

      return (
          <div>Loading....</div>
      );


  }
}

function mapStateToProps(state) {
    return {
        accounts: state.accounts.accounts,
        account: state.accounts.account
    }
}

export default connect(mapStateToProps, actions)(Accounts);
