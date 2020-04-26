let mongoose = require('mongoose');

// Metric Schema
let metricSchema = mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    source:{
        type: String,
        required: true
    },
    comment:{
        type: String,
        required: false
    }
});

let Metric = module.exports = mongoose.model('Metric', metricSchema);