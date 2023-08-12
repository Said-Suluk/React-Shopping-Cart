import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import data from "./data.json";
import Product from "./components/Product";
import ShoppingCart from "./components/ShoppingCart";
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

// ! State değişkenlerini tanımlama.
function App() {
  const [showApp, setShowApp] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const [added, setAdded] = useState(false);

  // ! Sepete git butonuna tıklandığında çalışması için yazılmış fonksiyon.
  const handleGoToCart = () => {
    setShowApp(false);
  };

  // ! Ürünü sepete ekleme fonksiyonu.
  const addToCart = (product) => {
    const existingCartItem = cartItems.find((item) => item.id === product.id);

    // ! Ürün zaten sepette ise miktarını güncelleme.
    if (existingCartItem) {
      const updatedCart = cartItems.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCartItems(updatedCart);
    } else {
      // ! Ürün sepette yoksa yeni öğe olarak ekleme.
      setCartItems((prevCartItems) => [
        ...prevCartItems,
        { ...product, quantity: 1 },
      ]);
    }

    // ! Ürünün sepete eklendiğini belirttiğimiz kısım.
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
    }, 1500);
  };

  // ! Sepete dön butonuna tıkladığımızda çalışan fonksiyon.
  const handleGoBack = () => {
    setShowApp(true);
  };

  // ! Render işlemleri.
  return (
    <Router>
      {showApp && (
        <div className="app-container">
          <div className="products-container row justify-content-center ">
            {data.products.map((product) =>
              Object.keys(product).map((key) => (
                <Product
                  key={key}
                  product={product[key]}
                  addToCart={() => addToCart(product[key])}
                />
              ))
            )}
          </div>
          <Link
  to="/cart"
  className={`cart-button ${added ? "added" : ""}`}
  onClick={handleGoToCart}
>
  <FontAwesomeIcon icon={faShoppingCart} />
  {added
    ? "Added Cart"
    : `Go to Cart`}
  {added && <span className="heart-icon">❤️</span>}
  {cartItems.length > 0 && (
    <span className="cart-count-badge">
      {cartItems.reduce((total, item) => total + item.quantity, 0)}
    </span>
  )}
</Link>
        </div>
      )}
  
      <Routes>
        <Route
          path="/cart"
          element={
            <ShoppingCart
              cartItems={cartItems}
              setCartItems={setCartItems}
              showApp={showApp}
              onGoBack={handleGoBack}
            />
          }
        />
      </Routes>
    </Router>
  );
  
}

export default App;
