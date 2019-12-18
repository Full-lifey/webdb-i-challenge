const express = require('express');

const db = require('./data/dbConfig.js');

const server = express();

server.use(express.json());

server.post('/api/accounts', (req, res) => {
  const account = req.body;

  db('accounts')
    .insert(account)
    .then(arrayOfIds => {
      const idOfLastAccount = arrayOfIds[0];
      res.status(200).json(idOfLastAccount);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

server.get('/api/accounts', (req, res) => {
  db('accounts')
    .then(accounts => {
      res.status(200).json(accounts);
    })
    .catch(err => {
      res.status(500).json({ message: 'Unable to retrieve accounts' });
    });
});

server.get('/api/accounts/:id', (req, res) => {
  db('accounts')
    .where({ id: req.params.id })
    .first()
    .then(account => {
      res.status(200).json(account);
    })
    .catch(err => {
      res.status(404).json({ message: 'Account not found' });
    });
});

server.put('/api/accounts/:id', (req, res) => {
  db('accounts')
    .where({ id: req.params.id })
    .update(req.body)
    .then(count => {
      if (count > 0) {
        res.status(201).json({ message: `${count} record(s) updated` });
      } else {
        res.status(404).json({ message: 'record not found' });
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

server.delete('/api/accounts/:id', (req, res) => {
  db('accounts')
    .where({ id: req.params.id })
    .del()
    .then(count => {
      res.status(201).json({ message: `${count} record(s) have been deleted` });
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = server;
