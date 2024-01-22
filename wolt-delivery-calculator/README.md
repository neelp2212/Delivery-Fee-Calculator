# Delivery Fee Calculator

## Overview
This is a simple React component, `DeliveryFeeCalculator`, designed to calculate the delivery fee based on various factors such as cart value, delivery distance, number of items, and order time. The calculator employs a set of rules and surcharges to determine the final delivery fee.

## How it Works
The delivery fee is calculated using the `calculateDeliveryFee` function within the component. Here's a breakdown of the key factors considered:

### Cart Value
- A base fee of €2 is applied per kilometer.
- Additional surcharges may be applied based on the cart value.
- A maximum total surcharge of €15 is enforced.

### Delivery Distance
- A base fee is calculated for the first kilometer.
- Additional surcharges are applied for every 500 meters beyond the first kilometer.

### Number of Items
- A surcharge is applied for orders with more than four items.

### Order Time
- Friday rush hour surcharge is applied if the order is placed on a Friday between 3 PM and 7 PM (UTC).

## Form Input Fields
- **Cart Value (€):** Enter the total value of items in the shopping cart.
- **Delivery Distance (m):** Input the distance of delivery in meters.
- **Number of Items:** Specify the total number of items in the order.
- **Order Time:** Choose the date and time when the order is placed.

## Usage
1. Fill in the required details in the input fields.
2. Click the "Calculate Delivery Fee" button.
3. The calculated delivery fee will be displayed in an alert.

## Important Notes
- The maximum delivery fee is capped at €15.
- Orders with a cart value greater than or equal to €200 have a delivery fee of €0.
- Friday rush hour surcharge is applicable during specific hours.

Feel free to integrate this component into your React application for an easy and customizable delivery fee calculation.
