import { useEffect } from 'react';

function CartSidebar({ cart, isOpen, onClose, onUpdate, onClear }) {
  const entries = Object.entries(cart);
  const totalPrice = entries.reduce((s, [, v]) => s + v.price * v.qty, 0);
  const totalQty   = entries.reduce((s, [, v]) => s + v.qty, 0);

  // replaces: document.addEventListener('keydown', e => { if e.key === 'Escape' closeCart() })
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  // replaces: document.body.style.overflow = 'hidden'
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }, [isOpen]);

  const handleCheckout = () => {
    alert("Thank you for your order! 🍔\nWe'll have it ready for you shortly.");
    onClear();
    onClose();
  };

  return (
    <>
      {/* replaces: cartOverlay.addEventListener('click', closeCart) */}
      <div className={`cart-overlay ${isOpen ? 'active' : ''}`} onClick={onClose} />

      <aside className={`cart-sidebar ${isOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <h2 className="cart-title">Your Order</h2>
          <button className="cart-close" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>

        <div className="cart-body">
          {entries.length === 0 ? (
            <div className="cart-empty">
              <i className="fas fa-shopping-basket"></i>
              <p>Your cart is empty</p>
              <span>Browse the menu and add some items!</span>
            </div>
          ) : (
            <ul className="cart-items">
              {entries.map(([name, { price, qty, emoji }]) => (
                <li key={name} className="cart-item">
                  <div className="cart-item-emoji">{emoji}</div>
                  <div className="cart-item-info">
                    <div className="cart-item-name">{name}</div>
                    <div className="cart-item-price">${(price * qty).toFixed(2)}</div>
                  </div>
                  <div className="cart-item-controls">
                    <button className="qty-btn remove-btn"
                            onClick={() => onUpdate(name, -1)}>−</button>
                    <span className="cart-item-qty">{qty}</span>
                    <button className="qty-btn"
                            onClick={() => onUpdate(name, +1)}>+</button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {entries.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total-row">
              <span>Subtotal</span><span>${totalPrice.toFixed(2)}</span>
            </div>
            <div className="cart-total-row cart-total-main">
              <span>Total</span><span>${totalPrice.toFixed(2)}</span>
            </div>
            <button className="btn-primary full" onClick={handleCheckout}>
              <i className="fas fa-credit-card"></i> Proceed to Checkout
            </button>
            <button className="btn-clear-cart" onClick={onClear}>
              <i className="fas fa-trash-alt"></i> Clear Cart
            </button>
          </div>
        )}
      </aside>
    </>
  );
}

export default CartSidebar;