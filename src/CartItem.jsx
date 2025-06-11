import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';


const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();
  const [addedtoCart, setAddedtoCart] = React.useState({}); // State to keep track of added items

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = (items) => {
    if (items && Array.isArray(items)) {
      let total = 0;
      items.forEach(item => {
        const itemCost = parseFloat(item.cost.substring(1)); // Assuming cost is in the format "$xx.xx"
        total += itemCost * item.quantity; // Multiply by quantity to get total for this item
      });
      return total.toFixed(2); // Return total amount formatted to 2 decimal places
    }
  
  };

  const handleContinueShopping = (e) => {
    e.preventDefault();
    onContinueShopping(e) // Call the function passed from ProductList to navigate back to the product list
    // Optionally, you can also reset the cart or perform any other actions needed when continuing shopping
  };

  const handleCheckout = (e) => {
    e.preventDefault();
    // Implement checkout logic here, such as navigating to a checkout page or processing the order
    console.log("Proceeding to checkout with items:", cart);    
    alert("Proceeding to checkout with items: " + JSON.stringify(cart));
    // You might want to clear the cart after checkout
    // dispatch(clearCart()); // Assuming you have a clearCart action to reset the cart
  };

  const handleIncrement = (item) => {
    const updatedItem = { ...item, quantity: item.quantity + 1 };
    dispatch(updateQuantity({ name: item.name, quantity: updatedItem.quantity }));
    // Optionally, you can also update the cart state here if needed
    // dispatch(addItem(updatedItem)); // If you want to add it again with updated quantity
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      const updatedItem = { ...item, quantity: item.quantity - 1 };
      dispatch(updateQuantity({ name: item.name, quantity: updatedItem.quantity }));
    } else {
      // If quantity is 1, you might want to remove the item instead
      dispatch(removeItem(item.name));
    }
   
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name)); // Dispatch the removeItem action to remove the item from the cart
    // Optionally, you can also update the cart state here if needed
    // dispatch(removeItem(item)); // If you want to remove it completely

    setAddedtoCart(prevState => ({
      ...prevState,
      [item.name]: false // Reset the added state for this item
    }));

  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
    return (parseFloat(item.cost.substring(1)) * item.quantity).toFixed(2);
  };

  const calculateTotalQuantity = (items) => {
    if (items && Array.isArray(items)) {
      return items.reduce((total, item) => total + item.quantity, 0);
    }
    return 0;
  }

  return (
    <div>
      <div className="cart-container">
        {cart.length === 0 && <p style={{ color: 'black' }}>Your cart is empty.</p>}  
      <div>
        <section className="cart-summary">
          <h2>
            <span style={{ fontWeight: 'lighter' , textAlign: 'left'}}>Total Cart Amount:</span>{' '}
            <span style={{ fontWeight: 'bold' , textAlign: 'right', fontSize: '18px'}}>${calculateTotalAmount(cart)}</span>
          </h2>
          <h2>
            <span style={{ fontWeight: 'lighter' , textAlign: 'left'}}>Number of Items:</span>{' '}
            <span style={{ fontWeight: 'bold' , textAlign: 'right', fontSize: '18px'}}>{calculateTotalQuantity(cart)}</span>
          </h2>
        </section>
        <h2 style={{ color: '#072f0b', padding: '30px 10px' , textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)' }}>Shopping Cart</h2>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">
                <span style={{ fontWeight: 'lighter' , textAlign: 'left'}}>Subtotal({item.quantity}):</span>{' '}
                <span style={{ fontWeight: 'bold' , textAlign: 'right', fontSize: '18px'}}>${calculateTotalCost(item)}</span>
              </div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
        <div>
          <button className="get-started-button1" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
        </div>
        <div>
          <button className="checkout-btn" onClick={(e) => handleCheckout(e)}>Checkout</button>
        </div>
      </div>
    </div>
  </div>
  );
};

export default CartItem;


