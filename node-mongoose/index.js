var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var Dishes = require('./models/dishSchema');

var url = "mongodb://localhost:27017/conFusion";

mongoose.connect(url)
.then(() => {
    var dish = new Dishes({name : "Rajma", description: "Good dish"});
    dish.save()
    .then((dish) => {
        return Dishes.find({}).exec();
    })
    .then((dish) => {
        console.log(dish);
        return mongoose.connection.dropCollection('dishes');
    })
    .then(() => {
        return mongoose.disconnect();
    })
    .catch((err) =>{
        console.log(err);
    })
});