import React, { useState, useEffect } from 'react';
import './secondpage.css';

const Secondpage = ({ openLoginModal }) => {

  const [products, setProducts] = useState({
    newProducts: [],
    recommended: []
  });

  useEffect(() => {
    const fetchProducts = async () => {
      // Mock data
      const mockData = {
        newProducts: [
          { id: 1, image: './1.png', price: '₱90.00', name: 'Green Floral Dress' },
          { id: 2, image: './2.png', price: '₱90.00', name: 'Beige Dress' },
          { id: 3, image: './3.png', price: '₱90.00', name: 'Black Polka Dot Dress' },
          { id: 4, image: './4.png', price: '₱90.00', name: 'Pink Dress' }
        ],
        recommended: [
          { id: 5, image: './5.png', price: '₱90.00', name: 'Black Polka Dot Dress' },
          { id: 6, image: './6.png', price: '₱90.00', name: 'Brown Dress' },
          { id: 7, image: './7.png', price: '₱90.00', name: 'Red Dress' },
          { id: 8, image: './8.png', price: '₱90.00', name: 'Navy Blue Dress' }
        ]
      };
      
      setProducts(mockData);
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (productId) => {
    
    openLoginModal(); 
  };

  return (
    <div className="second-main">
      <div className="treasure-header">
        <h2>The Best Treasure Hunt Is In Our Racks</h2>
      </div>

      <section className="product-section">
        <h3 className="section-title">New Products</h3>
        <div className="products-grid">
          {products.newProducts.map((product) => (
            <div key={product.id} className="product-card">
              <div className="product-image">
                <img 
                  src={product.image || '/api/placeholder/200/250'} 
                  alt={product.name}
                />
              </div>
              <div className="product-info">
                <p className="product-price">{product.price}</p>
                <button 
                  className="add-to-cart-btn"
                  onClick={() => handleAddToCart(product.id)}
                >
                  ⛁ ADD TO CART
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="product-section">
        <h3 className="section-title">Recommended</h3>
        <div className="products-grid">
          {products.recommended.map((product) => (
            <div key={product.id} className="product-card">
              <div className="product-image">
                <img 
                  src={product.image || '/api/placeholder/200/250'} 
                  alt={product.name}
                />
              </div>
              <div className="product-info">
                <p className="product-price">{product.price}</p>
                <button 
                  className="add-to-cart-btn"
                  onClick={() => handleAddToCart(product.id)}
                >
                  ⛁ ADD TO CART
                </button>
              </div>  
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Secondpage;
