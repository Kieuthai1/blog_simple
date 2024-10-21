const express = require('express');
const { getHomepage, getProduct, getLogin, 
    getRegister, postRegister, postCheckLogin,
    getCheck, getAdmin, DeleProduct, postCreateProduct, getCreateProduct,
    getEditProduct, putEditProduct, getLogout, getManageUsers, deleteUser,
    getEditUser, putEditUser
} = require('../controllers/homeController');
const router = express.Router();

// router.Method('/route', handler)
router.get('', getHomepage);
router.get('/abc', getProduct);
router.get('/login', getLogin);
router.get('/register', getRegister);
router.post('/register', postRegister);
router.post('/login', postCheckLogin);
router.get('/', getCheck)
router.get('/admin', getAdmin)
router.delete('/delete-post/:id', DeleProduct)
router.get('/add-post', getCreateProduct )
router.post('/add-post', postCreateProduct)
router.get('/edit-post/:id', getEditProduct)
router.put('/edit-post/:id', putEditProduct)
router.get('/logout', getLogout)
router.get('/manage-users', getManageUsers);
router.post('/delete-user/:id', deleteUser);
router.get('/edit-user/:id', getEditUser)
router.put('/edit-user/:id', putEditUser)



module.exports = router; //export default