const express = require('express');
const { getHomepage
} = require('../controllers/homeController');
const router = express.Router();

// router.Method('/route', handler)
router.get('/', getHomepage);

module.exports = router; //export default