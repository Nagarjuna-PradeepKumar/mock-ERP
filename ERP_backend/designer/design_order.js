const router = require('express').Router()
const Maindata = require('../dbschemas/Product_schema')
const {design_order_validation} = require('../validation/design_order_validation')

router.post('/',async (req,res)=>{
    //validation of data
    const{error}= await design_order_validation(req.body);
    if(error)return res.send(error.details[0].message)

    // //check project exist
    const projectexist = await Maindata.findOne({'project' : req.body.project})
    if(projectexist) {
        console.log('project exist ')
        //check already that partnumber exist
        const partnoexist = await Maindata.findOne({'details.partno' : req.body.details[0].partno})
        if(partnoexist)return res.send("Part already exist. Try update instead")

        const updateitem = await Maindata.findOneAndUpdate({project : req.body.project}, {$push : {details : {
            partno              :req.body.details[0].partno,            
            description         :req.body.details[0].description,
            quantity_ordered    :req.body.details[0].quantity_ordered,
            order_date          :new Date().toString().replace(/T/, ' ').replace(/\..+/, ''),
            designer_lock       :req.body.details[0].designer_lock,            
             
        }}})
        if(updateitem)return res.send('added to list')    
    }
    else{
        const data =await new Maindata({
            project : req.body.project,
             details:[
            {
                partno              :req.body.details[0].partno,            
                description         :req.body.details[0].description,
                quantity_ordered    :req.body.details[0].quantity_ordered,
                order_date          :new Date().toString().replace(/T/, ' ').replace(/\..+/, ''),
                designer_lock       :req.body.details[0].designer_lock,          

            }    
        ]
        })
        try{
        const savedUser= await data.save();
        res.send("new project data created")
        }catch(err){
        res.send(err)
        }
    }
   
})

module.exports = router;





// {
//     "project":"k346",
//     "details":[
//         {
//             "partno"              :"k346-01-a01-01",      
//             "description"         :"ball",     
//             "quantity_ordered"    :10,        
//             "order_date"          :"01/01/2020",
//             "designer_lock"       :true       
//         }

//     ]
// }