import React, { useState, useEffect } from 'react';
import RingViewer from '../components/common/RingViewer';
import './styles/ringBuilder.css';
import { ChevronRight, Star, Diamond, Check } from 'lucide-react';

function RingBuilder() {
  const [metalColor, setMetalColor] = useState('yellow'); // yellow, white, rose
  const [diamondShape, setDiamondShape] = useState('round');
  const [hasHalo, setHasHalo] = useState(false);
  const [hasPave, setHasPave] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const getModelFile = () => {
    if (!hasHalo && !hasPave) return 'Rhino File (18).glb'; // Solitaire Plain
    if (!hasHalo && hasPave) return 'Rhino File (17).glb'; // Solitaire Pave
    if (hasHalo && !hasPave) return 'Rhino File.glb'; // Halo Plain
    if (hasHalo && hasPave) return 'Main File.glb'; // Halo Pave
    return 'Rhino File (18).glb';
  };

  const getPrice = () => {
    let base = 980; // Solitaire
    if (hasHalo) base += 350;
    if (hasPave) base += 450;
    return `$${base.toLocaleString()}`;
  };

  const getTitle = () => {
    const head = hasHalo ? 'Halo' : 'Solitaire';
    const band = hasPave ? 'Pavé' : 'Classic';
    return `${band} ${head} Engagement Ring`;
  };

  const metals = [
    { id: 'yellow', name: '14k Yellow Gold', colorCode: '#F9D77E' },
    { id: 'white', name: '14k White Gold', colorCode: '#F0EDE8' },
    { id: 'rose', name: '14k Rose Gold', colorCode: '#F0B49E' },
  ];

  return (
    <div className="rb-app-container" style={{ height: '800px', background: '#fafafa', borderRadius: '16px', overflow: 'hidden', border: '1px solid #eaeaea', marginTop: '2rem' }}>
      <main className="rb-product-layout" style={{ height: '100%', margin: 0 }}>
        {/* Left Side - 3D Viewer */}
        <div className="rb-viewer-section">
          <div className="rb-viewer-wrapper">
            <RingViewer modelPath={`/${getModelFile()}`} metalColor={metalColor} />
            <div className="rb-viewer-overlay-text">
              Interact to rotate and zoom <br />
              <span>Drag to spin • Scroll to zoom</span>
            </div>
          </div>
        </div>

        {/* Right Side - Details */}
        <div className="rb-details-section">
          <div className="rb-details-content">
            <div className="rb-breadcrumbs">
              Engagement Rings <ChevronRight size={14} /> Build Your Own
            </div>
            
            <h1 className="rb-product-title">{getTitle()}</h1>
            
            <div className="rb-reviews">
              <div className="rb-stars">
                <Star size={14} fill="#111" stroke="#111" />
                <Star size={14} fill="#111" stroke="#111" />
                <Star size={14} fill="#111" stroke="#111" />
                <Star size={14} fill="#111" stroke="#111" />
                <Star size={14} fill="#111" stroke="#111" />
              </div>
              <span>(128 Reviews)</span>
            </div>

            <p className="rb-product-price">{getPrice()}</p>
            <p className="rb-product-description">
              A custom-built symbol of love. Select your perfect setting style, metal color, and diamond shape to create a ring as unique as your story.
            </p>

            <div className="rb-customization-group">
              <h3 className="rb-group-title">1. Choose Diamond Shape</h3>
              <p className="rb-selected-value">{diamondShape.charAt(0).toUpperCase() + diamondShape.slice(1)}</p>
              <div className="rb-shape-grid">
                {['round', 'oval', 'cushion', 'emerald'].map(shape => (
                  <button 
                    key={shape} 
                    className={`rb-shape-btn ${diamondShape === shape ? 'active' : ''} ${shape !== 'round' ? 'disabled' : ''}`}
                    onClick={() => shape === 'round' && setDiamondShape(shape)}
                  >
                    <div className={`rb-shape-icon ${shape}`}></div>
                    <span>{shape.charAt(0).toUpperCase() + shape.slice(1)}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="rb-customization-group">
              <h3 className="rb-group-title">2. Choose Metal Color</h3>
              <p className="rb-selected-value">{metals.find(m => m.id === metalColor)?.name}</p>
              <div className="rb-metal-options">
                {metals.map(metal => (
                  <button 
                    key={metal.id}
                    className={`rb-metal-btn ${metalColor === metal.id ? 'active' : ''}`}
                    onClick={() => setMetalColor(metal.id)}
                    style={{ backgroundColor: metal.colorCode }}
                    aria-label={metal.name}
                  >
                    {metalColor === metal.id && <Check size={16} color={metal.id === 'white' ? '#111' : '#fff'} />}
                  </button>
                ))}
              </div>
            </div>

            <div className="rb-customization-group">
              <h3 className="rb-group-title">3. Setting Style</h3>
              
              <div className="rb-setting-toggles">
                <div className="rb-toggle-row">
                  <span className="rb-toggle-label">Center Setting</span>
                  <div className="rb-toggle-group">
                    <button className={`rb-toggle-btn ${!hasHalo ? 'active' : ''}`} onClick={() => setHasHalo(false)}>Solitaire</button>
                    <button className={`rb-toggle-btn ${hasHalo ? 'active' : ''}`} onClick={() => setHasHalo(true)}>Halo (+$350)</button>
                  </div>
                </div>

                <div className="rb-toggle-row">
                  <span className="rb-toggle-label">Band Style</span>
                  <div className="rb-toggle-group">
                    <button className={`rb-toggle-btn ${!hasPave ? 'active' : ''}`} onClick={() => setHasPave(false)}>Plain</button>
                    <button className={`rb-toggle-btn ${hasPave ? 'active' : ''}`} onClick={() => setHasPave(true)}>Pavé (+$450)</button>
                  </div>
                </div>
              </div>
            </div>

            <div className="rb-action-buttons">
              <button className="rb-primary-btn">
                <Diamond size={18} /> Choose Diamond
              </button>
              <button className="rb-secondary-btn">Add to Bag</button>
            </div>
            
            <div className="rb-shipping-info">
              <span>Free Shipping & Returns</span>
              <span>•</span>
              <span>Lifetime Warranty</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default RingBuilder;
