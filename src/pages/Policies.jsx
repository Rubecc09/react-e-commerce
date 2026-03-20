import React from 'react';

const Policies = () => {
  return (
    <div className="container mt-5 mb-5">
      <div className="text-center mb-5">
        <h2 className="fw-bold display-5">Store Policies</h2>
        <p className="text-muted">Everything you need to know about shopping with us.</p>
      </div>

      <div className="row g-4">
        {/* Shipping Policy */}
        <div className="col-md-4">
          <div className="card h-100 border-0 shadow-sm p-3">
            <div className="card-body">
              <div className="mb-3 text-primary">
                <i className="fas fa-shipping-fast fa-2x"></i>
              </div>
              <h4 className="card-title fw-bold">Shipping & Delivery</h4>
              <p className="card-text text-muted">
                We provide nationwide fulfillment through our logistics partners, **LBC** and **J&T Express**. 
                Orders within Metro Manila typically arrive in 1-2 business days, while provincial areas may take 3-5 business days.
              </p>
            </div>
          </div>
        </div>

        {/* Return Policy */}
        <div className="col-md-4">
          <div className="card h-100 border-0 shadow-sm p-3">
            <div className="card-body">
              <div className="mb-3 text-danger">
                <i className="fas fa-undo-alt fa-2x"></i>
              </div>
              <h4 className="card-title fw-bold">Returns & Warranty</h4>
              <p className="card-text text-muted">
                Our items come with a **7-day replacement guarantee** for factory defects. 
                Standard manufacturer warranties apply thereafter. Please ensure all original packaging and receipts are retained for validation.
              </p>
            </div>
          </div>
        </div>

        {/* Terms & Conditions */}
        <div className="col-md-4">
          <div className="card h-100 border-0 shadow-sm p-3">
            <div className="card-body">
              <div className="mb-3 text-success">
                <i className="fas fa-user-shield fa-2x"></i>
              </div>
              <h4 className="card-title fw-bold">Terms of Service</h4>
              <p className="card-text text-muted">
                By accessing this site, you agree to comply with the **Cybercrime Prevention Act of 2012** and local consumer protection laws. 
                We reserve the right to verify high-value transactions for security purposes.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 p-4 bg-light rounded text-center">
        <p className="mb-0 small text-secondary">
          Last Updated: February 2026 | My E-Commerce Store Philippines
        </p>
      </div>
    </div>
  );
};

export default Policies;