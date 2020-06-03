const express= require('express')
const Maindata = require('../dbschemas/Product_schema')
const router = require('express').Router()
const {store_entry_validation} = require('../validation/store_entry_validation')


router.post('/',async (req,res)=>{
    //store entry validation
    const {error} = await store_entry_validation(req.body)
    if(error) return res.send(error.details[0].message)

    //check for already entered data
    try{
        const ispresent = await Maindata.find({project : req.body.project,'details.partno' : req.body.partno},{details: { $elemMatch: { partno: req.body.partno } } })
        if(ispresent[0].details[0].store_lock ===true) return res.send('The edit option is Locked. contact the Admin')
        if(ispresent[0].details[0].received_date==="null" || ispresent[0].details[0].quantity_available===0) return res.send('No past entries. Try entry instead')}
        catch(err){ return res.send('part not found')}

        
    //find and update the data
    const updatedata = await Maindata.updateOne({project : req.body.project,'details.partno':req.body.partno},{

        '$set':{"details.$.received_date"        :req.body.received_date,         
                "details.$.quantity_available"   :req.body.quantity_available,
                "details.$.store_lock"            :req.body.store_lock,
                }}
    )
    
    if(updatedata)return res.send(updatedata)
    return res.send('error')

})

module.exports=router;


// {
//     "project":"k346",        
//     "partno"              :"k346-01-a01-02",      
//     "received_date"       :"01/02/2020",
//     "quantity_available"  :5,
//     "store_lock"          :false,       

// }