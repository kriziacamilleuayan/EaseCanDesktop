import {getReviewsShopeeId} from './getReviews'

const axios = require('axios');


export function searchItemShopee(keyword){
    let url = `https://shopee.ph/api/v2/search_items/?by=relevancy&keyword=` + keyword;
    let proxy = `https://cors-anywhere.herokuapp.com/`;
    axios.get(proxy+url, {
        crossDomain: true
    })
        .then(res => {
            console.log(res.data.items)
            let reviews = []
            for(let item of res.data.items){
                reviews.push(getReviewsShopeeId(item.itemid, item.shopid))
            }
            console.log("FInal format reviews:", reviews)
            return reviews;
        })
        .catch(err => {
            console.log(err)
        })
}