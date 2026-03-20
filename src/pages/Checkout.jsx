import { useContext, useState } from 'react';
import { useCart } from '../context/CartContext';

const Checkout = () => {
  const { cart, clearCart } = useCart();

  const [form, setForm] = useState({
    name: '',
    email: '',
    address: '',
    phone: '',
    payment: 'cod'
  });

  const [submitted, setSubmitted] = useState(false);
  const [finalTotal, setFinalTotal] = useState(0);

  
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.12;
  const total = subtotal + tax;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.address || !form.phone) {
      alert("Please complete all fields");
      return;
    }

    setFinalTotal(total);
    clearCart();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="container mt-5 text-center">
        <h2>Order Confirmed!</h2>
        <p>Thank you, {form.name}. Your order has been placed.</p>
        <p className="fs-4">Total Amount: <strong>₱{finalTotal.toFixed(2)}</strong></p>
        <a href="/" className="btn btn-primary mt-3">Continue Shopping</a>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2>Checkout</h2>
      <div className="row">
        
        {/* Checkout Form */}
        <div className="col-md-6">
          <h4>Customer Information</h4>
          <form onSubmit={handleSubmit}>
            <div className="mb-2">
              <label>Name *</label>
              <input type="text" name="name" className="form-control" onChange={handleChange} required />
            </div>
            <div className="mb-2">
              <label>Email *</label>
              <input type="email" name="email" className="form-control" onChange={handleChange} required />
            </div>
            <div className="mb-2">
              <label>Address *</label>
              <textarea name="address" className="form-control" onChange={handleChange} required></textarea>
            </div>
            <div className="mb-2">
              <label>Phone *</label>
              <input type="text" name="phone" className="form-control" onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label>Payment Method</label>
              <select name="payment" className="form-control" onChange={handleChange}>
                <option value="cod">Cash on Delivery</option>
                <option value="gcash">GCash</option>
                <option value="card">Credit Card</option>
              </select>
            </div>
            <button type="submit" className="btn btn-success w-100">Place Order</button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="col-md-6">
          <h4>Order Summary</h4>
          {cart.length === 0 ? (
            <p className="text-muted">Your cart is empty.</p>
          ) : (
            <>
              {cart.map(item => (
                <div key={item.id} className="d-flex justify-content-between border-bottom py-2">
                  <span>{item.name} × {item.quantity}</span>
                  <span>₱{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <hr />
              <div className="d-flex justify-content-between">
                <span>Subtotal:</span>
                <span>₱{subtotal.toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span>Tax (12%):</span>
                <span>₱{tax.toFixed(2)}</span>
              </div>
              <h5 className="d-flex justify-content-between mt-3">
                <span>Total:</span>
                <span>₱{total.toFixed(2)}</span>
              </h5>
            </>
          )}
        </div>

      </div>
    </div>
  );
};

export default Checkout;