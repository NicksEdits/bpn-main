const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type:String, required: true },
    name: { type:String, required: false},
    firstname: { type:String, required: false},
    sex: { type:String, required: false},
    age: { type:Number, required: false},
    height: { type:Number, required: false},
    weight: { type:Number, required: false},
    goal: { type:String, required: false},
    profilePicture: { type:String, required: false },
    role: { type:String, required: false },
    bio: { type:String, required: false }
})

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);