import React, {Component} from 'react';
import {getReviewsShopee, getReviewsLazada} from './getReviews';

export default class Reviews extends Component{
    state = {
        shopeeReviews: [],
        lazadaReviews: [],
    }
    componentDidMount(){
        let shopeeUrl = 'https://shopee.ph/Authentic-Nature-Republic-Aloe-Vera-Gel-Mist-Cleanser-i.22681665.719710628';
        let lazadaUrl = 'https://www.lazada.com.ph/products/jeju-aloe-fresh-soothing-gel-i263664184-s367762656.html?spm=a2o4l.searchlist.list.3.440473614cFSJq&search=1'
        
        this.setState({
            shopeeReviews: getReviewsShopee(shopeeUrl),
            lazadaReviews:  getReviewsLazada(lazadaUrl)
        }, ()=>{
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