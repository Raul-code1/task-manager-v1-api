const express=require('express');
const router=express.Router();

const {   registerUser,loginUser,updateUser,}=require('../controllers/auth')
const authenticateUser=require('../middleware/authentication')


router.post('/register',registerUser)
router.post('/login',loginUser)
router.patch('/updateUser',authenticateUser,updateUser)





module.exports = router;



