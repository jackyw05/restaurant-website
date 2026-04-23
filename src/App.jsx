import { useState } from 'react';
import Navbar from './components/Navbar';
import CartSidebar from './components/CartSidebar';
import Hero from './components/Hero';
import Menu from './components/Menu';
import About from './components/About';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './App.css';

function App() {
  const [cart, setCart] = useState({});   // replaces: const cart = {}
  const [cartOpen, setCartOpen] = useState(false);

  // replaces: the add-to-cart-btn click handler
  const addToCart = (name, price, emoji) => {
    setCart(prev => ({
      ...prev,
      [name]: prev[name]
        ? { ...prev[name], qty: prev[name].qty + 1 }
        : { price, qty: 1, emoji }
    }));
  };

  // replaces: qty-btn +/- click handlers inside renderCart()
  const updateCart = (name, delta) => {
    setCart(prev => {
      const newQty = (prev[name]?.qty ?? 0) + delta;
      if (newQty <= 0) {
        const { [name]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [name]: { ...prev[name], qty: newQty } };
    });
  };

  // replaces: clearCartBtn click handler
  const clearCart = () => setCart({});

  return (
    <>
      <Navbar cart={cart} onCartToggle={() => setCartOpen(!cartOpen)} />
      <CartSidebar cart={cart} isOpen={cartOpen} onClose={() => setCartOpen(false)}
                   onUpdate={updateCart} onClear={clearCart} />
      <Hero />
      <Menu onAddToCart={addToCart} />
      <About />
      <Gallery />
      <Contact />
      <Footer />
    </>
  );
}

export default App;