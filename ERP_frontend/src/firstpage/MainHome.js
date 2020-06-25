import React,{Component} from 'react';
import {connect} from 'react-redux'
import{Redirect} from 'react-router-dom'
import {Login} from '../actions'
import axios from 'axios'
import signin from './images/signin.png'
import{Link} from 'react-router-dom'

import './mainhome.css';

class Mainhome extends Component {
  constructor(){
    super()
    this.state={
      username:"",
      password:"",
      logdata:"",
    }
  }
  submithandler= (e)=>{
    e.preventDefault();
    this.senddata={
      username:this.state.username,       
      password:this.state.password,
    }
    axios.post('http://localhost:5000/login',{username:this.state.username,password:this.state.password})
    .then(Response=>{if(Response.data.valid){
      alert(Response.data.status);
      this.props.Login(Response.data);
      sessionStorage.setItem('logininfo',Response.data.designation);
      this.setState({logdata:Response.data.designation})
    }
    else alert(Response.data)}).catch(Error=>alert(Error))
  }
  

  inputhandler=(e)=>{
    this.setState({
      [e.target.name]:e.target.value
    })
  }
  render(){
    if(this.state.logdata==='designer'||sessionStorage.getItem('logininfo')==='designer'){return<Redirect to='/designerhome'/>}
    if(this.state.logdata==='stores'||sessionStorage.getItem('logininfo')==='stores'){return<Redirect to='/stores'/>}
    if(this.state.logdata==='quality'||sessionStorage.getItem('logininfo')==='stores'){return<Redirect to='/Quality'/>}
    return (    
    <div className="maincon">
      <div className="leftcontainer">
      <h1>Sign-in</h1>
      </div>
      <div className="rightcontainer">
        <div className="formholder">
          <div className="signimage">
            <img src ={signin} className="signin" alt="signin_image"/>  
          </div>      
            <form className="form" onSubmit={this.submithandler}>
            <input type       ="email"     placeholder="Username"        name="username"     value={this.state.username}    onChange={this.inputhandler} />  
            <input type       ="password" placeholder="Password"        name="password"     value={this.state.password}    onChange={this.inputhandler}/>
            <button className="submit">submit</button>
            <p>Not a existing user?</p>
            <button className="signup"><Link to="/signup" style={{ textDecoration: 'none',color:"inherit" }}>signup</Link></button>          
          </form>      
        </div>
      </div>
    </div>
    );
  }
}

const mapDispatchToProps =(dispatch)=>{
  return({
    Login
  })
}


export default connect(null,mapDispatchToProps())(Mainhome)

