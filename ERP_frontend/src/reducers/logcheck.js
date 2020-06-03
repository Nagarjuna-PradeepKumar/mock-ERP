const LogcheckReducer = (state = true, action)=>{
    switch(action.type){
        case 'PASSED' :
            return !state;
        default :
            return state;
    }
}

export default LogcheckReducer;