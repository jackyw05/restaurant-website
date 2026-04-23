import { useState } from 'react';
import MenuCard from './MenuCard';
import { menuData } from '../data/menuData';

const tabs = [
  { id: 'mains',  label: 'Mains' },
  { id: 'sides',  label: 'Sides' },
  { id: 'drinks', label: 'Drinks' },
  { id: 'extras', label: 'Extras' },
];

function Menu({ onAddToCart }) {
  const [activeTab, setActiveTab] = useState('mains');

  return (
    <section id="menu" className="section">
      <div className="container">
        <h2 className="section-title">Our Menu</h2>
        <div className="menu-tabs-wrap">
          <div className="menu-tabs">
            {tabs.map(tab => (
              <button key={tab.id}
                className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
        <div className="tab-content active">
          <div className="menu-grid">
            {menuData[activeTab].map(item => (
              <MenuCard key={item.name} item={item} onAddToCart={onAddToCart} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Menu;