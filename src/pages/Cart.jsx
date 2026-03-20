import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const [selectedItems, setSelectedItems] = useState(new Set());

  useEffect(() => {
    const cartIds = new Set(cart.map((item) => item.id));
    const newSelected = new Set(
      Array.from(selectedItems).filter((id) => cartIds.has(id))
    );
    setSelectedItems(newSelected);
  }, [cart]);

  const toggleSelect = (id) => {
    const newSelected = new Set(selectedItems);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedItems(newSelected);
  };

  const selectedTotal = cart
    .filter((item) => selectedItems.has(item.id))
    .reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Shopping Cart</h2>
      
      {cart.length === 0 ? (
        <p className="text-center">Your cart is empty.</p>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item.id} className="d-flex align-items-center mb-4 border-bottom pb-4">
              <input
                type="checkbox"
                className="form-check-input me-3"
                checked={selectedItems.has(item.id)}
                onChange={() => toggleSelect(item.id)}
                style={{ width: '20px', height: '20px' }}
              />

              <img
                src={item.image}
                alt={item.name}
                style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                className="rounded me-3"
              />
              <div className="flex-grow-1">
                <h5>{item.name}</h5>
                <p className="text-muted mb-1">₱{item.price}</p>
                
                <div className="d-flex align-items-center mt-2">
                  <button 
                    className="btn btn-outline-secondary btn-sm" 
                    onClick={() => updateQuantity(item.id, -1)}
                  >
                    -
                  </button>
                  <span className="mx-3 fw-bold">{item.quantity}</span>
                  <button 
                    className="btn btn-outline-secondary btn-sm" 
                    onClick={() => updateQuantity(item.id, 1)}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="text-end ms-3">
                <button 
                  className="btn btn-danger btn-sm" 
                  onClick={() => removeFromCart(item.id)}
                >
                  <i className="fas fa-trash me-1"></i> Remove
                </button>
              </div>
            </div>
          ))}

          {/* Total & Checkout Button */}
          <div className="mt-4 text-end">
            <h4>
              Selected Total: <span className="text-danger">₱{selectedTotal.toFixed(2)}</span>
            </h4>
            
            {/* Checkout Button - navigates to /checkout */}
            <Link 
              to="/checkout" 
              className={`btn btn-success mt-2 ${selectedItems.size === 0 ? 'disabled' : ''}`}
              style={{ textDecoration: 'none' }}
            >
              Proceed to Checkout ({selectedItems.size})
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;