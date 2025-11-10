import "../css/Product.css"
import React from 'react';
import { useCart } from "../contexts/CartContext";

const ProductCard = React.memo(({product, addToCart}) => {
    console.log("Render: ", product.product_name)

    return <div className="product-container">
        <div className="product-image">
            <img src={product.image} loading="lazy" alt={`${product.product_name}`}/>
        </div>
        <div className="product-details">
            <p>{product.product_name}</p>
            <h2>${product.price}</h2>
            <button onClick={() => addToCart(product)}> ⛁ ADD TO CART</button>
        </div>
    </div>
})

export default ProductCard;