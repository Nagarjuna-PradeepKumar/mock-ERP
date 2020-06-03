import React, { Component } from 'react'
import {Togglesign} from './actions/index'
import {connect} from 'react-redux'
import axios from 'axios'


class MainHome extends Component{
    constructor(){
        super()
        this.state={
            UserName : "",
            Password : "",
            
        }
     
    }
    Usernamehandler=(e)=>{
        this.setState({
            UserName : e.target.value,                 
        })
    }
    Passwordhandler=(e)=>{
        this.setState({  
            Password : e.target.value,                       
        })
    }
    

    Submithandler=(e)=>{
        e.preventDefault();
        {this.props.Togglesign()}
        axios.post('http://localhost:5000/login',{"username" : this.state.UserName, "password" : this.state.Password})
        .then(Response=>alert(Response.data))
        .catch(Error=>{alert(Error)})
    }
    render(){
        return(
            <form onSubmit={this.Submithandler} >
                <label>
                    <p>enter your user name :  {this.state.UserName}</p>
                    <input type='text' value={this.state.UserName} onChange={this.Usernamehandler} name = 'UserName'/>
                </label>
                <label>
                    <p>enter your password :{this.state.Password} </p>
                    <input type ='password' value={this.state.Password} onChange={this.Passwordhandler} name ='Password'/>
                </label>
                <p><input type='submit' value='click to submit'/></p>
            </form>
        )
    }
}

const mapDispatchToProps =()=>{
  return({
    Togglesign
  })
}

export default connect(null,mapDispatchToProps())(MainHome)

















































































// import React,{Component} from 'react';
// import {Increment, Decrement} from './actions/index'
// import {connect} from 'react-redux'

// class MainHome extends Component{
//   constructor(props){
//     super()
//     this.state={

//     }
//   }
//   render(){
//     return(      
//         <div>
//             <p>{this.props.count}</p>
//             <button onClick={this.props.Increment}>+</button>
//             <button onClick={this.props.Decrement}>-</button>
//         </div>   
//     )
//   }
// }

// const mapStateToProps= (state)=>{
//   return({
//     count : state.Count
//   })
// }
// const mapDispatchToProps=()=>{
//   return({
//     Increment,Decrement
//   })
// }

// export default connect(mapStateToProps,mapDispatchToProps())(MainHome);