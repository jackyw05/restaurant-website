import { useState, useEffect } from 'react';
import MenuCard from './MenuCard';
import { fetchMenu } from '../services/api';

const tabs = [
  { id: 'mains',  label: 'Mains' },
  { id: 'sides',  label: 'Sides' },
  { id: 'drinks', label: 'Drinks' },
  { id: 'extras', label: 'Extras' },
];

function Menu({ onAddToCart }) {
  const [activeTab, setActiveTab] = useState('mains');
  const [menuData, setMenuData]   = useState({ mains:[], sides:[], drinks:[], extras:[] });
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState(null);

  useEffect(() => {
    fetchMenu()
      .then(data => { setMenuData(data); setLoading(false); })
      .catch(err  => { setError(err.message); setLoading(false); });
  }, []);

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
          {loading && <p style={{ textAlign:'center' }}>Loading menu...</p>}
          {error   && <p style={{ textAlign:'center', color:'red' }}>{error}</p>}
          <div className="menu-grid">
            {menuData[activeTab].map(item => (
              <MenuCard key={item._id} item={item} onAddToCart={onAddToCart} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Menu;