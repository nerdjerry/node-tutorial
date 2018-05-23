var mongoose = require('mongoose');

var commentSchema = mongoose.Schema({
    rating : {
        type : Number,
        min: 1,
        max: 5,
        require : true,
    },
    comment : {
        type: String,
        require: true
    },
    author : {
        type: String,
        require: true
    }
},{
        timestamps : true
    }
);
var dishSchema = mongoose.Schema({
    name : {
        type : String,
        require : true,
        unique : true
    },
    description : {
        type : String,
        require : true,
    },
    comments : [commentSchema]
},{
    timestamps : true
});

module.exports = mongoose.model('dish',dishSchema);