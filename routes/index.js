var express = require('express');
var router = express.Router();
var budgets = require('./budgets.js');

router.get('/', function(req, res) {
  res.render('index');
});

router.get('/budgets', budgets.index);
router.get('/budgets/:id', budgets.show);
router.post('/budgets/create', budgets.create);
router.put('/budgets/:id', budgets.update);
router.delete('/budgets/:id', budgets.destroy);

module.exports = router;
