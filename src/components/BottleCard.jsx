import React from 'react';

function BottleCard({ bottle }) {
  // Check if the bottle has complete data structure or just name/reasoning
  const hasCompleteData = bottle.bottle_data && bottle.bottle_data.image_url;
  
  // Formatting price to show 2 decimal places if needed
  const formatPrice = (price) => {
    if (!price) return 'N/A';
    return `$${parseFloat(price).toFixed(2)}`;
  };

  return (
    <div className="bottle-card">
      <div className="bottle-image-container">
        {hasCompleteData ? (
          <img 
            src={bottle.bottle_data.image_url} 
            alt={bottle.name} 
            className="bottle-image"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/placeholder-bottle.png";
            }}
          />
        ) : (
          <div className="bottle-image-placeholder">
            <span>{bottle.name.substring(0, 2)}</span>
          </div>
        )}
      </div>
      
      <div className="bottle-info">
        <h3 className="bottle-name">{bottle.name.replace(/\*\*/g, '')}</h3>
        
        {hasCompleteData && (
          <div className="bottle-details">
            <div className="bottle-detail">
              <span className="detail-label">Type:</span>
              <span className="detail-value">{bottle.bottle_data.spirit_type}</span>
            </div>
            <div className="bottle-detail">
              <span className="detail-label">ABV:</span>
              <span className="detail-value">{bottle.bottle_data.abv}%</span>
            </div>
            <div className="bottle-prices">
              <div className="price-tag">
                <span className="price-label">Shelf:</span>
                <span className="price-value">{formatPrice(bottle.bottle_data.shelf_price)}</span>
              </div>
              <div className="price-tag">
                <span className="price-label">MSRP:</span>
                <span className="price-value">{formatPrice(bottle.bottle_data.avg_msrp)}</span>
              </div>
            </div>
          </div>
        )}
        
        <p className="bottle-reasoning">{
          bottle.reasoning.replace(/:\*\*|\*\*/g, '')
        }</p>
        
        {bottle.relationship && (
          <div className="bottle-relationship">
            <span className="relationship-label">Suggestion Type:</span>
            <span className="relationship-value">{bottle.relationship}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default BottleCard;