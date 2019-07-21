import React, {Component} from 'react';
import {getReviewsShopee, getReviewsLazada} from './getReviews';
import {searchItemShopee} from './searchItem'

export default class Reviews extends Component{
    state = {
        shopeeReviews: [],
        lazadaReviews: [],
        result: []
    }
    componentDidMount(){
        let result = searchItemShopee('laptop');
        this.setState({result}, ()=>{
            console.log("New state:", this.state)
        })
    }
    render(){
        return(
            <div>
                
            </div>
        )
    }
}