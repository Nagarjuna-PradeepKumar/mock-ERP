const router = require('express').Router()
const Maindata = require ('../dbschemas/Product_schema')
const {design_edit_validation} = require('../validation/design_edit_validation')
const {design_editfetch_validation} = require('../validation/designer_editfetch_validation')




router.post('/fetch',async (req,res)=>{
    //validation of data
    const{error}= await design_editfetch_validation(req.body);
    if(error)return res.send(error.details[0].message)
    try{
    const ispresent = await Maindata.find({project : req.body.project,'details.partno' : req.body.partno},{details: { $elemMatch: { partno: req.body.partno } } })
    if(ispresent[0].details[0].designer_lock === false)return res.send(ispresent[0].details[0])
    else return res.send('The edit option is locked. Contact the Admin')}
    catch(err){ res.send('part not found')}
})

router.post('/update', async(req,res)=>{

    //validation of data
    const{error}= await design_edit_validation(req.body);
    if(error)return res.send(error.details[0].message)

    try{
        const ispresent = await Maindata.find({project : req.body.project,'details.partno' : req.body.partno},{details: { $elemMatch: { partno: req.body.partno } } })
        if(ispresent[0].details[0].designer_lock === true)return res.send('The edit option is locked. Contact the Admin')}      
        catch(err){ res.send('part not found')}
    
    //updation of data
    const updatedata = await Maindata.updateOne({project:req.body.project,'details.partno':req.body.partno},{

        '$set':{"details.$.description"        :req.body.description,         
                "details.$.quantity_ordered"   :req.body.quantity_ordered,
                "details.$.order_date"         :new Date().toString().replace(/T/, ' ').replace(/\..+/, ''),
                "details.$.designer_lock"      :req.body.designer_lock,
                }},{new : true}
    )
    
    if(updatedata)return res.send(updatedata)
    return res.send('error')
})

module.exports= router;



// {
//     "project":"k346",        
//     "partno"              :"k346-01-a01-03",      
//     "description"         :"stumps",     
//     "quantity_ordered"    :3,        
//     "order_date"          :"03/01/2020",
//     "designer_lock"       :false       

// }