import React, { Component } from 'react';
import{Redirect} from 'react-router-dom'
import axios from 'axios'
import './quality.css';
import logoutimg from './images/logout.png'
import logo from './images/logo.png'


class Quality extends Component{
  //////////////////////////////////////////////////CONSTRUCTOR/////////////////////////////////
  constructor(){
    super()
    this.state={
      loginfo:sessionStorage.getItem('logininfo'),
      currentstatus:"newentry",
      showhistory:false,
      histdata:[],
      ////
      entry_project:"",
      entry_partno:"",
      entry_date:"",
      entry_quantityinspected:"",
      entry_inspectiondetails:"",
      entry_qualitylock:false,
      /////
      hist_partno:"",
      hist_project:"",
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

  datafetchbuttonhandler=()=>{
    //fetchdata here with async and set state that
    this.setState({
      showhistory:true,
    })
  }
  //////////////////--------------------POST AXIOS------HANDLERS----------//////////////////////
  submitdetails=(e)=>{
    e.preventDefault()
  axios.post('http://192.168.43.37:5000/quality/entry',
    { project                 : this.state.entry_project,
      partno                  : this.state.entry_partno,
      inspected_quantity      : this.state.entry_quantityinspected,
      date                    : this.state.entry_date,
      inspec_details          : this.state.entry_inspectiondetails,
      quality_lock            : this.state.entry_qualitylock,
  }).then(Response=>alert(Response.data)).catch(Error=>alert(Error))
}
 submithistoryfetch=(e)=>{
  e.preventDefault()
 axios.post('http://192.168.43.37:5000/quality/query/history',{
 project:this.state.hist_project,partno:this.state.hist_partno}
 ).then(Response=>{if(Array.isArray(Response.data)){this.setState({histdata:Response.data[0]});this.datafetchbuttonhandler()}else alert(Response.data)}).catch(Error=>alert(Error))
 }
  ///////////////////-----------DATA MAP AFTER FETCHING--------------/////////////////////
  datafetchandmap=()=>{
       return this.state.histdata.map((items,i)=>(
          <table className="datatable" key={i}>
            <tbody>
          <tr><td className="tableleft">date:</td><td>{items.date}</td></tr>
          <tr><td className="tableleft">inspection details :</td><td>{items.inspec_details}</td></tr></tbody>
          </table>       
       
       ))
  }
  
  //////////////////-------------------------- ALL POSSIBLE HISTORY--QUERIES------------------/////////////
  historycheckfunc=()=>{
    // CHECK IN REQUIRED PROJECT BY PARTNUMBER
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
  ///////////-----------------------------------RENDER FOR NEW ENTRY------------------------
    if(this.state.currentstatus==='newentry')
    return(
        <form className="entryandrequest" onSubmit={this.submitdetails}>
          <fieldset className="formhead"> 
          <legend>material request:</legend>
          <div><label>project</label><input className="textfield"               type="text"     name="entry_project"              value={this.state.entry_project}       onChange={this.inputhandler} autocorrect="off" autocapitalize="none" autocomplete="off"/></div>
          <div><label>part number</label><input className="textfield"           type="text"     name="entry_partno"               value={this.state.entry_partno}        onChange={this.inputhandler} autocorrect="off" autocapitalize="none" autocomplete="off"/></div>
          <div><label>inspected OK quantity</label><input className="textfield" type="number"   name="entry_quantityinspected"    value={this.state.entry_quantityinspected}       onChange={this.inputhandler} autocorrect="off" autocapitalize="none" autocomplete="off"/></div>
          <div><label>date</label><input className="textfield"                  type="date"     name="entry_date"                 value={this.state.entry_date}          onChange={this.inputhandler} autocorrect="off" autocapitalize="none" autocomplete="off"/></div>
          <div><label>inspection details</label><input className="textfield"    type="text"     name="entry_inspectiondetails"    value={this.state.entry_inspectiondetails} onChange={this.inputhandler} autocorrect="off" autocapitalize="none" autocomplete="off"/></div>
          <div><label>lock data</label><input className="chkbox"                type="checkbox" name="entry_qualitylock"      checked={this.state.entry_qualitylock} onChange={this.checkboxhandler} /></div>
          <div className="subclear"><input type="submit" value="submit" className="but"/> <input type="reset" value="reset" className="but" onClick={this.resethandler}/></div>
          </fieldset>
        </form>
    )
  ///////////////////-----------------------------RENDER FOR HISTORY CHECK---------------//////////////
  if(this.state.currentstatus==='history')
  return(
    <div className="stockmain">
      <div className="stockcheck">
        {/* <div className="selector">
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
        </div> */}
        {this.historycheckfunc()}
      </div>
      {this.state.showhistory?this.datafetchandmap():null}
    </div>
  )

  }
  ////////////////////////////////------------------MAIN RENDER FUNCTION------------------/////////////////////////
  
  render(){
    if(this.state.loginfo==='quality'){
      return (
        <div className="maincontainer">
          <div className="navbar">
            <div className="logo">
              <img src={logo} alt="logo"/>
            </div>
            <div className="navlinks">
              <button className="link" name="newentry" onClick={this.modechange}>Quality entry</button>
              <button className="link" name="history" onClick={this.modechange}>Check history</button>
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

export default Quality;

