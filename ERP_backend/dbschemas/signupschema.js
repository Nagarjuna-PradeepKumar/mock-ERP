const mongoose =require('mongoose')

const signup = new mongoose.Schema({
    username:{
        type : String,
        required : true,
        min : 3,
        max : 20
    },
    designation:{
        type : String,
        required : true,
        min : 3,
        max : 1020
    },   
    password:{
        type : String,
        required : true,
        min : 3,
        max : 1020
    },
   
})

module.exports= mongoose.model('Users',signup);