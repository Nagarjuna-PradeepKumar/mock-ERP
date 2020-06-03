const router = require('express').Router()
const Users = require('../dbschemas/signupschema')
const {loginvalidation}= require('../validation/loginvalidation')
const bcrypt = require('bcrypt')

router.post('/',async (req,res)=>{
   
        
    //login validation
    const{error} = loginvalidation(req.body)
    if(error)return res.send(error.details[0].message);
   

    //check for existing email
    const usernameexist =await Users.findOne({username : req.body.username})
    if(!usernameexist) return res.send('username does not exist')

    //getpassword from db
    const dbpass = await Users.findOne({username: req.body.username},function(err,obj) {return obj});
    const dbpassword = dbpass.password;


    //check for password
    const validpassword = bcrypt.compareSync(req.body.password, dbpassword)
    if(!validpassword) return res.status(200).send('incorrect password')
    else return res.status(200).send({user:dbpass.username,designation:dbpass.designation,status:"login successful",valid:true})
 
   
})
module.exports = router;

// {
// 	"username" : "arun@gmail.com",
// 	"password" : "vijay"
// }