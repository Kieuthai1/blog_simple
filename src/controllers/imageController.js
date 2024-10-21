const express = require('express');
const multer = require('multer');
const path = require('path');
const Product = require('../models/product'); // Import model Product

const router = express.Router(); // Tạo router

// 1. Cấu hình nơi lưu file và đặt tên file
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'src/public/images/'); // Đường dẫn đến thư mục bạn muốn lưu ảnh
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname)); // Đặt tên file duy nhất
  }
});

// 2. Tạo upload instance với multer
const upload = multer({ storage: storage });

// 3. Định nghĩa route xử lý khi người dùng tải ảnh lên
const saveImage = async (req, res) => {
  try {
    // Đường dẫn của file đã tải lên
    const imagePath = req.file.filename; // Chỉ lưu tên file, để dễ truy cập (src/public/images/<filename>)
    const { name, price } = req.body; // Lấy tên sản phẩm và giá từ form

    // Tạo một sản phẩm mới và lưu vào cơ sở dữ liệu
    const newProduct = new Product({
      name,
      price,
      image: imagePath, // Lưu tên file của ảnh vào cơ sở dữ liệu
    });

    await newProduct.save(); // Lưu sản phẩm vào cơ sở dữ liệu

    // Gửi phản hồi lại cho client
    res.redirect('/admin'); // Sau khi thêm sản phẩm, chuyển hướng về trang quản lý

  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  upload,
  saveImage
};
