import React, { Component } from 'react';
import { Card, CardText, CardTitle, DataTable, TableHeader, Icon, FABButton } from 'react-mdl';

class AccountDetails extends Component {

    renderTransactions() {
        return (
            <DataTable
                selectable
                shadow={1}
                style={{textAlign:'center'}}
                rowKeyColumn="id"
                rows={this.props.activeAccount.transactions.map((transaction) => {
                    return {date: transaction.timestamp.substring(0,10), type :transaction.type, id: transaction.id, amount: transaction.amount, current: transaction.balanceAfter, before: transaction.balanceBefore, currency: transaction.currency, stamp: transaction.timestamp, status: "success", account: this.props.activeAccount.accountNo}
                })}>
                    <TableHeader name="date" tooltip="Transaction date" style={{textAlign:'center'}}>Date</TableHeader>
                    <TableHeader name="account" tooltip="From account number" style={{textAlign:'center'}}>From Account</TableHeader>
                <TableHeader name="id" tooltip="Transaction ID" style={{textAlign:'center'}}>Transaction ID</TableHeader>
                <TableHeader name="stamp" tooltip="Transaction Time Stamp" style={{textAlign:'center'}}>Time Stamp</TableHeader>
                    <TableHeader name="amount" tooltip="Amount Transacted" style={{textAlign:'center'}}>Amount</TableHeader>
                    <TableHeader numeric name="currency" tooltip="Unit" style={{textAlign:'center'}}>Currency</TableHeader>
                    <TableHeader name="type" tooltip="Amount Transacted" style={{textAlign:'center'}}>Type</TableHeader>
                    <TableHeader numeric name="before" tooltip="Previous Balance" style={{textAlign:'center'}}>Previous</TableHeader>
                    <TableHeader numeric name="current" tooltip="Amount Transacted" style={{textAlign:'center'}}>Current</TableHeader>
                <TableHeader name="status" tooltip="Amount Transacted" style={{textAlign:'center'}}>Status</TableHeader>
            </DataTable>
        )
            
    }

    render() {
        if(this.props.activeAccount){
            console.log("activeAccount",this.props.activeAccount);
      return (
        <Card shadow={1} style={{width: '100%', margin: 'auto'}}>
            <CardTitle style={{display: 'block'}}>
                <span style={{padding: '25px'}}>
                    {this.props.activeAccount.description}
                </span>
                <span>
                    <FABButton onClick={() => {this.props.callFunc()}}>
                        <Icon name="Cancel" style={{fontSize:'9px'}} />
                    </FABButton>
                </span>


            </CardTitle>

            <div>
            {this.renderTransactions()}
            </div>
        </Card>
      )
    }
    else{
        return(
        <div>Please Wait...</div>
        )
    }
    }
}

export default AccountDetails;
