import { createContext, useContext, useState, useEffect, useCallback } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({children}) => {

    const [cart, setCart] = useState([]);
    const [checkoutItems, setCheckoutItems] = useState([]);
    const [showToast, setShowToast] = useState({show: false, inCart: false, productName: ""});

    useEffect(() => {
        const saved = localStorage.getItem("cart");
        if(saved) {
            const jsonSaved = JSON.parse(saved)
            console.log(jsonSaved);
            setCart(jsonSaved);
        }
        
    }, [])

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart])

    const addToCart = useCallback((product) => {

        setCart(prev => {
            if(prev.some(p => p.ProductID === product.ProductID)){
                console.log("product already in cart");
                setShowToast({show: true, inCart: true, productName: product.title});
                setTimeout(() => {
                    setShowToast({show: false, inCart: false});
                }, 3000);
                return prev;
            }
            
            console.log(`${product.product_name} added to cart`)
            setShowToast({show: true, inCart: false, productName: product.product_name});
            setTimeout(() => {
                setShowToast({show: false, inCart: false});
            }, 3000);

            return [...prev, product];
        });        
    }, [setCart, setShowToast]);

    const removeFromCart = (id) => {
        setCart(prev => prev.filter(item => item.ProductID !== id))
    }

    const value = {
        cart,
        setCart,
        addToCart,
        removeFromCart,
        checkoutItems,
        setCheckoutItems,
        showToast
    }

    return <CartContext.Provider value={value}>
        {children}
    </CartContext.Provider>
}