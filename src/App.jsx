import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';

// Import Components
import Header from './components/Header.jsx';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';

// Import Pages
import Home from './pages/Home.jsx';
import ProductList from './pages/ProductList.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import Policies from './pages/Policies.jsx';
import Cart from './pages/Cart.jsx';
import Checkout from './pages/Checkout.jsx';

function App() {
  return (
    <Router>
      <Header />
      {/* This is your Desktop Navbar */}
      <Navbar />

      {/* MOBILE BOTTOM NAVIGATION - Added from Module 5 */}
      <nav className="navbar fixed-bottom bg-light border-top d-lg-none shadow-lg">
        <div className="container-fluid d-flex justify-content-around text-center">
          {/* Home */}
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive ? "text-primary text-decoration-none" : "text-dark text-decoration-none"
            }
          >
            <div>
              <i className="fa fa-home fs-5"></i>
              <div style={{ fontSize: "12px" }}>Home</div>
            </div>
          </NavLink>

          {/* Products */}
          <NavLink
            to="/products"
            className={({ isActive }) =>
              isActive ? "text-primary text-decoration-none" : "text-dark text-decoration-none"
            }
          >
            <div>
              <i className="fa fa-box fs-5"></i>
              <div style={{ fontSize: "12px" }}>Products</div>
            </div>
          </NavLink>

          {/* Cart */}
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              isActive ? "text-primary text-decoration-none" : "text-dark text-decoration-none"
            }
          >
            <div>
              <i className="fa fa-shopping-cart fs-5"></i>
              <div style={{ fontSize: "12px" }}>Cart</div>
            </div>
          </NavLink>

          {/* About */}
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? "text-primary text-decoration-none" : "text-dark text-decoration-none"
            }
          >
            <div>
              <i className="fa fa-info-circle fs-5"></i>
              <div style={{ fontSize: "12px" }}>About</div>
            </div>
          </NavLink>

          {/* Contact */}
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive ? "text-primary text-decoration-none" : "text-dark text-decoration-none"
            }
          >
            <div>
              <i className="fa fa-phone fs-5"></i>
              <div style={{ fontSize: "12px" }}>Contact</div>
            </div>
          </NavLink>
        </div>
      </nav>

      <main style={{ minHeight: '80vh' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/policies" element={<Policies />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </main>

      <Footer />
    </Router>
  );
}

export default App;