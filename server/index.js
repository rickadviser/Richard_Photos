const express = require('express');
const morgan = require('morgan');
// const mysql = require('mysql');
const bodyParser = require('body-parser')

const app = express();
const PORT = 3000;
const path = require ('path');

// DATABASE CONNECTION
// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   database: 'photos'
// });

// connection.connect((err) => {
//   if(err) {
//     console.errpr('Error connecting ' + err.stack);
//     return;
//   };

//   console.log('Connected as id ' + connection.threadId);
// });

// MIDDLEWARE
app.use(morgan('dev'));
app.use(bodyParser.json());

// SERVE CLIENT FROM SERVER ON '/' ROUTE
app.use('/', express.static(path.join(__dirname, "../client/dist")));

// ROUTES
app.get('/photos', (req, res) => {
  const queryStr = 'SELECT * FROM photos';
  connection.query(queryStr, (error, results) => {
    if(err) {
      console.log(error);
      res.status(404).json( {error: 'Could not complete GET request'});
    } else {
      res.json({photos: results });
    }
  });
});

app.listen(3000, () => console.log(`Server running on port: ${PORT}`));