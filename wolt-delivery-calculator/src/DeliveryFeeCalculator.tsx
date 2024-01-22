import React, { useState } from 'react';
import './DeliveryFeeCalculator.css'

const DeliveryFeeCalculator: React.FC = () => {
    const [cartValue, setCartValue] = useState<number>(0);
    const [deliveryDistance, setDeliveryDistance] = useState<number>(0);
    const [numberOfItems, setNumberOfItems] = useState<number>(0);
    const [orderTime, setOrderTime] = useState<Date>(new Date());
  
    // Calculate the DeliveryFee

    const calculateDeliveryFee = (): number => {
      const baseFee = 2; // baseFee as per 1km  
      const distanceSurcharge = 1; // Extra fee for every 500 meters after first 1km
      const smallOrderSurchargeThreshold = 10; // Small order limit
      const smallOrderSurchargeRate = 0.5; // surcharge for small orders
      const bulkItemSurchargeRate = 0.5; // surcharge rate after the 4th value in cart as an Item
      const bulkItemSurchargeThreshold = 5; // Bulk Item order limit 
      const maxSurcharge = 1.2; // this price is for friday rush hours
  

      // It calculates the surcharge for the smallorders according to the cartvalue
      const smallOrderSurcharge = Math.max(0, cartValue - smallOrderSurchargeThreshold) * smallOrderSurchargeRate;
  
      // It calculates the surcharge for the orders according to the deliveryDistance
      const additionalDistance = Math.max(0, deliveryDistance - 1000);
      const distanceSurchargeTotal = Math.ceil(additionalDistance / 500) * distanceSurcharge;
  
      // It calculates the surcharge for the bulkitems according to the threshold which applied
      const bulkItemSurcharge = Math.max(0, numberOfItems - bulkItemSurchargeThreshold) * bulkItemSurchargeRate;
  
      // It is total sum of orders + distance
      let totalSurcharge = smallOrderSurcharge + distanceSurchargeTotal + bulkItemSurcharge;
  
      // Total price
      totalSurcharge = Math.min(totalSurcharge, 15);
  
      
      if (cartValue >= 200) {
        return 0;
      }
  
      // This is for the friday rush hours
      const isFridayRushHour =
        orderTime.getDay() === 5 && orderTime.getUTCHours() >= 15 && orderTime.getUTCHours() < 19;
  
      return isFridayRushHour ? Math.min(baseFee + totalSurcharge, 15) * maxSurcharge : baseFee + totalSurcharge;

    };
  

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const deliveryFee = calculateDeliveryFee();
        alert(`Total Delivery Fee: €${deliveryFee.toFixed(2)}`);
      };
      

      return (
        <div className="calculator-container">
          <form onSubmit={handleSubmit} className="calculator-form">
            <div className="form-field" data-test-id="cartValue">
              <label>
                Cart Value (€):
                <input
                  type="number"
                  step="0.01"
                  value={cartValue}
                  onChange={(e) => setCartValue(parseFloat(e.target.value))}
                />
              </label>
            </div>
            <div className="form-field" data-test-id="deliveryDistance">
              <label>
                Delivery Distance (m):
                <input
                  type="number"
                  value={deliveryDistance}
                  onChange={(e) => setDeliveryDistance(parseInt(e.target.value))}
                />
              </label>
            </div>
            <div className="form-field" data-test-id="numberOfItems">
              <label>
                Number of Items:
                <input
                  type="number"
                  value={numberOfItems}
                  onChange={(e) => setNumberOfItems(parseInt(e.target.value))}
                />
              </label>
            </div>
            <div className="form-field" data-test-id="orderTime">
              <label>
                Order Time:
                <input
                  type="datetime-local"
                  value={orderTime.toISOString().slice(0, -8)}
                  onChange={(e) => setOrderTime(new Date(e.target.value))}
                />
              </label>
            </div>
            <button type="submit" data-test-id="calculateButton">
              Calculate Delivery Fee
            </button>
          </form>
        </div>
      );
    };
    

export default DeliveryFeeCalculator;
