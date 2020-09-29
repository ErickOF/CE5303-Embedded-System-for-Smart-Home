'use strict'
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const router = express.Router();

// Import server properties
const properties = require('./config/properties');

// Import routes
const authRoutes = require('./components/users/users.routes');


// App
const app = express();
// Accept all CORS Methods
app.use(cors());


// Using body parsers
const bodyParserJSON = bodyParser.json();
const bodyParserURLEncoded = bodyParser.urlencoded({ extended: true });

app.use(bodyParserJSON);
app.use(bodyParserURLEncoded);


// Defining main route
app.get('/', (req, res) => {
    res.status(200).send('Smart Home Server: This is working...');
});


// Authentication
app.use('/api', router);
authRoutes(router);


// Define all routes here
// Route 1

// Route 2

// etc



app.use(router);


// Starting server
app.listen(properties.PORT, () => {
    console.log(`Listening on http://localhost:${properties.PORT}`);
});
