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

exports.list = (perPage, page) => {
    return new Promise((resolve, reject) => {
        User.find()
            .limit(perPage)
            .skip(perPage * page)
            .exec((err, users) => {
                if (err) {
                    reject(err);
                } else {
                    users.forEach((_, i) => {
                        users[i] = users[i].toJSON();
                        delete users[i]._id;
                        delete users[i].__v;
                        delete users[i].password;
                    });
                    resolve(users);
                }
            });
    });
};

exports.patchUser = (id, userData) => {
    return new Promise((resolve, reject) => {
        User.findById(id, (err, user) => {
            if (err) {
                reject(err);
            } else {
                for (let i in userData) {
                    user[i] = userData[i];
                };
                user.save((err, updateUser) => {
                    if (err) return reject(err);
                    resolve(updateUser);
                });
            }
        });
    });
};

exports.removeById = (userId) => {
    return new Promise((resolve, reject) => {
        User.remove({_id: userId}, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(err);
            }
        });
    });
};