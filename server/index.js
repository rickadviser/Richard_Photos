const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser')

const app = express();
const PORT = 3002;
const path = require ('path');
const save = require('.//database/index.js');

// DATABASE CONNECTION
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'rickadvisor',
});


connection.connect((err) => {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  };

  console.log('connected as id ' + connection.threadId);
})

// MIDDLEWARE
app.use(morgan('dev'));
app.use(bodyParser.json());

// SERVE CLIENT FROM SERVER ON '/' ROUTE
app.use('/', express.static(path.join(__dirname, "../public")));

// ROUTES
app.get('/photos', (req, res, next) => {
  // Controller & Model
  connection.query('SELECT * from photos;', (error, results, fields) => {
    if(error) {
      console.log(error);
      res.status(404).json( {error: 'Could not complete get request'});
    } else {
      res.json({ photos: results });
    }
  })
})

app.post('/photos', (req, res, next) => {
  // Capture relevant info from request body
  const hotel_id = req.body.hotel_id;
  const lg_photo_id = req.body.lg_photo_url;
  const sm_photo_id = req.body.sm_photo_url;
  const type = req.body.type;
  // Make a query to our database
  const queryStr = `INSERT INTO photos (hotel_id, lg_photo_url, sm_photo_url, type) VALUES ('${hotel_id}', '${lg_photo_url}', '${sm_photo_url}', '${type}');`
  connection.query(queryStr, (error, results, fields) => {
      // Respond to client with data
    if(error) {
      console.log(error);
      res.status(400).json( {error: 'Could not complete post request'})
    } else {
      res.status(201).json({ item: results });
    }
  })
})

app.delete('/photo', (req, res, next) => {
  // Capture relevant info from request body
  const photo_id = req.body.photo_id;
  // Make a query to our database
  const queryStr = `DELETE FROM photo WHERE photo_id = '${photo_id}';`
  connection.query(queryStr, (error, results, fields) => {
      // Respond to client with data
    if(error) {
      console.log(error);
      res.status(400).json( {error: 'Could not complete delete request'})
    } else {
      res.status(201).json({ item: results });
    }
  })
})

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));