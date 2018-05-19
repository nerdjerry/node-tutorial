var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var Dishes = require('./models/dishSchema');

var url = "mongodb://localhost:27017/conFusion";

mongoose.connect(url)
.then(() => {
    var dish = new Dishes({name : "Rajma", description: "Good dish"});
    dish.save()
    .then((dish) => {
        return Dishes.findByIdAndUpdate(dish._id, {
            $set : {
                description: "Very good dish"
            }},{
                new : true
            }).exec()
    })
    .then((dish) => {
        console.log(dish);
        dish.comments.push({
            rating : 1,
            comment : "Amazing",
            author : "Prateek"
        });
        return dish.save();
    })
    .then(dish => {
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