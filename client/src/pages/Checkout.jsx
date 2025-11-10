import "../css/Checkout.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import CartProductCard from "../components/CartProductCard";
import ConfirmModal from "../components/ConfirmModal";
import Navbar from "../components/Navbar"; 

function Checkout() {
    const { cart, setCart, checkoutItems, setCheckoutItems } = useCart();
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const navigate = useNavigate();

    const totalPrice = checkoutItems.reduce((total, item) => total + Number(item.price), 0);
    const tax = totalPrice / 10;
    const totalPriceWithTax = totalPrice + tax;

    function payItems() {
        // Remove purchased items from cart
        setCart(prev => prev.filter(cartItem => !checkoutItems.some(checkoutItem => checkoutItem.ProductID === cartItem.ProductID)));
        setCheckoutItems([]);
        navigate("/cart"); // navigate to cart after payment
    }

    return (
        <div>
            {/* Navbar added here */}
            <Navbar />

            <div className="checkout">
                <button className="back-button" onClick={() => navigate(-1)}>← Back</button>

                {checkoutItems.map(item => (
                    <div className="checkout-card" key={item.ProductID}>
                        <CartProductCard product={item} />
                    </div>
                ))}

                <div className="payment-details">
                    <h3>Total Price: ${totalPrice.toFixed(2)}</h3>
                    <h3>Tax(10%) : ${tax.toFixed(2)}</h3>
                    <h2>Total Price after tax: ${totalPriceWithTax.toFixed(2)}</h2>

                    <button onClick={() => navigate("/cart")}>Cancel</button>
                    <button onClick={() => setShowConfirmModal(true)}>Pay</button>
                </div>

                {showConfirmModal && 
                    <ConfirmModal 
                        onCancel={() => setShowConfirmModal(false)} 
                        onConfirm={() => {
                            payItems();
                            setShowConfirmModal(false);
                        }}
                    />
                }
            </div>
        </div>
    );
}

export default Checkout;
