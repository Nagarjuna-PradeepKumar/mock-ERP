const Maindata = require('../dbschemas/Product_schema')
const router = require('express').Router()
const {store_entry_validation} = require('../validation/store_entry_validation')
const {store_mrn_validation} = require('../validation/store_mrn_validation')


router.post('/entry',async (req,res)=>{
    //store entry validation
    const {error} = await store_entry_validation(req.body)
    if(error) return res.send(error.details[0].message)

    //check for already entered data
    try{
        const ispresent = await Maindata.find({project : req.body.project,'details.partno' : req.body.partno},{details: { $elemMatch: { partno: req.body.partno } } })
        if(ispresent[0].details[0].store_lock ===true) return res.send('The edit option is Locked. contact the Admin')
       }
        catch(err){ return res.send('part not found')}

    // Date setting
         if(!req.body.received_date)(entryDate = Date().toString().replace(/T/, ' ').replace(/\..+/, ''))
            else(entryDate=req.body.received_date)
    
        //find and update the data
    const updatedata = await Maindata.updateOne({project : req.body.project,'details.partno':req.body.partno},{
        
        '$inc':{'details.$.quantity_available': req.body.quantity_received},
        '$push':{'details.$.stores_history':{
            date             : entryDate,
            quantity_arrived : req.body.quantity_received,
        }},
        '$set':{"details.$.store_lock":req.body.store_lock,}}
    )
    
    if(updatedata)return res.send("updated successfully")
    return res.send('error')

})

router.post('/mrn',async (req,res)=>{
    //store entry validation
    const {error} = await store_mrn_validation(req.body)
    if(error) return res.send(error.details[0].message)
    
    //check for already entered data
    try{
        const ispresent = await Maindata.find({project : req.body.project,'details.partno' : req.body.partno},{details: { $elemMatch: { partno: req.body.partno } } })
        if(ispresent[0].details[0].inspected_quantity > ispresent[0].details[0].quantity_available){cantake=(cantake=ispresent[0].details[0].inspected_quantity)-(ispresent[0].details[0].quantity_available)}else{cantake=ispresent[0].details[0].inspected_quantity}
        if(ispresent[0].details[0].store_lock ===true) return res.send('The edit option is Locked. contact the Admin')
        if(req.body.taken_quantity <= cantake){
               

    
            //Date setting
            if(!req.body.taken_date)(entryDate = Date().toString().replace(/T/, ' ').replace(/\..+/, ''))
            else(entryDate=req.body.taken_date)

        
            //find and update the data
            const updatedata = await Maindata.updateOne({project : req.body.project,'details.partno':req.body.partno},{            
                '$inc':{'details.$.quantity_available': -req.body.taken_quantity},
                '$push':{'details.$.stores_history':{
                    date             : entryDate,
                    takenby          : req.body.takenby,
                    taken_quantity   : req.body.taken_quantity,
                }},
                '$set':{"details.$.store_lock":req.body.store_lock,}}
            )
            if(updatedata)return res.send("entry updated successfully")
            return res.send('error')
        }
        else{
            return res.send(`the available stock is ${ispresent[0].details[0].quantity_available}, Inspected and available to you is ${cantake}, you cannot take more than that `)
        }
    }
    catch(err){ return res.send('part not found')}

})








module.exports=router;


// {
//     "project":"k346",        
//     "partno"              :"k346-01-a01-02",      
//     "received_date"       :"01/02/2020",
//     "quantity_received"  :5,
//     "store_lock"          :false    
// }


// {
//     "project":"k346",        
//     "partno"              :"k346-01-a01-02",      
//     "taken_date"          :"01/02/2020",
//     "takenby"            :"nagarjuna",
//     "taken_quantity"    :5,
//     "store_lock"          :false      
// }