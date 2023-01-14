const {StatusCodes }=require('http-status-codes')


const User=require('../models/user')
const { UnauthenticatedError,BadRequestError }=require('../errors/index')

const registerUser=async(req,res)=>{
    const { name,email,password }=req.body
    if (!email || !name || !password) {
        throw new BadRequestError('Please provide values')
    }
    //*Hashed password in user model

    const user = await User.create({...req.body})
    const token= user.createJWT();
    res.status(StatusCodes.CREATED).json({user:{
        name: user.name,
        email:user.email,
        lastName:user.lastName,
        token
    }})
}



const loginUser=async(req,res)=>{
    const { email,password }=req.body
    if (!email || !password) {
        throw new BadRequestError('email and password are required')
    }
    
    const user = await User.findOne({email})
    
    if (!user) {
        throw new UnauthenticatedError('Email does not exist')
    }
    
    const isPasswordCorrect= await user.comparePassword(password)
    
    if ( !isPasswordCorrect ){
        throw new UnauthenticatedError('Invalid password')
    }

    const token= user.createJWT();
    res.status(StatusCodes.OK).json({
        user:{
            name: user.name,
            email:user.email,
            lastName:user.lastName,
            token
        }
    })
}


const updateUser=async(req,res)=>{

    const { email,name,lastName }=req.body;
    const { userId }=req.user;
    if ( !email || !name || !lastName) {
        throw new BadRequestError('Please provide values')
    }

    const user= await User.findByIdAndUpdate({_id:userId},{
        email,
        name,
        lastName
    },{
        new: true,
        runValidators: true
    })
    const token = user.createJWT();

    res.status(StatusCodes.OK).json({
        user:{
            name: user.name,
            email:user.email,
            lastName:user.lastName,
            token
        }
    })
}




module.exports={
    registerUser,
    loginUser,
    updateUser,
}



