import React,{ useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const [totalAmount,setTotalAmount] = useState(0)
  const dispatch = useDispatch();

  useEffect(() => {
    const calculateTotalAmount = () => {
        let totalCost = 0;
        cart.forEach(item => {
        
        const itemCost = parseFloat(item.cost.replace('$', ''));
        const itemQuantity = parseInt(item.quantity, 10);
        totalCost += itemCost * itemQuantity;
        
    });
        setTotalAmount(totalCost);
    };

    calculateTotalAmount();
    }, [cart]);


    const handleIncrement = (item) => {
        const updatedItem = {...item, quantity: item.quantity + 1};
        dispatch(updateQuantity(updatedItem));
    };

    const handleDecrement = (item) => {
      if (item.quantity > 1) {
        const updatedItem = {...item, quantity: item.quantity - 1};
        dispatch(updateQuantity(updatedItem));
    } else {
        dispatch(removeItem(item.name));
    }
    };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  const calculateTotalCost = (item) => {
    return (parseFloat(item.cost.replace('$', '')) * parseInt(item.quantity, 10)).toFixed(2);
  };

  const handleCheckoutShopping = (e) => {
    alert('Functionality to be added for future reference');
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${totalAmount.toFixed(2)}</h2>
      <div>
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
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={onContinueShopping}>Continue Shopping</button>
        <br />
        <button className="get-started-button1" onClick={handleCheckoutShopping}>Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;


