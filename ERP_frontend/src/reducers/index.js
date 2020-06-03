import LogcheckReducer from './logcheck'
import CounterReducer from './counterreducer';
import LoginmanageReducer from './loginmanage'
import { combineReducers } from 'redux'



const allReducers = combineReducers({
    Logcheck : LogcheckReducer,
    Count : CounterReducer,
    Logindata:LoginmanageReducer
})

export default allReducers;
