const express = require('express')
const app = express()
const mongoose= require ('mongoose')
const dotenv = require('dotenv')
var cors = require('cors')
dotenv.config();

//database middleware
mongoose.set('useFindAndModify', false);
// middleware cors
app.use(cors());
//using bodyparser
app.use(express.json())

//import route files
const signup = require('./signup/signuproute')
const login = require('./login/loginroute')
const designorder= require('./designer/design_order')
const designedit= require('./designer/design_edit')
const storeindowd = require('./store/store_inward_outward')
const storeedit = require('./store/store_edit')
const qualityentry = require('./quality/quality_entry')
const storequery = require('./Query_collection/store_query')
const qualityquery = require('./Query_collection/quality_query')

//route page middleware
app.use('/signup',signup)
app.use('/login',login)
app.use('/designer/order',designorder)
app.use('/designer/edit',designedit)
app.use('/store',storeindowd)
app.use('/store/edit',storeedit)
app.use('/quality/entry',qualityentry)
app.use('/store/query',storequery)
app.use('/quality/query',qualityquery)

//connecting to database
mongoose.connect(process.env.data_connection_string,
    { useNewUrlParser: true, useUnifiedTopology: true },
    ()=>console.log('connected to database'))

// creating a server
app.listen(5000,()=>console.log('server is started at port 5000'))