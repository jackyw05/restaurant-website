import { useState } from 'react';

function MenuCard({ item, onAddToCart }) {
  const [added, setAdded] = useState(false);

  const handleClick = () => {
    onAddToCart(item.name, item.price, item.emoji);

    // replicates the "Added!" button flash from script.js
    setAdded(true);
    setTimeout(() => setAdded(false), 1000);
  };

  return (
    <div className="menu-card">
      <h3>{item.name}</h3>
      {item.description && <p>{item.description}</p>}
      <div className="menu-card-footer">
        <span className="price">${item.price}</span>
        <button
          className={`add-to-cart-btn ${added ? 'added' : ''}`}
          onClick={handleClick}>
          {added
            ? <><i className="fas fa-check"></i> Added!</>
            : <><i className="fas fa-plus"></i> Add to Cart</>}
        </button>
      </div>
    </div>
  );
}

export default MenuCard;