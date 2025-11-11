import "./css/App.css";
import { useState, useEffect, useCallback } from "react";
import { useProduct } from "./contexts/ProductContext";
import { useCart } from "./contexts/CartContext";
import ProductCard from "./components/ProductCard";
import Toast from "./components/Toast";
import Navbar from "./components/Navbar"; 
import ProductModal from "./components/ProductModal"; 

function App() {
  const {
    products,
    query, setQuery,
    loading,
    sortFilter, setSortFilter,
  } = useProduct();
  
  const { showToast, addToCart } = useCart();

  const [selectedProduct, setSelectedProduct] = useState(null); 

  const handleAddToCart = useCallback(
    (product) => addToCart(product),
    [addToCart]
  );

  return (
    <div>
      <Navbar /> 
      <div className="main-content">
        <div className="filters">
          <div className="search-bar">
            <input
              value={query}
              onChange={e => setQuery(e.target.value)} 
              placeholder="search an item..."
            />
          </div>
          <div className="sort">
            <p>Sort :</p>
            <select value={sortFilter} onChange={(e) => setSortFilter(e.target.value)}>
              <option value="">default</option>
              <option value="az">A-Z</option>
              <option value="za">Z-A</option>
              <option value="asc">Ascending Price</option>
              <option value="des">Descending Price</option>
            </select>
          </div>
        </div>

        <div className="products">
          {!loading && products.length === 0 && <div>No items found.</div>}
          {loading ? "Loading..." : 
            <>
              {products.map((p) => (
                <ProductCard 
                  product={p} 
                  addToCart={handleAddToCart} 
                  key={p.ProductID} 
                  onClick={setSelectedProduct} 
                />
              ))}
            </>
          }
        </div>

        {showToast.show && 
          <Toast inCart={showToast.inCart} productName={showToast.productName}/>
        }

        {/* Product Modal */}
        <ProductModal 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
        />
      </div>
    </div>
  );
}

export default App;
