var mongoose = require('mongoose');

var dinausoreSchema = mongoose.Schema({
    login:{ type: String },
    pwd:{type: String},
    age:{type:Number},
    race:{type: String},
    famille: {type: String},
    nourriture: {type: String},
    amis:[{
        login:{type:String},
        race:{type: String},
        famille: {type: String},
        nourriture: {type: String},
    }]

});

module.export = mongoose.model('dinausore',dinausoreSchema)
