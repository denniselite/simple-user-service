const mongoose = require('../../common/services/mongoose.service').mongoose;
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String, 
    permissionLevel: Number
})

const User = mongoose.model('Users', userSchema)

exports.createUser = (userData) => {
    const user = new User(userData);
    return user.save();
}