const mongoose = require('mongoose');
const UserSchema = mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    password: String,
    created_at: Date,
    updated_at: Date
}, {
    versionKey: false,
});

module.exports = mongoose.model('user', UserSchema);
