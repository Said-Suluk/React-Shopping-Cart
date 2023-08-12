import React from 'react';
import './Product.css';

// ! Ürünlerin sayfada görüntülenmesi.
const Product = ({ product, addToCart }) => {
  return (
    <div className="product-container">
      <img src={product.img} alt="" />
      <p>Price: ${product.price}</p>
      <p>Stock: {product.stock}</p>
      <p>Size: {product.size}</p>
      <button onClick={addToCart}>Add to Cart</button>
    </div>
  );
};

export default Product;
