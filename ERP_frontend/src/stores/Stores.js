import React, { Component } from 'react';
import{Redirect} from 'react-router-dom'
import axios from 'axios'
import './stores.css';
import logoutimg from './images/logout.png'
import logo from './images/logo.png'


class Stores extends Component{
  //////////////////////////////////////////////////CONSTRUCTOR/////////////////////////////////
  constructor(){
    super()
    this.state={
      loginfo:sessionStorage.getItem('logininfo'),
      currentstatus:"newentry",
      searchin:"project",
      searchby:"partnumber",
      showhistory:false,
      availablequantity:"",
      ////
      entry_partno:"",
      entry_project:"",
      entry_date:"",
      entry_quantityreceived:"",
      entry_storelock:false,
      /////
      mrn_partno:"",
      mrn_project:"",
      mrn_takenby:"",
      mrn_date:"",
      mrn_takenquantity:"",
      mrn_storelock:false,
      /////
      check_partno:"",
      check_project:"",
      check_description:"",
      /////
      hist_partno:"",
      hist_project:"",
      hist_description:"",
      showhistory:false,
      histdata:[],
    }
  }
  ////////////////////////////////////LOGOUT HANDLER/////////////////////////////////////
  logouthandler=async()=>{
    await sessionStorage.clear('logininfo')
    await this.setState({loginfo:false})
  }
////////////////////////////////////INPUT HANDLERS////////////////////////////////////////
  inputhandler=(e)=>{
    this.setState({
      [e.target.name]:e.target.value
    })
  }
  checkboxhandler=(e)=>{
    this.setState({
      [e.target.name]:e.target.checked
    })
  }
  resethandler=(e)=>{
    this.setState({
      entry_partno:"",
      entry_project:"",
      entry_date:"",
      entry_quantityreceived:"",
      entry_storelock:false,
      /////
      mrn_partno:"",
      mrn_project:"",
      mrn_takenby:"",
      mrn_date:"",
      mrn_takenquantity:"",
      mrn_storelock:false,
      /////
      check_partno:"",
      check_project:"",
      check_description:"",
      /////
      hist_partno:"",
      hist_project:"",
      hist_description:"",
      showhistory:false,
    })
  }

///////////////////////////////////////////TOGGLE BETWEEN THE STOCK CHECK RADIO BUTTONS//////////
  modechange=(e)=>{
    this.setState({
      currentstatus:e.target.name,
    })}
    histmodechange=(e)=>{
      this.setState({
        currentstatus:e.target.name,
        searchby:"partnumber",
        searchin:"project"
      })  
    }
  searchinhandler=(e)=>{
    this.setState({
      searchin : e.target.name
    })
  }
  ////////////////////////////////////////SEARCH BY TOGGLE RADIO BUTTON////////////////////
  searchbyhandler=(e)=>{
    this.setState({
      searchby : e.target.name
    })
  }

  datafetchbuttonhandler=()=>{
    //fetchdata here with async and set state that
    this.setState({
      showhistory:true,
    })
  }
  //////////////////--------------------POST AXIOS------HANDLERS----------//////////////////////
  submitmrn=(e)=>{
    e.preventDefault()
    axios.post('http://localhost:5000/store/mrn',
    {"project":this.state.mrn_project,
    "partno":this.state.mrn_partno,
    "taken_date":this.state.mrn_date,
    "takenby":this.state.mrn_takenby,
    "taken_quantity":this.state.mrn_takenquantity,
    "store_lock":this.state.mrn_storelock}).then(Response=>alert(Response.data)).catch(Error=>alert(Error));
  }
  submitnewenrty=(e)=>{
   e.preventDefault()
   axios.post('http://localhost:5000/store/entry',
   {
    "project"             :this.state.entry_project,        
    "partno"              :this.state.entry_partno,      
    "received_date"       :this.state.entry_date,
    "quantity_received"   :this.state.entry_quantityreceived,
    "store_lock"          :this.state.entry_storelock}).then(Response=>alert(Response.data)).catch(Error=>alert(Error))
 }
 submitavailcheck=(e)=>{
  e.preventDefault()
  ///all-----and------partnumber
  if(this.state.searchin==="all"&& this.state.searchby==="partnumber"){
    axios.post('http://localhost:5000/store/query',{
      "C_all":true,
      "C_partno":true,
      "partno":this.state.check_partno,	
    }).then(Response=>{if(typeof Response.data==='number'){this.setState({availablequantity:Response.data})}else alert(Response.data)}).catch(Error=>alert(Error))
  }
  ///all-----and------description
  if(this.state.searchin==="all"&& this.state.searchby==="description"){
    axios.post('http://localhost:5000/store/query',{
      "C_all":true,
      "C_description":true,
      "description":this.state.check_description,	
    }).then(Response=>{if(typeof Response.data==='number'){this.setState({availablequantity:Response.data})}else alert(Response.data)}).catch(Error=>alert(Error))
  }
  ///project-----and------partnumber
  if(this.state.searchin==="project"&& this.state.searchby==="partnumber"){
    axios.post('http://localhost:5000/store/query',{
      "C_project":true,
      "C_partno":true,
      "project":this.state.check_project,
      "partno":this.state.check_partno,	
    }).then(Response=>{if(typeof Response.data==='number'){this.setState({availablequantity:Response.data})}else alert(Response.data)}).catch(Error=>alert(Error))
  }
  if(this.state.searchin==="project"&& this.state.searchby==="description"){
    axios.post('http://localhost:5000/store/query',{
      "C_project":true,
      "C_description":true,
      "project":this.state.check_project,
      "description":this.state.check_description,	
    }).then(Response=>{if(typeof Response.data==='number'){this.setState({availablequantity:Response.data})}else alert(Response.data)}).catch(Error=>alert(Error))
  }
 }
 submithistoryfetch=(e)=>{
  e.preventDefault()
 axios.post('http://localhost:5000/store/query/history',{
 project:this.state.hist_project,partno:this.state.hist_partno}
 ).then(Response=>{if(Array.isArray(Response.data)){this.setState({histdata:Response.data});this.datafetchbuttonhandler()}else alert(Response.data)}).catch(Error=>alert(Error))
 }
  ///////////////////-----------DATA MAP AFTER FETCHING--------------/////////////////////
  datafetchandmap=()=>{
       return this.state.histdata[0].map((items)=>(
         (items.quantity_arrived)?
          <table className="datatable">
            <tbody>
          <tr><td className="tableleft">date arrived :</td><td>{items.date}</td></tr>
          <tr><td className="tableleft">quantity arrived :</td><td>{items.quantity_arrived}</td></tr></tbody>
          </table>:         
         (items.takenby)?
          <table className="datatable"><tbody>
          <tr><td className="tableleft">date taken :</td><td>{items.date}</td></tr>
          <tr><td className="tableleft">quantity taken :</td><td>{items.taken_quantity}</td></tr>
          <tr><td className="tableleft">taken by :</td><td>{items.takenby}</td></tr></tbody>
          </table>:null        
       ))
  }
  
  //////////////////-------------------------- ALL POSSIBLE FETCH QUERIES------------------/////////////
  stockcheckfunc=()=>{
    // CHECK IN ALL PROJECT BY PART NUMBER
    if((this.state.searchin==="all") && (this.state.searchby==="partnumber"))
    return(
      <form className="stockcheckinput" onSubmit={this.submitavailcheck}>
        <legend>search in all project by part number:</legend>
        <label>part number : </label><input className="textfield2" type="text" name="check_partno" value={this.state.check_partno} onChange={this.inputhandler} autocorrect="off" autocapitalize="none" autocomplete="off"/>
        <input type="submit" value="submit" className="butt"/><input type="reset"  className="butt" onClick={this.resethandler}/>
      </form>
  
    )
    // CHECK IN ALL PROJECT BY DESCRIPTION
    if((this.state.searchin==="all") && (this.state.searchby==="description"))
    return(

      <form className="stockcheckinput" onSubmit={this.submitavailcheck}>
        <legend>search in all project by description:</legend>
         <label>description : </label><input className="textfield2" type="text" name="check_description" value={this.state.check_description} onChange={this.inputhandler} autocorrect="off" autocapitalize="none" autocomplete="off"/>
        <input type="submit" value="submit" className="butt"/> <input type="reset" className="butt" onClick={this.resethandler}/>
      </form>
    )
    // CHECK IN REQUIRED PROJECT BY PARTNUMBER
    if((this.state.searchin==="project") && (this.state.searchby==="partnumber"))
    return(
      <form className="stockcheckinput" onSubmit={this.submitavailcheck}>
        <legend>search in required project by part number:</legend>
        <label>project : </label><input className="textfield2" type="text" name="check_project" value={this.state.check_project} onChange={this.inputhandler} autocorrect="off" autocapitalize="none" autocomplete="off"/>
        <label>part number : </label><input className="textfield2" type="text" name="check_partno" value={this.state.check_partno} onChange={this.inputhandler} autocorrect="off" autocapitalize="none" autocomplete="off"/>
        <input type="submit" value="submit" className="butt"/> <input type="reset" className="butt" onClick={this.resethandler}/>
      </form>
    )
    // CHECK IN REQUIRED PROJECT BY DESCRIPTION
    if((this.state.searchin==="project") && (this.state.searchby==="description"))
    return(

      <form className="stockcheckinput" onSubmit={this.submitavailcheck}>
        <legend>search in required project by description:</legend>
        <label>project : </label><input className="textfield2" type="text" name="check_project" value={this.state.check_project} onChange={this.inputhandler} autocorrect="off" autocapitalize="none" autocomplete="off"/>
        <label>description : </label><input className="textfield2" type="text" name="check_description" value={this.state.check_description} onChange={this.inputhandler} autocorrect="off" autocapitalize="none" autocomplete="off"/>
        <input type="submit" value="submit" className="butt"/> <input type="reset" className="butt" onClick={this.resethandler}/>
      </form>
    )
  }
  //////////////////-------------------------- ALL POSSIBLE HISTORY--QUERIES------------------/////////////
  historycheckfunc=()=>{
    // CHECK IN REQUIRED PROJECT BY PARTNUMBER
    if((this.state.searchin==="project") && (this.state.searchby==="partnumber"))
    return(
      <form className="stockcheckinput" onSubmit={this.submithistoryfetch}>
        <legend>search in required project by part number:</legend>
        <label>project : </label><input className="textfield2" type="text" name="hist_project" value={this.state.hist_project} onChange={this.inputhandler} autocorrect="off" autocapitalize="none" autocomplete="off"/>
        <label>part number : </label><input className="textfield2" type="text" name="hist_partno" value={this.state.hist_partno} onChange={this.inputhandler} autocorrect="off" autocapitalize="none" autocomplete="off"/>
        <input type="submit" value="submit" className="butt"/> <input type="reset" className="butt" onClick={this.resethandler}/>
      </form>
    )
  }

  //////////////////-----------------------RENDER WHAT IS NEEDED BASED ON TOP BUTTONS-----------------///////////

  returnrender=()=>{
  ///////////-----------------------------------RENDER FOR MRN----------
    if(this.state.currentstatus==='mrn')
    return(
        <form className="entryandrequest" onSubmit={this.submitmrn}>
          <fieldset className="formhead"> 
          <legend>material request:</legend>
          <div><label>project</label><input className="textfield"         type="text"     name="mrn_project"        value={this.state.mrn_project} onChange={this.inputhandler} autocorrect="off" autocapitalize="none" autocomplete="off"/></div>
          <div><label>part number</label><input className="textfield"     type="text"     name="mrn_partno"         value={this.state.mrn_partno} onChange={this.inputhandler} autocorrect="off" autocapitalize="none" autocomplete="off"/></div>
          <div><label>taken by</label><input className="textfield"        type="text"     name="mrn_takenby"        value={this.state.mrn_takenby} onChange={this.inputhandler} autocorrect="off" autocapitalize="none" autocomplete="off"/></div>
          <div><label>taken date</label><input className="textfield"      type="date"     name="mrn_date"           value={this.state.mrn_date} onChange={this.inputhandler} autocorrect="off" autocapitalize="none" autocomplete="off"/></div>
          <div><label>taken quantity</label><input className="textfield"  type="number"   name="mrn_takenquantity"  value={this.state.mrn_takenquantity} onChange={this.inputhandler} autocorrect="off" autocapitalize="none" autocomplete="off"/></div>
          <div><label>store lock</label><input className="chkbox"         type="checkbox" name="mrn_storelock"      checked={this.state.mrn_storelock} onChange={this.checkboxhandler}/></div>
          <div className="subclear"><input type="submit" value="submit" className="but"/> <input type="reset" value="reset" className="but" onClick={this.resethandler}/></div>
          </fieldset>
        </form>
    )
  ///////////-----------------------------------RENDER FOR NEW ENTRY----------------------////////////////////
    if(this.state.currentstatus==='newentry')
    return(
        <form className="entryandrequest" onSubmit={this.submitnewenrty}>
        <fieldset className="formhead">
          <legend>Stock entry:</legend>
          <div><label>project</label><input className="textfield"           type="text"   name="entry_project"          value={this.state.entry_project} onChange={this.inputhandler} autocorrect="off" autocapitalize="none" autocomplete="off"/></div>
          <div><label>part number</label><input className="textfield"       type="text"   name="entry_partno"           value={this.state.entry_partno}  onChange={this.inputhandler} autocorrect="off" autocapitalize="none" autocomplete="off"/></div>
          <div><label>received date</label><input className="textfield"     type="date"   name="entry_date"             value={this.state.entry_date}    onChange={this.inputhandler} autocorrect="off" autocapitalize="none" autocomplete="off"/></div>
          <div><label>quantity received</label><input className="textfield" type="number" name="entry_quantityreceived" value={this.state.entry_quantityreceived} onChange={this.inputhandler} autocorrect="off" autocapitalize="none" autocomplete="off"/></div>
          <div><label>store lock</label><input className="chkbox" type="checkbox" name="entry_storelock"checked={this.state.entry_storelock} onChange={this.checkboxhandler}/></div>
          <div className="subclear"><input type="submit" value="submit" className="but"/> <input type="reset" value="reset" className="but" onClick={this.resethandler}/></div>
          </fieldset>
        </form>
    )
///////////////////-----------------------------RENDER FOR STOCK CHECK---------------//////////////
    if(this.state.currentstatus==='stockcheck')
    return(
      <div className="stockmain">
        <div className="stockcheck">
          <div className="selector">
            <form>
              <fieldset className="radioselector">
              <legend>Stock entry:</legend>
              <input type="radio" value="" checked={this.state.searchin==="project"} onChange={this.searchinhandler} name="project"/>Specific project
              <input type="radio" value="" checked={this.state.searchin==="all"} onChange={this.searchinhandler} name="all"/>All projects
              </fieldset>
            </form>
            <form>
              <fieldset className="radioselector">
              <legend>Stock entry:</legend>
              <input type="radio" value="" checked={this.state.searchby==="partnumber"} onChange={this.searchbyhandler} name="partnumber"/>part number
              <input type="radio" value="" checked={this.state.searchby==="description"} onChange={this.searchbyhandler} name="description"/>description
              </fieldset>
            </form>    
          </div>
          {this.stockcheckfunc()}
        </div>
       <h1>Available quantity :{this.state.availablequantity} </h1>
      </div>
    )
  ///////////////////-----------------------------RENDER FOR STOCK CHECK---------------//////////////
  if(this.state.currentstatus==='history')
  return(
    <div className="stockmain">
      <div className="stockcheck">
        <div className="selector">
          <form>
            <fieldset className="radioselector">
            <legend>Stock entry:</legend>
            <input type="radio" value="" checked={this.state.searchin==="project"} onChange={this.searchinhandler} name="project"/>Specific project
            </fieldset>
          </form>
          <form>
            <fieldset className="radioselector">
            <legend>Stock entry:</legend>
            <input type="radio" value="" checked={this.state.searchby==="partnumber"} onChange={this.searchbyhandler} name="partnumber"/>part number
            </fieldset>
          </form>    
        </div>
        {this.historycheckfunc()}
      </div>
      {this.state.showhistory?this.datafetchandmap():null}
    </div>
  )

  }
  ////////////////////////////////------------------MAIN RENDER FUNCTION------------------/////////////////////////
  
  render(){
    if(this.state.loginfo==='stores'){
      return (
        <div className="maincontainer">
          <div className="navbar">
            <div className="logo">
              <img src={logo} alt="logo"/>
            </div>
            <div className="navlinks">
              <button className="link" name="newentry" onClick={this.modechange}>New entry</button>
              <button className="link" name="mrn" onClick={this.modechange}>Material request</button>
              <button className="link"name="stockcheck" onClick={this.modechange}>Stock check</button>
              <button className="link"name="history" onClick={this.histmodechange}>History</button>
            </div>
            <div className="logouticon">
              <a href="#">
                <img src={logoutimg} alt="logout" onClick={this.logouthandler}/>
              </a>
            </div>
          </div>
          <div className="mainpane">      
          {this.returnrender()} 
          </div>
          <div className="footer"></div>
        </div>
      );
    }else return <Redirect to="/"/>
  }
}

export default Stores;

