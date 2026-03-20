import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-dark text-white text-center p-4 mt-5">
      <p>&copy; 2026 My E-Commerce Store. All rights reserved.</p>
      
      <div>
        <i className="fab fa-facebook fa-lg mx-2" style={{ cursor: 'pointer' }}></i>
        <i className="fab fa-twitter fa-lg mx-2" style={{ cursor: 'pointer' }}></i>
        <i className="fab fa-instagram fa-lg mx-2" style={{ cursor: 'pointer' }}></i>
      </div>
    </footer>
  );
};

export default Footer;