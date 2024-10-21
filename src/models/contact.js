const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ContactSchema = new Schema({
  fullname: {
    type: String,
    required: true
  },
  number: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  }

});

const Contact  = mongoose.model('Contact', ContactSchema);
module.exports = Contact;

