const connection = require('../config/database');

const User = require("../models/user");
const Product = require("../models/product");



const getHomepage = async (req, res) => {
  // let results = await User.find({});
    return res.render('index.ejs') 
}

// function insertPostData () {
//   Product.insertMany([
//     {
//       name: "Banh ngot",
//       price: "Learn how to use Node.js to build RESTful APIs using frameworks like Express.js",
//       image: ""
//     },
//   ])
// }

// insertPostData();


module.exports = {
    getHomepage
}