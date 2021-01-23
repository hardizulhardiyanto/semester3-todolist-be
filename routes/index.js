var express = require('express');
var router = express.Router();



module.exports = function (pool) {
  /* GET home page. */
  router.get('/index', function (req, res, next) {
    pool.query('SELECT * FROM list_belanja', (err, results) => {
      if (err) {
        let message = {
          message: "error",
          error: true,
          data: err
        }
        res.status(200).json(message)
      } else {
        let message = {
          message: "success",
          error: false,
          data: results.rows
        }
        res.status(200).json(message)
      }
    })
  });

  router.get('/index/:id', function (req, res, next) {
    const { id } = req.params
    pool.query(`SELECT * FROM list_belanja WHERE id=${id}`, (err, results) => {
      if (err) {
        let message = {
          message: "error",
          error: true,
          data: err
        }
        res.status(200).json(message)
      } else {
        let message = {
          message: "success",
          error: false,
          data: results.rows[0]
        }
        res.status(200).json(message)
      }
    })
  });

  router.put('/index/:id', function (req, res, next) {
    const { id } = req.params
    const { nama_barang } = req.body
    pool.query(`UPDATE list_belanja SET nama_barang='${nama_barang}' WHERE id=${id}`, (err, results) => {
      if (err) {
        let message = {
          message: "error",
          error: true,
          data: err
        }
        res.status(200).json(message)
      } else {
        let message = {
          message: "success",
          error: false,
          data: results.rows[0]
        }
        res.status(200).json(message)
      }
    })
  });

  router.delete('/index/:id', function (req, res, next) {
    const { id } = req.params
    pool.query(`DELETE FROM list_belanja WHERE id=${id}`, (err, results) => {
      if (err) {
        let message = {
          message: "error",
          error: true,
          data: err
        }
        res.status(200).json(message)
      } else {
        let message = {
          message: "success",
          error: false,
          data: results.rows[0]
        }
        res.status(200).json(message)
      }
    })
  });

  router.post('/index', function (req, res, next) {
    const { nama_barang } = req.body
    pool.query(`INSERT INTO list_belanja(nama_barang) VALUES ('${nama_barang}')`, (err, results) => {
      if (err) {
        let message = {
          message: "error",
          error: true,
          data: err
        }
        res.status(200).json(message)
      } else {
        let message = {
          message: "success",
          error: false,
          data: results.rows[0]
        }
        res.status(200).json(message)
      }
    })
  });

  return router
}
