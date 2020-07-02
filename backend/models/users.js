const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Notes = new Schema({
    title : {
        type : String
    },
    description : {
        type : String
    },
} , {
    timestamps : true
});
const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    notes : [Notes]
});



var User = mongoose.model('User' , UserSchema);
module.exports = User;