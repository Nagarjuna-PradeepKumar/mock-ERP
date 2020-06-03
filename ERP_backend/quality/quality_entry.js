const express= require('express')
const Maindata = require('../dbschemas/Product_schema')
const router = require('express').Router()
const {quality_entry_validation} = require('../validation/quality_entry_validation')


router.post('/',async (req,res)=>{

//using design fetch validation as they are same entries
   
    try{
        const ispresent = await Maindata.find({project : req.body.project,'details.partno' : req.body.partno},{details: { $elemMatch: { partno: req.body.partno } } })
        if((parseInt(ispresent[0].details[0].inspected_quantity) + parseInt(req.body.inspected_quantity)) > parseInt(ispresent[0].details[0].quantity_available))return res.send('Check your quantity.')     
        //First time entry
        if(ispresent[0].details[0].inspection_start_date ==="null" && ispresent[0].details[0].quality_lock ===false){
            //Date setting
            if(!req.body.date)(entryDate = Date().toString().replace(/T/, ' ').replace(/\..+/, ''))
            else(entryDate=req.body.date)
           
            //quality entry validation
            const {error} = await quality_entry_validation(req.body)
            if(error) return res.send(error.details[0].message)


            //automatic setting of inspection status
            const setting = await Maindata.find({project : req.body.project,'details.partno' : req.body.partno},{details: { $elemMatch: { partno: req.body.partno } } })
            if((setting[0].details[0].inspected_quantity+req.body.inspected_quantity)>=(setting[0].details[0].quantity_ordered)){
                inspection_status = true}
            else{
                inspection_status = false
            }

 
            //find and update the data
            const updateitem = await Maindata.findOneAndUpdate({project : req.body.project,'details.partno' : req.body.partno },
            {'$inc':{'details.$.inspected_quantity': +req.body.inspected_quantity},
            '$set':{"details.$.inspection_start_date" :entryDate,         
            "details.$.inspection_status"              :inspection_status,
            "details.$.quality_lock"                   :req.body.quality_lock,
            },  
            '$push' : {'details.$.inspection_details': {date:entryDate,inspec_details:req.body.inspec_details,}}})
            if(updateitem)return res.send('created an inspection record and added')
            return res.send('error')
        }


        // Next time entry

        if(ispresent[0].details[0].inspection_start_date !=="null" && ispresent[0].details[0].quality_lock ===false){
            if((parseInt(ispresent[0].details[0].inspected_quantity) + parseInt(req.body.inspected_quantity)) > parseInt(ispresent[0].details[0].quantity_available))return res.send('you cannot enter more than received')     
            //Date setting
            if(!req.body.date)(entryDate = Date().toString().replace(/T/, ' ').replace(/\..+/, ''))
            else(entryDate=req.body.date)
            
            //quality entry validation
            const {error} = await quality_entry_validation(req.body)
            if(error) return res.send(error.details[0].message)

            //automatic setting of inspection status
            const setting = await Maindata.find({project : req.body.project,'details.partno' : req.body.partno},{details: { $elemMatch: { partno: req.body.partno } } })
            if(((setting[0].details[0].inspected_quantity)+req.body.inspected_quantity)>=(setting[0].details[0].quantity_ordered)){
                inspection_status = true
            }
            else{
                inspection_status = false
            }

            //find and update the data
            const updateitem = await Maindata.findOneAndUpdate({project : req.body.project,'details.partno' : req.body.partno },
            {'$inc':{'details.$.inspected_quantity': +req.body.inspected_quantity},
            '$set':{    
            "details.$.inspection_status"              :inspection_status,
            "details.$.quality_lock"                   :req.body.quality_lock,
            },  
            '$push' : {'details.$.inspection_details': {date:entryDate,inspec_details:req.body.inspec_details,}}})
            if(updateitem)return res.send('added to inspection history')
            return res.send('error')
        }
        else return res.send('The inspection for this Item is locked. To unlock contact Admin')
    }
    catch(err){ return res.send('part not found')}

}) 
module.exports=router

// {
//     "project": "k346",
//     "partno": "k346-01-a01-01",
//     "inspected_quantity": 5,
//     "date": "22/11/2020",
//     "inspec_details": "asdadss",
//     "quality_lock": "false"
// }