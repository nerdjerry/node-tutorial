var mongoose = require('mongoose');

var dishSchema = mongoose.Schema({
    name : {
        type : String,
        require : true,
        unique : true
    },
    description : {
        type : String,
        require : true,
    }
},{
    timestamps : true
});

module.exports = mongoose.model('dish',dishSchema);