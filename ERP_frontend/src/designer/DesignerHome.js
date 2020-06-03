import React, { Component } from 'react';
import{Redirect} from 'react-router-dom'
import axios from 'axios'
import './designer.css';
import logoutimg from './images/logout.png'
import logo from './images/logo.png'


class DesignerHome extends Component{
  //////////////////////////////////////////////////CONSTRUCTOR/////////////////////////////////
  constructor(){
    super()
    this.state={
      loginfo:sessionStorage.getItem('logininfo'),
      currentstatus:"order",
      ////
      entry_partno:"",
      entry_project:"",
      entry_description:"",
      entry_orderquantity:"",
      entry_deslock:false,
      /////
      edit_partno:"",
      edit_project:"",
      edit_description:"",
      edit_orderquantity:"",
      edit_deslock:false,
      /////
      fetch_partno:"",
      fetch_project:"",
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
      entry_description:"",
      entry_orderquantity:"",
      entry_deslock:false,
      /////
      edit_partno:"",
      edit_project:"",
      edit_description:"",
      edit_orderquantity:"",
      edit_deslock:false,
      /////
      fetch_partno:"",
      fetch_project:"",
    })
  }

///////////////////////////////////////////TOGGLE BETWEEN THE TOP NAV BARS//////////
  modechange=(e)=>{
    this.setState({
      currentstatus:e.target.name,
    })}
  //////////////////--------------------POST AXIOS------HANDLERS----------//////////////////////
  submitedit=(e)=>{
    e.preventDefault()
    axios.post('http://192.168.43.37:5000/designer/edit/update',
    {
      "project"            :this.state.edit_project,        
      "partno"             :this.state.edit_partno,      
      "description"       :this.state.edit_description,
      "quantity_ordered"   :this.state.edit_orderquantity,
      "designer_lock"     :this.state.edit_deslock}).then(Response=>{
        if(Response.data.nModified>=1){alert('modified successfully')}else alert(Response.data)
      }).catch(Error=>alert(Error))
   }
  submitorder=(e)=>{
   e.preventDefault()
   axios.post('http://192.168.43.37:5000/designer/order',
   {
    "project":this.state.entry_project,
    "details":[
        {
            "partno"              :this.state.entry_partno,      
            "description"         :this.state.entry_description,     
            "quantity_ordered"    :this.state.entry_orderquantity,        
            "designer_lock"       :this.state.entry_deslock     
        }
    ]
  }).then(Response=>{if(Response.data._message){alert(`${Response.data._message}, please check your data`)}else alert(Response.data)}).catch(Error=>alert(Error))
 }
 fetchdata=(e)=>{
  e.preventDefault()
  axios.post('http://192.168.43.37:5000/designer/edit/fetch',
  {
   "project"  :this.state.fetch_project,        
   "partno"   :this.state.fetch_partno}).then(Response=>{
     if(Response.data.partno){this.setState({ 
     edit_partno:Response.data.partno,
     edit_project:this.state.fetch_project,
     edit_description:Response.data.description,
     edit_orderquantity:Response.data.quantity_ordered,
     edit_deslock:false,});alert('fetched the data click on edit order to view data')}else alert(Response.data)
   }).catch(Error=>alert(Error))
}

 //////////////////-----------------------RENDER WHAT IS NEEDED BASED ON TOP BUTTONS-----------------///////////

  returnrender=()=>{
  ///////////-----------------------------------RENDER FOR ORDER----------------------////////////////////
  if(this.state.currentstatus==='order')
  return(
      <form className="entryandrequest" onSubmit={this.submitorder}>
      <fieldset className="formhead">
        <legend>new order:</legend>
        <div><label>project</label><input className="textfield"           type="text"   name="entry_project"          value={this.state.entry_project} onChange={this.inputhandler} required autocorrect="off" autocapitalize="none" autocomplete="off"/></div>
        <div><label>part number</label><input className="textfield"       type="text"   name="entry_partno"           value={this.state.entry_partno}  onChange={this.inputhandler} required autocorrect="off" autocapitalize="none" autocomplete="off"/></div>
        <div><label>description</label><input className="textfield"     type="text"   name="entry_description"             value={this.state.entry_description}    onChange={this.inputhandler} required autocorrect="off" autocapitalize="none" autocomplete="off"/></div>
        <div><label>order quantity</label><input className="textfield" type="number" name="entry_orderquantity" value={this.state.entry_orderquantity} onChange={this.inputhandler} required autocorrect="off" autocapitalize="none" autocomplete="off"/></div>
        <div><label>lock data</label><input className="chkbox" type="checkbox" name="entry_deslock"checked={this.state.entry_deslock} onChange={this.checkboxhandler}/></div>
        <div className="subclear"><input type="submit" value="submit" className="but"/> <input type="reset" value="reset" className="but" onClick={this.resethandler}/></div>
        </fieldset>
      </form>
  )
  ///////////-----------------------------------RENDER FETCH ENTRY----------------------////////////////////
  if(this.state.currentstatus==='fetch')
  return(
      <form className="entryandrequest" onSubmit={this.fetchdata}>
      <fieldset className="formhead">
        <legend>Fetch form:</legend>
        <div><label>project</label><input className="textfield"           type="text"   name="fetch_project"          value={this.state.fetch_project} onChange={this.inputhandler} autocorrect="off" autocapitalize="none" autocomplete="off"/></div>
        <div><label>part number</label><input className="textfield"       type="text"   name="fetch_partno"           value={this.state.fetch_partno}  onChange={this.inputhandler} autocorrect="off" autocapitalize="none" autocomplete="off"/></div>
        <div className="subclear"><input type="submit" value="fetch" className="but"/> <input type="reset" value="reset" className="but" onClick={this.resethandler}/></div>
        </fieldset>
      </form>
  )
  ///////////-----------------------------------RENDER FOR EDIT---------------------------////////////////////
    if(this.state.currentstatus==='edit')
    return(
        <form className="entryandrequest" onSubmit={this.submitedit}>
          <fieldset className="formhead"> 
          <legend>edit order data:</legend>
          <div><label>project</label><input className="textfield"         type="text"     name="edit_project"        value={this.state.edit_project} onChange={this.inputhandler} autocorrect="off" autocapitalize="none" autocomplete="off"/></div>
          <div><label>part number</label><input className="textfield"     type="text"     name="edit_partno"         value={this.state.edit_partno} onChange={this.inputhandler} autocorrect="off" autocapitalize="none" autocomplete="off"/></div>
          <div><label>description</label><input className="textfield"     type="text"     name="edit_description"    value={this.state.edit_description} onChange={this.inputhandler} autocorrect="off" autocapitalize="none" autocomplete="off"/></div>
          <div><label>order quantity</label><input className="textfield"  type="number"     name="edit_orderquantity"  value={this.state.edit_orderquantity} onChange={this.inputhandler} autocorrect="off" autocapitalize="none" autocomplete="off"/></div>
          <div><label>lock data</label><input className="chkbox"          type="checkbox" name="edit_deslock"      checked={this.state.edit_deslock} onChange={this.checkboxhandler} autocorrect="off" autocapitalize="none" autocomplete="off"/></div>
          <div className="subclear"><input type="submit" value="submit" className="but"/> <input type="reset" value="reset" className="but" onClick={this.resethandler}/></div>
          </fieldset>
        </form>
    )

  }
  ////////////////////////////////------------------MAIN RENDER FUNCTION------------------/////////////////////////
  
  render(){
    if(this.state.loginfo==='designer'){
      return (
        <div className="maincontainer">
          <div className="navbar">
            <div className="logo">
              <img src={logo} alt="logo"/>
            </div>
            <div className="navlinks">
              <button className="link" name="order" onClick={this.modechange}>New order</button>
              <button className="link" name="fetch" onClick={this.modechange}>fetchdata</button>
              <button className="link" name="edit" onClick={this.modechange}>Edit order</button>
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

export default DesignerHome;

