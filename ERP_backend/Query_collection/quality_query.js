const router = require('express').Router();
const Maindata = require('../dbschemas/Product_schema')
const {store_query_history_validation} = require('../validation/store_query_history_validation')

router.post('/history',async (req,res)=>{
    //store entry validation
    const {error} = await store_query_history_validation(req.body)
    if(error) return res.send(error.details[0].message)
    try{
        //finding the history of data
            const finddata = await Maindata.aggregate([
            {'$match':{'project':req.body.project,'details.partno':req.body.partno}},
            {'$project':{
            'mydata':{
                '$filter':{
                    'input':'$details',
                    'as':'det',
                    'cond':{ '$eq': [ "$$det.partno", req.body.partno ] }
                    }
                },
            }}            
        ])

        //finding the total quantity
        const aoob=[]
            await finddata.map(value=>{
                if(value.mydata){
                    aoob.push(...value.mydata)
                }
            })
        const histaoob =[]
            await aoob.map(value=>{
                if(value.inspection_details.length>0){
                    histaoob.push(value.inspection_details)
                }
            })
        if(histaoob.length>0){finaldata=histaoob}else{finaldata="No history available"}
        if(finddata[0]._id)
        if(finddata)return await res.send(finaldata)
    }catch{return res.send('No such part available')}


})



module.exports=router;


