const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Bring In Models
var Metric = require('./models/metric');

mongoose.connect('mongodb://brad:Password1@ds059115.mlab.com:59115/rocostats', {useNewUrlParser: true, useUnifiedTopology: true});
let db = mongoose.connection;
// console.log('Connected to db');

// Check Connection to Database
db.once('open', () => {
    console.log('Connected to MongoDB...');
});

// Check for Database Errors
db.on('error', (err) => {
    console.log(err);
});

// Load View Engine
//app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Body-Parser Middleware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// Set Public Folder
app.use(express.static(path.join(__dirname, 'public')));

// Load Bootstrap 4 CSS & JS Directores Using Express Middleware
app.use('/bootstrap', express.static(path.join(__dirname + '/node_modules/bootstrap/dist/css/')));
app.use('/bootstrap', express.static(path.join(__dirname + '/node_modules/bootstrap/dist/js/')));

// Index Page
app.get('/', (req, res) => {
    Metric.find({}, (err, metrics) => {
        if(err){
            console.log(err);
        } else {
            res.render('index', {
            title:'ROCO Stats',
            metrics: metrics
            });
        }
    });    
});

// Get Single Metric
app.get('/metric/:id', (req, res) => {
    Metric.findById(req.params.id, (err, metric) => {
        res.render('metric', {
            metric:metric
        });        
    });
});

// Add Statictical Metrics
app.get('/metrics/add-metric', (req, res) => res.render('add-metric', {
    title:'Add Metric',    
    }));

// Update Statistical Metrics
app.get('/metrics/edit/:id', (req, res) => {
    Metric.findById(req.params.id, (err, metric) => {
        res.render('edit-metric', {
            title:'Edit Metric',
            metric:metric
        });        
    });
});

// Update Metric Post Route
app.post('/metrics/edit/:id', (req, res) => {
    let metric = {}; 
    metric.title = req.body.title;
    metric.source = req.body.source;
    metric.comment = req.body.comment;

    let query = {_id:req.params.id}

    Metric.updateOne(query, metric, (err) => {
        if(err){
            console.log(err);
            return;
        } else {
            res.redirect('/');
        }
    });
});

// Delete Metric Route
app.delete('/metrics/:id', (req, res) => {
    let query = {_id:req.params.id}
    Metric.remove(query, (err) => {
        if(err){
            console.log(err);
        }
        res.send('Success');
    });
});

// Submit Metric Post Route
app.post('/metrics/add-metric', (req, res) => {
    let metric = new Metric();
    metric.title = req.body.title;
    metric.source = req.body.source;
    metric.comment = req.body.comment;

    metric.save((err) => {
        if(err){
            console.log(err);
            return;
        } else {
            res.redirect('/');
        }
    });
});


// Listen on port
app.listen(port, () => console.log(`rocoStats app listening at http://localhost:${port}`));