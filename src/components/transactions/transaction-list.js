var React = require('react');
var TransactionListItem = require('./transaction-list-item.js');
var TransactionStore = require('../../stores/transaction-store.js');
var StoreConsumer = require('../../mixins/store-consumer.js');
var Router = require('react-router');

var TransactionList = React.createClass({
  mixins: [StoreConsumer.fromStore(TransactionStore), Router.State],

  componentWillMount: function() {
    TransactionStore.getAll(this.getParams().budgetId);
  },

  render: function() {
    return (
      <section className="row">
        <div className="col s12">
          <table className="bordered hoverable responsive-table">
            <thead>
              <tr>
                <td className="collection-item"><b>Title</b></td>
                <td className="collection-item"><b>Purchased On</b></td>
                <td className="collection-item"><b>Purchased By</b></td>
                <td className="collection-item"><b>Amount</b></td>
                <td className="collection-item"><b>Percentage Split</b></td>
                <td className="collection-item"><b>Category</b></td>
                <td className="collection-item"><b>Note</b></td>
                <td className="collection-item"><b>Added On</b></td>
              </tr>
            </thead>
            <tbody>
              {this.state.transactions.map(function(transaction) {
                return ( <TransactionListItem key={transaction.id} transaction={transaction} />);
              })}
            </tbody>
          </table>
        </div>
      </section>
    );
  }
});

module.exports = TransactionList;
