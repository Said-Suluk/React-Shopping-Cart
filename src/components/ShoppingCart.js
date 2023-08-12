import React, { useState } from "react";
import "./ShoppingCart.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

  // ! ShoppingCart bileşenini tanımladığımız kısım.
  const ShoppingCart = ({ showApp, onGoBack, cartItems, setCartItems }) => {
  //! State tanıtımları
  const [showCheckout, setShowCheckout] = useState(false);
  const [discountApplied, setDiscountApplied] = useState(false);

  // ! Sepet toplamı hesaplama
  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  // ! Eğer indirim uygulandıysa indirim miktarını hesaplama.
  const discount = discountApplied ? total * 0.2 : 0;
  const discountedTotal = total - discount;

  // ! İndirim uygulama durumu değiştirme.
  const handleDiscountToggle = () => {
    setDiscountApplied(!discountApplied);
  };

  // ! Ürün miktarını artırdığımız fonksiyon.
  const handleIncreaseQuantity = (itemId) => {
    const updatedCart = cartItems.map((item) =>
      item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(updatedCart);
  };

  // ! Ürün miktarını azalttığımız fonksiyon.
  const handleDecreaseQuantity = (itemId) => {
    const updatedCart = cartItems.map((item) =>
      item.id === itemId && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCartItems(updatedCart);
  };

  // ! Ürünü sepetten silme fonksiyonu.
  const handleRemoveItem = (itemId) => {
    const updatedCart = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedCart);
  };

  // ! Siparişi tamamlama işlemi.
  const handlePlaceOrder = () => {
    if (cartItems.length === 0) {
      alert("Cannot place an order with an empty cart.");
      return;
    }

    // ! Siparişteki veri objesi.
    const orderData = {
      items: cartItems,
      total: discountedTotal,
    };
    console.log("Placing order:", orderData);
    alert("Your order has been successfully completed.");

    window.location.reload();
  };

  // ! Render işlemleri.
  return (
    <div
      className={`shopping-cart-container ${showApp ? "invisible" : "visible"}`}
    >
      <h1>Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p className="empty">Your cart is empty.</p>
      ) : (
        <div className="shoppingCartItems">
          {cartItems.map(({ id, name, price, quantity, img }, index) => (
            <div key={index} className="cart-item">
              <img src={img} alt={name} />
              <div>
                <p>Price: ${price * quantity}</p>
                <p>Quantity: {quantity}</p>
              </div>
              <div>
                <button onClick={() => handleIncreaseQuantity(id)}>+</button>
                <button onClick={() => handleDecreaseQuantity(id)}>-</button>
                <button onClick={() => handleRemoveItem(id)}>Remove</button>
              </div>
            </div>
          ))}
          <p className="total-price">Total Price: ${total}</p>
          <button className="checkout" onClick={() => setShowCheckout(true)}>
            Checkout
          </button>
        </div>
      )}

      {showCheckout && (
        <div className="checkout-overlay">
          <div className="checkout-modal">
            <div className="close-button-container">
              <button
                className="close-button"
                onClick={() => setShowCheckout(false)}
              >
                ×
              </button>
            </div>
            <h2>Checkout</h2>
            {cartItems.map((item, index) => (
              <div key={index}>
                <img src={item.img} alt={item.name} />
                <p>Price: ${item.price * item.quantity}</p>
                <p>Quantity: {item.quantity}</p>
              </div>
            ))}
            <p className="checkoutprice">Total Price: ${discountedTotal}</p>
            <label className="discount-label">
              <input
                type="checkbox"
                checked={discountApplied}
                onChange={handleDiscountToggle}
              />
              %20 Discount
            </label>
            <button onClick={handlePlaceOrder}>Place Order</button>
          </div>
        </div>
      )}
      <button
        onClick={onGoBack}
        className={`cart-button-back ${showApp ? "invisible" : "visible"}`}
      >
        <FontAwesomeIcon icon={faArrowLeft} /> Back
      </button>
    </div>
  );
};

export default ShoppingCart;
