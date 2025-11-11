import React from "react";
import "../css/ProductModal.css";

const ProductModal = ({ product, onClose }) => {
  if (!product) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>×</button>
       <div className="modal-body">
  <div className="modal-image">
    <img src={product.image} alt={product.product_name} />
  </div>
  <div className="modal-info">
    <div className="top-info">
      <h2>{product.product_name}</h2>
      <h4> Price : ${product.price}</h4>
      <p className="description">{product.description}</p>
    </div>
    <p className="stock">Stock: {product.stock}</p>
  </div>
</div>

      </div>
    </div>
  );
};

export default ProductModal;
