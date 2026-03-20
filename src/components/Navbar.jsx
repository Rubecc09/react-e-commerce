import { NavLink, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext'; // Import useCart hook

const Navbar = () => {
  const { cartCount } = useCart(); // Access global cartCount

  const getNavLinkClass = ({ isActive }) => 
    isActive ? "nav-link active" : "nav-link";

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        
        <Link className="navbar-brand" to="/">E-Shop</Link>
        
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink className={getNavLinkClass} to="/" end>
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={getNavLinkClass} to="/products">
                Products
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={getNavLinkClass} to="/about">
                About
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={getNavLinkClass} to="/contact">
                Contact
              </NavLink>
            </li>
            
            <li className="nav-item">
              <NavLink className={getNavLinkClass} to="/policies">
                Policies
              </NavLink>
            </li>

            {/* Cart Icon with Badge */}
            <li className="nav-item">
              <NavLink className={getNavLinkClass} to="/cart">
                <i className="fas fa-shopping-cart"></i>
                {/* Badge showing total items */}
                <span className="badge bg-danger rounded-pill ms-1">
                  {cartCount}
                </span>
              </NavLink>
            </li>
            
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;