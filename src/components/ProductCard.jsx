import { useCart } from '../context/CartContext'; // Import useCart hook

const ProductCard = ({ product }) => {
  const { addToCart } = useCart(); // Access global addToCart function

  return (
    <div className="card h-100 shadow-sm">
      {/* Image wrapper for zoom and badge */}
      <div className="product-img-wrapper">
        {/* Sale badge - only shows if product has a discount */}
        {product.discount && (
          <div className="sale-badge">-{product.discount}%</div>
        )}
        <img
          src={product.image}
          className="card-img-top product-img"
          alt={product.name}
        />
      </div>

      <div className="card-body d-flex flex-column">
        <h6 className="card-title">{product.name}</h6>
        
        {/* Star rating */}
        <div className="mb-2 text-warning">
          {[...Array(5)].map((star, index) => (
            <i
              key={index}
              className={`fa-star ${index < product.rating ? 'fas' : 'far'}`}
            ></i>
          ))}
        </div>

        {/* Price section */}
        <div className="mb-2">
          <span className="text-muted text-decoration-line-through me-2">
            P{product.oldPrice}
          </span>
          <span className="fw-bold text-danger">
            P{product.price}
          </span>
        </div>

        {/* Add to Cart Button with onClick handler */}
        <button 
          className="btn btn-primary mt-auto" 
          onClick={() => addToCart(product)}
        >
          <i className="fas fa-shopping-cart me-2"></i>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;