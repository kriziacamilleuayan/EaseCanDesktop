const axios = require('axios');

//Input : URL of any product in Shopee and Lazada

export function getReviewsShopee(productUrlShopee) {
    let productUrlArray = productUrlShopee.split('.');
    let productId = productUrlArray[productUrlArray.length - 1];
    let shopId = productUrlArray[productUrlArray.length - 2];

    let url = `https://shopee.ph/api/v2/item/get_ratings?filter=0&flag=1&itemid=` + productId +
        `&limit=0&offset=0&shopid=` + shopId;

    let proxy = `https://cors-anywhere.herokuapp.com/`

    axios.get(proxy+url, {
        crossDomain: true
    })
        .then(res => {
            console.log(res)
            let reviews = res.data.data.ratings;
            for (let review of reviews) {
                console.log(review.comment)
            }
            //What do you want to return?
            return reviews;
        })
        .catch(err => {
            console.log("Something went wrong: ", err)
        })

}

export function getReviewsShopeeId(itemId, shopId) {
    let url = `https://shopee.ph/api/v2/item/get_ratings?filter=0&flag=1&itemid=` + itemId +
        `&limit=0&offset=0&shopid=` + shopId;

    let proxy = `https://cors-anywhere.herokuapp.com/`

    axios.get(proxy+url, {
        crossDomain: true
    })
        .then(res => {
            console.log(res)
            let reviews = res.data.data.ratings;
            for (let review of reviews) {
                console.log(review.comment)
            }
            //What do you want to return?
            return reviews;
        })
        .catch(err => {
            console.log("Something went wrong: ", err)
        })

}

export function getReviewsLazada(productUrlLazada) {
    let productUrlArray = productUrlLazada.split("-i");
    let productUrlArray2 = productUrlArray[1].split("-s");
    let itemId = productUrlArray2[0];

    let url = `https://my.lazada.com.ph/pdp/review/getReviewList?itemId=` + itemId;

    let proxy = `https://cors-anywhere.herokuapp.com/`
    axios.get(url, {
        crossDomain: true,
        headers:{
           "Access-Control-Allow-Origin": "*"
        }
    })
        .then(res => {
            console.log("res:", res)
            let reviews = res.data.model.items;
            for (let review of reviews) {
                console.log(review.reviewContent);
            }
            return reviews;
        })
        .catch(err => {
            console.log("Something went wrong: ", err)
        })
}