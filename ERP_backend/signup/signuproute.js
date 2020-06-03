const router = require('express').Router()
const Users = require('../dbschemas/signupschema')
const {signupvalidation} = require('../validation/signupvalidation')
const bcrypt = require('bcrypt')

router.post('/',async (req,res)=>{
    
    //validation
    const {error}= signupvalidation(req.body);
    if(error) return res.send(error.details[0].message) 

    //check for existing email
    const usernameexist =await Users.findOne({username : req.body.username})
    if(usernameexist) return res.status(400).send('username already exist')

    //hash the passsword
    const salt = await bcrypt.genSalt(10);
    const hashedpassword= await bcrypt.hash(req.body.password,salt)
  
     
    //get and assign data in user
    const user = new Users({
        username : req.body.username,
        password : hashedpassword,
        designation:req.body.designation,
    })
    
    // send to database
    try{
        const savedUser= await user.save();
        res.send('successfully created user')
    }catch(err){
        res.status(404).send(err)
    }    
})
module.exports = router;

// {
// 	"username" : "arun@gmail.com",
// 	"designation":"designer",
// 	"password" : "vijay",
// 	"repeat_password":"vijay"
// }




