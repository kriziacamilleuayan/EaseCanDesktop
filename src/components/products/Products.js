import React, {Component} from 'react';
import './Products.css'

export default class Products extends Component{
    state = {
        products: [],
        total: 0.00
    }
    componentDidMount(){
        //populate products here
        let products = [
            {
                id: 1,
                product: "Product 1",
                price: 12.50
            },
            {
                id: 2,
                product: "Product 2",
                price: 13.25
            },
            {
                id: 3,
                product: "Product 3",
                price: 14.00
            },
        ]
        let total = 0.00;
        for(let product of products){
            total += product.price;
        }
        this.setState({products, total}, ()=>{ console.log("New state: ", this.state)});
    }
    render(){
        return(
            <div className="container">
                {this.state.products.map((product)=>
                    <div className="productContainer" key={product.id}>
                        <p className="productName">{product.product}</p>
                        <p className="productPrice">{product.price}</p>
                    </div>    
                )}
                <p className="totalAmount">Total: PHP {this.state.total}</p>
            </div>
        )
    }
}