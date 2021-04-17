import React from 'react'
import AppContainer from './components/AppContainer';
import { Route } from 'react-router'
import BalanceTransfer from './components/pages/BalanceTransfers'
import Login from './components/pages/Login'
import AccountDetails from './components/pages/AccountDetails'
import Accounts from './components/pages/Accounts'
import RequireAuth from './components/higherordercomponents/requireauthentication'

export default () =>  (

    <Route path="/" component={AppContainer}>
        <Route exact path="/" component={Login}/>
        <Route path="accounts" component={RequireAuth(Accounts)}/>
        <Route path="transfer" component={RequireAuth(BalanceTransfer)}/>
    </Route>
)