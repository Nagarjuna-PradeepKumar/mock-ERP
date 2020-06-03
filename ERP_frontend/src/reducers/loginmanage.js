const LoginmanageReducer = (state ={userdesig:null,islogged:null}, action)=>{   
    if(action.type==='loginmanager'){
        return state={
            userdesig:action.payload.designation,
            islogged:action.payload.valid
        }
    }
    else return state={
        userdesig:null,
        islogged:null
    }
}
export default LoginmanageReducer