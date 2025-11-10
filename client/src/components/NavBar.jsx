import "../css/NavBar.css"
import { Link } from "react-router-dom"
import { useCart } from "../contexts/CartContext";

function NavBar() {
    const { cart } = useCart();
    return (
        <div className="nav-container">
            {/* Left: Logo */}
            <div className="nav-left">
                <Link to="/" className="logo">
                    <img src="/logo.png" alt="Logo" />
                </Link>
            </div>

            {/* Right: Menu + Cart */}
            <div className="nav-right">
                <Link to="/" className="app">Home</Link>
                <Link to="/shop/products/" className="app">Shop</Link>
                <Link to="/cart" className="cart">
                    <img src="/cart.png" alt="Cart" />
                    ({cart.length})
                </Link>
            </div>
        </div>
    );
}

export default NavBar;
