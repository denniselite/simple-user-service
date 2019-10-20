const mongoose = require('../../common/services/mongoose.service').mongoose;
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String, 
    permissionLevel: Number
})

userSchema.virtual('id').get(function() {
    return this._id.toHexString();
});

userSchema.set('toJSON', {
    virtuals: true,
});

userSchema.findById = (cb) => {
    return this.model('Users').find({id: this.id}, cb);
};

const User = mongoose.model('Users', userSchema)

exports.createUser = (userData) => {
    const user = new User(userData);
    return user.save();
}

exports.findById = (id) => {
    return User.findById(id)
        .then((result) => {
            result = result.toJSON();
            delete result._id;
            delete result.__v;
            delete result.password;
            return result;
        });
};

exports.patchUser = (id, userData) => {
    return new Promise((resolve, reject) => {
        User.findById(id, (err, user) => {
            if (err) reject(err);
            for (let i in userData) {
                user[i] = userData[i];
            };
            user.save((err, updateUser) => {
                if (err) return reject(err);
                resolve(updateUser);
            });
        });
    });
}