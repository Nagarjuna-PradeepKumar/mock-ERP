import React, { Component } from 'react'

export default class Check extends Component {
      render(){
        const {towm : town, ...props}=this.props
        return(
            <div>
                <p>{props.name}</p>
                <p>{props.town}</p>
            </div>
        )
    }
}