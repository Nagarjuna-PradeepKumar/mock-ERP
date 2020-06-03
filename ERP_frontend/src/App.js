import React,{Component} from 'react';
import{BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import MainHome from './firstpage/MainHome'
import DesignerHome from './designer/DesignerHome'
import Stores from './stores/Stores'
import Signup from './signup/Signup'
import Quality from './quality/Quality'
import {connect} from 'react-redux'

class App extends Component{
  constructor(props){
    super()
    this.state={
      login : true,
    }
    this.pages =[
      {
        path :'/designerhome',
        component : DesignerHome,
      },
      {
        path:'/stores',
        component:Stores
      },
      {
        path:'/quality',
        component:Quality
      },
    ]   
  } 
  render(){  
    return(    
      <Router>
        <Switch >  
        <Route exact path='/' component={MainHome}/>
        <Route exact path='/signup' component={Signup}/>
        {this.pages.map((item)=><Route exact {...item} key={item.path}/>)}
        </Switch>        
      </Router> 
     
    )    
  }
}

const mapStateToProps= (state)=>{
  return({
    logindata : state.Logindata
  })
}


export default connect(mapStateToProps,null)(App);


// {this.pages.map((item)=>(this.state.login?<Route exact {...item}/> :  <Route exact path="/" render={() => <Redirect to="/" />} /> ))}

// {this.pages.map((item)=>(<ProtectedRoute {...item}/>))}

// {this.pages.map((item)=>(<Route exact {...item}/>))}