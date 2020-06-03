const mongoose =require('mongoose')

const maindata = new mongoose.Schema({
    project:{
        type : String,
        required : true,
        min : 3,
        max : 10
    },
    details:[
        {
            partno                      :{type : String, required : true},      
            description                 :{type : String, required : true},     
            quantity_ordered            :{type : Number, required : true},        
            order_date                  :{type : String, required : true},
            designer_lock               :{type : Boolean, default : false},  

            quantity_available          :{type : Number, default  : 0},
            stores_history              :[{
                                            date             : {type: String},
                                            quantity_arrived : {type : Number},
                                            takenby          : {type:String},
                                            taken_quantity   : {type:Number}
                                         }],
            store_lock                  :{type : Boolean, default : false},  

            inspection_start_date       :{type : String, default  : "null"},
            inspected_quantity          :{type : Number, default  : 0},
            inspection_status           :{type : Boolean, default : false}, 
            inspection_details           :[{
                                            date            :{type : String},
                                            inspec_details  :{type: String},                                            
                                         }],
            quality_lock                :{type : Boolean, default : false},
        }

    ]
})

module.exports= mongoose.model('Maindata',maindata);