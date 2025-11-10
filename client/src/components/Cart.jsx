import "../css/Cart.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import CartProductCard from "./CartProductCard";
import Navbar from "./Navbar";

function Cart() {
    const { cart, checkoutItems, setCheckoutItems } = useCart();
    const navigate = useNavigate();

    function addToCheckout({ product }) {
        if (checkoutItems.some((p) => p.ProductID === product.ProductID)) {
            setCheckoutItems(prev => prev.filter(p => p.ProductID !== product.ProductID));
        } else {
            setCheckoutItems(prev => [...prev, product]);
        }
    }

    function getTotalPrice() {
        return checkoutItems.reduce((totalPrice, item) => totalPrice + Number(item.price), 0);
    }

    function checkout() {
        if (checkoutItems.length < 1) {
            console.log("Cart is empty");
            return;
        }
        navigate("/checkout");
    }

    if (cart.length === 0) return (
        <div>
            <Navbar />
            <div className="empty-cart">
                <h1>Cart is empty, explore some products!!!</h1>
            </div>
        </div>
    );

    return (
        <div>
            <Navbar />
            <div className="cart-container">
                {cart.map((p) => (
                    <div className="cart-product-card" key={p.ProductID}>
                        <input
                            type="checkbox"
                            checked={checkoutItems.some((item) => item.ProductID === p.ProductID)}
                            onChange={() => addToCheckout({ product: p })}
                        />
                        <CartProductCard product={p} isCart />
                    </div>
                ))}
                <div className="checkout-container">
                    <p>Total Price: ${getTotalPrice().toFixed(2)}</p>
                    <button onClick={checkout}>Checkout({checkoutItems.length})</button>
                </div>
            </div>
        </div>
    );
}

export default Cart;
