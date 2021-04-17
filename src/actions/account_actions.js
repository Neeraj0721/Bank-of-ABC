import { FETCH_ACCOUNTS_SUCCESS } from './types'
import { FETCH_ACCOUNTS_ERROR } from './types'
import { FETCH_TRANSACTIONS_SUCCESS } from './types'
import { FETCH_TRANSACTIONS_ERROR } from './types'
import { CLEAR_ACTIVE_ACCOUNT } from './types'
import { TRANSFER_COMPLETE } from './types'
import { TRANSFER_ERROR } from './types'
import { URL } from './types'
import { CLEAR_TRANSFER } from './types'
import FetchAPI from './fetchapi'
function fetchAccountDone(accounts){
    console.log("FETCH_ACCOUNTS_SUCCESS");
    console.log("id",accounts);
    console.log("id",accounts);
    return {
        type: FETCH_ACCOUNTS_SUCCESS,
        payload: accounts
    }
}

function fetchAccountError(error) {
    return {
        type: FETCH_ACCOUNTS_ERROR,
        payload: error
    }
}

function fetchTransactionDone(transactions){
    return {
        type: FETCH_TRANSACTIONS_SUCCESS,
        payload: transactions
    }
}

function fetchTransactionError(error){
    return {
        type: FETCH_TRANSACTIONS_ERROR,
        payload: error
    }
}

function transferDone(status){
    return {
        type: TRANSFER_COMPLETE,
        payload: status
    }
}

function transferError(error){
    return {
        type: TRANSFER_ERROR,
        payload: error
    }
}


export function fetchAccounts() {

    return (dispatch, getState) => {
        const token = getState().loggedInDetails.token

        if (token){
        console.log("fetching");
        FetchAPI(token).then((accounts) => {
            dispatch (fetchAccountDone(accounts));
            console.log(accounts);
        }).catch(error => {
            dispatch (fetchAccountError(error));
            console.log(error);
            console.log("error");
        });
        /*if (token){

            let accountsPromise = fetch(`${ROOT_ROOT_URL}/accounts/?id=${token}`,{
                method: 'GET'
            });

            accountsPromise.then((response) => {
                return response.json()
            }).then((accounts) => {
                dispatch (fetchAccountDone(accounts));
                console.log(accounts);
            }).catch(error => {
                dispatch (fetchAccountError(error));
                console.log(error);
                console.log("error");
            })
        } */
        }
        else {
            dispatch(fetchAccountError({message: 'User not logged in'}));
        }
    }
}



export function fetchAccountTransactions(id) {

    return (dispatch, getState) => {
        const token = getState().loggedInDetails.token

        if (token){
            FetchAPI(token).then((accounts) => {
                dispatch (fetchTransactionDone(accounts));
            }).catch(error => {
                dispatch (fetchTransactionError(error));
            })
        } else {
            dispatch(fetchTransactionError({message: 'User not logged in'}));
        }
    }
}

export function clearActiveAccount() {
    return {
        type: CLEAR_ACTIVE_ACCOUNT,
        payload: ''
    }
}

export function transferAmount(fromId, toId, amount) {

    return (dispatch, getState) => {
        const token = getState().loggedInDetails.token

        if (token){

            let transferPromise = fetch(`${URL}account/${fromId}/transfer/${toId}?token=${token}`,{
                method: 'POST',
                headers: new Headers({
                    'Content-Type': 'application/json'
                }),
                body: JSON.stringify({
                    amount: amount
                })
            });

            transferPromise.then((response) => {
                return response.json()
            }).then((status) => {
                if(status.error){
                    dispatch (transferError(status));
                }
                dispatch (transferDone(status));
            }).catch(error => {
                dispatch (transferError(error));
            })
        } else {
            dispatch(transferError({message: 'User not logged in'}));
        }
    }
}

export function clearTransferDetails() {
    return {
        type: CLEAR_TRANSFER
    }
}