import React, { Component } from 'react';
import axios from 'axios'
import './Signup.css';

class Signup extends Component {
  constructor(){
    super()
    this.state={
      username:"",
      password:"",
      repassword:"",
      designation:"",
    }
}
  submithandler=async (e)=>{
    e.preventDefault()
    if(this.state.password === this.state.repassword){
      this.senddata= await {
        username:this.state.username,
        designation:this.state.designation,
        password:this.state.password,
        repeat_password:this.state.repassword,
      }
      await axios.post('http://192.168.43.37:5000/signup',this.senddata)
      .then(Response=>alert(Response.data))
      .catch(Error=>{alert(Error)})
    }
    else{
      alert("Password do not match")
    }
   
  }
  inputhandler=(e)=>{
    this.setState({
      [e.target.name]:e.target.value
    })
  }
  selecthandler=(e)=>{
    this.setState({
      designation:e.target.value
    })
  }

  render(){
    return (
    <div className="SUP_maincon">
      <div className="SUP_leftcontainer">
        <h1>Sign-up</h1>
      </div>
      <div className="SUP_rightcontainer">
        <div className="SUP_formholder" onSubmit={this.submithandler}>
            <form className="SUP_form">
            <input type       ="email"     placeholder="Username"        name="username"     value={this.state.username}    onChange={this.inputhandler} />
            <select value={this.state.designation} onChange={this.selecthandler}>
              <option value="designer" name="designation">designer</option>
              <option value="stores" name="designation">stores incharge</option>
              <option value="quality" name="designation">quality</option>
            </select>
            {/* <input type       ="select"   placeholder="designation"     name="designation"  value={this.state.designation} onChange={this.inputhandler}/> */}
            <input type       ="password" placeholder="Password"        name="password"     value={this.state.password}    onChange={this.inputhandler}/>
            <input type       ="password" placeholder="Re-type Password"name="repassword"   value={this.state.repassword}  onChange={this.inputhandler}/>
            <button className="SUP_submit">submit</button>
            </form>      
        </div>
      </div>
    </div>
    );
  }
}

export default Signup;
