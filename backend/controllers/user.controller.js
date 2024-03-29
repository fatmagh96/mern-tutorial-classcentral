const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/user.model')

// Register new User
// POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
    const {name, email, password} = req.body
    if(!name || !email ||  !password){
        res.status(400)
        throw new Error('Please add all fields')
    }

    // check if user exists
    const userExists = await User.findOne({email})
    if(userExists){
        res.status(400)
        throw new Error('User already exists')
    }
    // hash pswrd

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // create user
    const user= await User.create({
        name, 
        email,
        password: hashedPassword,
    })

    if (user){
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
 
})

// Register new User
// POST /api/users/login
// @access Public

const loginUser = asyncHandler( async (req, res) => {
    const {email, password} = req.body
    // check for user email
    const user = await User.findOne({email})
    if(user && (await bcrypt.compare(password, user.password))){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        })
    }else {
        res.status(400)
        throw new Error('Invalid credential')
    }


    
    // res.json({message : 'Login User'})
})

// get user data
// Get /api/users/me
// @access Private
const getLoggedUser = asyncHandler( async (req, res) => {
    // const {_id, name, email} = await User.findById(req.user.id)
    res.status(200).json(req.user)
    // res.status(200).json({
    //     id:_id,
    //     name,
    //     email,
    // })
    // res.json({message : 'User Data display'})
})

// generate token

const generateToken = (id)=>{
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn:'30d'})
}



module.exports = {
    registerUser,
    loginUser,
    getLoggedUser,
}