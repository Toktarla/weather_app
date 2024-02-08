const mongoose = require("mongoose");
 
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    userId: String,
    creationDate: Date,
    updateDate: Date,
    deletionDate: Date,
    adminStatus: Boolean
},{ collection: 'users' });

const User = mongoose.model('User', userSchema);

module.exports = {User};