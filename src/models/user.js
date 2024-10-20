const mongoose = require('mongoose');

//shape data
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
      },
      password: {
        type: String,
        required: true,
      }
});



const User = mongoose.model('user', userSchema);

module.exports = User;
