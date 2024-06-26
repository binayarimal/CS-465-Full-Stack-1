// Bring in the db connection to the Trip schema

const Mongoose = require('./db');
const Trip = require('./travlr');

//Read seed data from json file

var fs = require('fs');
var trips = JSON.parse(fs.readFileSync('./data/trips.json','utf8'));

//delete existing records and insert seed data

const seedDB = async () => {

    await Trip.deleteMany({});
    await Trip.insertMany(trips);
}

seedDB().then(async () => {
    await Mongoose.connection.close();
    process.exit(0);
})