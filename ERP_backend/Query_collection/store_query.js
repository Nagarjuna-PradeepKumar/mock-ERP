const router = require('express').Router();
const Maindata = require('../dbschemas/Product_schema')
const {store_query_history_validation} = require('../validation/store_query_history_validation')


router.post('/',async (req,res)=>{
    
///////////////////////////////////////////////////////////////////    //check if projectno is provided
    if(req.body.C_project){
/////////////////////////check details by projectno & partnumber 
        if(req.body.C_partno){        
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
            try{const aoob=[]
            await finddata.map(value=>{
                if(value.mydata){
                    aoob.push(...value.mydata)
                }
            })
            const availablearray= aoob.map(value=>value.quantity_available)
            const totalavailable = availablearray.reduce((a,b)=>a+b)
            if(finddata)return await res.send(totalavailable.toString())}
            catch(err){return res.send('No such Part Found')} 
 
       
        }

    
///////////////////////////////check details by projectno and description
        if(req.body.C_description){
            const finddata = await Maindata.aggregate([
                {'$match':{'project':req.body.project,'details.description':req.body.description}},
                {'$project':{
                'mydata':{
                    '$filter':{
                        'input':'$details',
                        'as':'det',
                        'cond':{ '$eq': [ "$$det.description", req.body.description ] }
                        }
                    },
                }}            
            ]) 

            //finding the total quantity
            try{const aoob=[]
            await finddata.map(value=>{
                if(value.mydata){
                    aoob.push(...value.mydata)
                }
            })
            const availablearray= aoob.map(value=>value.quantity_available)
            const totalavailable = availablearray.reduce((a,b)=>a+b)
            if(finddata)return await res.send(totalavailable.toString())}
            catch(err){return res.send('No such Part Found')}
     
        }
    }

//////////////////////////////////////////////////////////////////////////////////////Check in all data
    if(req.body.C_all){
////////////////////////////////////////////check details by partnumber 
         if(req.body.C_partno){            
            const finddata = await Maindata.aggregate([
                {'$match':{'details.partno':req.body.partno}},
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
            try{const aoob=[]
            await finddata.map(value=>{
                if(value.mydata){
                    aoob.push(...value.mydata)
                }
            })
            const availablearray= aoob.map(value=>value.quantity_available)
            const totalavailable = availablearray.reduce((a,b)=>a+b)
            if(finddata)return await res.send(totalavailable.toString())}
            catch(err){return res.send('No such Part Found')}        
        } 
              
//////////////////////////////////////////////////check details by all & description
        if(req.body.C_description){
            const finddata = await Maindata.aggregate([
                {'$match':{'details.description':req.body.description}},
                {'$project':{
                'mydata':{
                    '$filter':{
                        'input':'$details',
                        'as':'det',
                        'cond':{ '$eq': [ "$$det.description", req.body.description ] }
                        }
                    },
                }}            
            ])
            //finding the total quantity
            try{const aoob=[]
            await finddata.map(value=>{
                if(value.mydata){
                    aoob.push(...value.mydata)
                }
            })
            const availablearray= aoob.map(value=>value.quantity_available)
            const totalavailable = availablearray.reduce((a,b)=>a+b)
            if(finddata)return await res.send(totalavailable.toString())}
            catch(err){return res.send('No such Part Found')} 
        
        }

    }
})


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
                if(value.stores_history.length>0){
                    histaoob.push(value.stores_history)
                }
            })
        if(histaoob.length>0){finaldata=histaoob}else{finaldata="No history available"}
        if(finddata[0]._id)
        if(finddata)return await res.send(finaldata)
    }catch{return res.send('No such part available')}


})
module.exports=router;


// {
// 	"C_all":true,
// 	"C_partno":true,
// 	"partno":"k346-01-a01-01"	
// }

// {
// 	"C_all":true,
// 	"C_description":true,
// 	"description":"k346-01-a01-01"	
// }

// {
// 	"C_project":true,
// 	"C_partno":true,
// 	"project":"k346",
// 	"partno":"k346-01-a01-01"	
// }

// {
// 	"C_project":true,
// 	"C_description":true,
// 	"project":"k346",
// 	"description":"k346-01-a01-01"	
// }

// {
// 	"project":"k346",
// 	"partno":"k346-01-a01-01"	
// }
