const connection = require('../config/database');

const User = require("../models/user");
const Product = require("../models/product");
const Contact = require("../models/contact");
const jwt = require('jsonwebtoken');
const  bcrypt = require('bcryptjs');
const multer = require('multer');
const contact = require('../models/contact');
const jwtSecret = process.env.JWT_SECERT
const upload = multer({ dest: 'images/' })


const getHomepage = async (req, res) => {
  // let results = await User.find({});
  //  return res.render('index.ejs') 
  try {
    const data = await Product.find();
    const userLoggedIn = req.cookies.token ? true : false; // Kiểm tra nếu có cookie token đăng nhập
    res.render('index.ejs', { data, userLoggedIn });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
}

const getProduct = async (req, res) => {
  try {
    const data = await Product.find();
    res.render('index.ejs', { data }); 
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error"); 
  }
};


// function insertPostData () {
//   Product.insertMany([
//     {
//       name: "Banh ngot",
//       price: "Learn how to use Node.js to build RESTful APIs using frameworks like Express.js",
//       image: "chocolate1.png"
//     },
//   ])
// }

// insertPostData();


    const getLogin = async (req, res) => {
      return res.render('login.ejs') 
    };

    const getRegister = async (req, res) => {
      return res.render('register.ejs') 
    };


    const postRegister =  async (req, res) => {
      try {
        const { username, password, gmail } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
    
        try {
          const user = await User.create({ username, password:hashedPassword, gmail });
         // res.status(201).json({ message: 'User Created', user });
         res.redirect('/login');
        } catch (error) {
          if(error.code === 11000) {
            res.status(409).json({ message: 'User already in use'});
          }
          res.status(500).json({ message: 'Internal server error'})
        }
    
      } catch (error) {
        console.log(error);
      }

    };


    const postCheckLogin = async (req, res) => {
      try {
        const { username, password } = req.body;
        
        const user = await User.findOne( { username } );
    
        if(!user) {
          return res.status(401).json( { message: 'Invalid credentials' } );
        }
    
        const isPasswordValid = await bcrypt.compare(password, user.password);
    
        if(!isPasswordValid) {
          return res.status(401).json( { message: 'Invalid credentials' } );
        }
    
        const token = jwt.sign({ userId: user._id}, jwtSecret );
        res.cookie('token', token, { httpOnly: true });
        res.redirect('/');
    
      } catch (error) {
        console.log(error);
      }
    };

    /**
 * GET /
 * Admin 
*/
 const getCheck =  async (req, res) => {
 
    res.render('admin/dashboard')
};

   const getAdmin =  async (req, res) => {
    // return res.render('panel-tabs.ejs');
    try {
      const data = await Product.find();
      console.log(data);
      res.render('panel-tabs.ejs', { data });
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error"); 
    }
  };

  const getCreateProduct = async (req, res) => {
    try {
      const data = await Product.find();
      res.render('add-post', { 
        layout: 'admin',  // Nếu bạn dùng express-ejs-layouts, layout này sẽ là layout cơ sở cho admin
        data
      });
  
    } catch (error) {
      console.log(error);
    }
  
  }

  const postCreateProduct = async (req, res) => {
    try {
      try {
        const newProduct  = new Product({
          name: req.body.name,
          price: req.body.price,
          image:  req.body.image
        });
  
        await newProduct.save();
        res.redirect('/admin');
      } catch (error) {
        console.log(error);
      }
  
    } catch (error) {
      console.log(error);
    }
  };


  const getEditProduct = async (req, res) => {
    try {
  
      
  
      const data = await Product.findOne({ _id: req.params.id });
  
      res.render('edit_product', {
        layout: 'admin',  
        data
      })
  
    } catch (error) {
      console.log(error);
    }
  
  };

  const putEditProduct = async (req, res) => {
    try {
  
      await Product.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
          price: req.body.price,
          image:  req.body.image
      });
  
      res.redirect('/admin');
  
    } catch (error) {
      console.log(error);
    }
  
  };



  const DeleProduct = async (req, res) => {

    try {
      await Product.deleteOne( { _id: req.params.id } );
      res.redirect('/admin');
    } catch (error) {
      console.log(error);
    }
  };


  const getLogout = (req, res) => {
    res.clearCookie('token');
    //res.json({ message: 'Logout successful.'});
    res.redirect('/');
  }


  const getManageUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.render('user.ejs', { users });
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
};

const deleteUser = async (req, res) => {
  try {
      await User.findByIdAndDelete(req.params.id);
      res.redirect('/manage-users');
  } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error");
  }
};

const getEditUser = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });

    res.render('edit-user', {
      layout: 'admin',  
       user
    })

  } catch (error) {
    console.log(error);
  }

};

const putEditUser = async (req, res) => {
  try {
    let updatedFields = {
      username: req.body.username,
      gmail: req.body.gmail,
    };

    // Kiểm tra nếu mật khẩu cần được cập nhật
    if (req.body.password) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      updatedFields.password = hashedPassword;
    }

    await User.findByIdAndUpdate(req.params.id, updatedFields);
    res.redirect('/manage-users');

  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

const postContact = async (req, res) => {
  try {
    try {
      const newContact  = new Contact({
        fullname: req.body.fullname,
        number: req.body.number,
        email:  req.body.email,
        message:  req.body.message
      });

      await newContact.save();
      res.redirect('/');
    } catch (error) {
      console.log(error);
    }

  } catch (error) {
    console.log(error);
  }
};
  const getContact = async (req, res) => {
    try {
      const contacts = await Contact.find();
      res.render('contact.ejs', { contacts }); 
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error"); 
    }
  };

  const DeleContact = async (req, res) => {

    try {
      await Contact.deleteOne( { _id: req.params.id } );
      res.redirect('/contact');
    } catch (error) {
      console.log(error);
    }
  };
module.exports = {
    getHomepage, getProduct, getLogin, getRegister, postRegister,
    postCheckLogin,getCheck, getAdmin, DeleProduct, postCreateProduct,
    getCreateProduct, getEditProduct, putEditProduct, getLogout,
    getManageUsers, deleteUser, getEditUser, putEditUser, postContact,
    getContact,DeleContact
}