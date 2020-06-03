export const Togglesign =()=>{
    return({
        type: 'PASSED'
    })
}


export const Increment =()=>{
    return({
        type : 'increment'
    })
}

export const Decrement =()=>{
    return({
        type : 'decrement'
    })
}

export const Login=(data)=>{
    return({
        type:'loginmanager',
        payload:data
    })
}

