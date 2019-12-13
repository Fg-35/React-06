const express = require('express');
const app = express();
const port = 3000;
const connection = require('./conf');
const parser = require("body-parser");

app.use(parser.json());
app.use(parser.urlencoded({
  extended: true
}));

app.get('/api/movies', (req, res) => {
  if (req.query.rating) {
    let sql = 'SELECT * FROM movie';
    const sqlValues = [];
    sql += ' WHERE rating = ?';
    sqlValues.push(req.query.rating);
    // send an SQL query to get all employees
    connection.query(sql, sqlValues, (err, results) => {
      if (err) {
        // If an error has occurred, then the client is informed of the error
        res.status(500).send(`An error occurred: ${err.message}`);
      } else {
        // If everything went well, we send the result of the SQL query as JSON
        res.json(results);
      }
    });
  }
  else if (req.query.genre) {
    let sql = 'SELECT * FROM movie';
    const sqlValues = [];
    sql += ' WHERE genre = ?';
    sqlValues.push(req.query.genre);
    // send an SQL query to get all employees
    connection.query(sql, sqlValues, (err, results) => {
      if (err) {
        // If an error has occurred, then the client is informed of the error
        res.status(500).send(`An error occurred: ${err.message}`);
      } else {
        // If everything went well, we send the result of the SQL query as JSON
        res.json(results);
      }
    });
  }
  else {
    connection.query('SELECT * FROM movie', (err, results) => {
      if (err) {
        res.status(500).send('Erreur lors de la récupération des films');
      } else {
        res.json(results);
      };
    })
  }
});

app.get('/api/movies/:id', (req, res) => {
  const movieId = req.params.id;
  connection.query('SELECT * FROM movie WHERE id=?', [movieId], (err, results) => {
    if (err) {
      res.status(500).send(`An error occurred: ${err.message}`);
    }
    if (results.length === 0) {
      return res.status(404).send('Movie not found');
    }
    return res.json(results[0]);
  });
});

// app.get('/api/movies', (req, res) => {
//   let sql = 'SELECT * FROM movie';
//   const sqlValues = [];
//   if (req.query.rating) {
//     sql += ' WHERE rating = ?';
//     sqlValues.push(req.query.rating);
//   }
//   // send an SQL query to get all employees
//   connection.query(sql, sqlValues, (err, results) => {
//     if (err) {
//       // If an error has occurred, then the client is informed of the error
//       res.status(500).send(`An error occurred: ${err.message}`);
//     } else {
//       // If everything went well, we send the result of the SQL query as JSON
//       res.json(results);
//     }
//   });
// });



//        ************  Données Employee ******************



// app.get('/api/employees', (req, res) => {
//   const employeeId= req.params.id;
//   connection.query('SELECT * FROM employee', (err, results) => {
//     if (err) {
//       res.status(500).send('Erreur lors de la récupération de employée');
//     } else {
//       res.json(results);
//     };
//   });
// });

// app.get('/api/employees/:id', (req, res) => {
//   const employeeId= req.params.id;
//   connection.query('SELECT * FROM employee WHERE id=?', [employeeId], (err, results) => {
//     if (err) {
//       res.status(500).send(`An error occurred: ${err.message}`);
//     } 
//     if (results.length === 0) {
//       return res.status(404).send('Employee not found');
//     }
//     return res.json(results[0]);
//   });
// });

// app.get('/api/employees', (req, res) => {
//   let sql = 'SELECT * FROM employee';
//   const sqlValues = [];
//   if (req.query.department) {
//     sql += ' WHERE department = ?';
//     sqlValues.push(req.query.department);
//   }
//   // send an SQL query to get all employees
//   connection.query(sql, sqlValues, (err, results) => {
//     if (err) {
//       // If an error has occurred, then the client is informed of the error
//       res.status(500).send(`An error occurred: ${err.message}`);
//     } else {
//       // If everything went well, we send the result of the SQL query as JSON
//       res.json(results);
//     }
//   });
// });




app.listen(port, (err) => {
  if (err) {
    throw new Error('Something bad happened...');
  }

  console.log(`Server is listening on ${port}`);
});

