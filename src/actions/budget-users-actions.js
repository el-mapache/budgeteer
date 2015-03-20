var ActionCreator = require('./action-creator.js');

// TODO: if i go full success and failure route maybe I can derive those actions dynamically
module.exports = ActionCreator.create('BudgetUsersActions', 'create', 'createSuccess');
