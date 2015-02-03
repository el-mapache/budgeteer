require('node-jsx').install({ extension: '.jsx', harmony: true })

var express = require('express');
var router = express.Router();
var budgets = require('./budgets.js');
var React = require('react');
var appEl = require('../src/components/app.jsx');

router.get('/', function(req, res) {
  res.render('index', {
  	markup: React.renderToString(React.createElement(appEl))
  });
});

router.get('/budgets', budgets.index);
router.get('/budgets/:id', budgets.show);
router.post('/budgets/create', budgets.create);
router.put('/budgets/:id', budgets.update);
router.delete('/budgets/:id', budgets.destroy);

module.exports = router;
