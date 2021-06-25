import Express from 'express';
import User from '../model/User.js';
import {registerValidation,loginValidation} from '../validation/validation.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


const router = Express.Router();

router.post('/register',async(req,res)=>{
    //validate a user data before we save 
    const {error} = registerValidation(req.body);

    //if there is error in the given data return error
    if(error) return res.status(400).send(error.details[0].message);

    //check if the email exist in database
    const emailExist = await User.findOne({email:req.body.email});
    if(emailExist) return res.status(400).send('email address is already present');


    //hash passwords
    const salt = await bcrypt.genSalt(12);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    //create a new user
    const user = new User({
        name:req.body.name,
        email:req.body.email,
        password:hashPassword
    });
    try {
        const savedUser = await user.save();
        res.send({user:user._id});
    } catch (error) {
        res.status(400).send(error);
    }  
})

//login 
router.post('/login',async (req,res)=>{
      //validate a user data before we save 
      const {error} = loginValidation(req.body);

      //if there is error in the given data return error
      if(error) return res.status(400).send(error.details[0].message);
  
      //check if the email exist in database
      const user = await User.findOne({email:req.body.email});
      if(!user) return res.status(400).send('enter a valid email');

      //compare the passsword
      const validPass = await bcrypt.compare(req.body.password,user.password);
      if(!validPass) return res.status(400).send('password doesnt match')

      //create and assign a token 
      const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
      res.header('auth-token',token).send(token);


  
  
})


export default router;