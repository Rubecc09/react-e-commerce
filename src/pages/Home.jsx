import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import banner1 from '../assets/images/banner1.jpg';
import banner2 from '../assets/images/banner2.jpg';
import banner3 from '../assets/images/banner3.jpg';
import ProductCard from '../components/ProductCard';

const SkeletonCard = () => (
    <div className="card h-100" style={{
        borderRadius: "18px",
        overflow: "hidden",
        border: "1px solid rgba(0,0,0,0.08)",
    }}>
        <div style={{
            height: "260px",
            backgroundColor: "#d8edbc",
            animation: "shimmer 1.5s infinite ease-in-out",
        }} />
        <div className="card-body">
            <div style={{
                height: "16px", width: "80%", borderRadius: "8px",
                backgroundColor: "#d8edbc", marginBottom: "8px",
                animation: "shimmer 1.5s infinite ease-in-out",
            }} />
            <div style={{
                height: "16px", width: "55%", borderRadius: "8px",
                backgroundColor: "#d8edbc", marginBottom: "16px",
                animation: "shimmer 1.5s infinite ease-in-out",
            }} />
            <div style={{
                height: "20px", width: "40%", borderRadius: "8px",
                backgroundColor: "#d8edbc", marginBottom: "16px",
                animation: "shimmer 1.5s infinite ease-in-out",
            }} />
            <div style={{
                height: "38px", width: "100%", borderRadius: "980px",
                backgroundColor: "#d8edbc",
                animation: "shimmer 1.5s infinite ease-in-out",
            }} />
        </div>
        <style>{`
            @keyframes shimmer {
                0%   { opacity: 1; }
                50%  { opacity: 0.4; }
                100% { opacity: 1; }
            }
        `}</style>
    </div>
);

const Home = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("https://fakestoreapi.com/products")
            .then((res) => res.json())
            .then((data) => {
                const formatted = data.slice(0, 4).map(item => ({
                    id: item.id,
                    name: item.title,
                    oldPrice: item.price * 1.25,
                    price: item.price,
                    discount: 20,
                    rating: Math.round(item.rating.rate),
                    image: item.image
                }));
                setProducts(formatted);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching live products:", err);
                setLoading(false);
            });
    }, []);

    return (
        <div className="container mt-4">
            {/* Carousel */}
            <div id="homeCarousel" className="carousel slide mb-5 shadow" data-bs-ride="carousel">
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#homeCarousel" data-bs-slide-to="0" className="active"></button>
                    <button type="button" data-bs-target="#homeCarousel" data-bs-slide-to="1"></button>
                    <button type="button" data-bs-target="#homeCarousel" data-bs-slide-to="2"></button>
                </div>
                <div className="carousel-inner rounded">
                    <div className="carousel-item active">
                        <img src={banner1} className="d-block w-100" alt="Banner 1" style={{ height: '400px', objectFit: 'cover' }} />
                    </div>
                    <div className="carousel-item">
                        <img src={banner2} className="d-block w-100" alt="Banner 2" style={{ height: '400px', objectFit: 'cover' }} />
                    </div>
                    <div className="carousel-item">
                        <img src={banner3} className="d-block w-100" alt="Banner 3" style={{ height: '400px', objectFit: 'cover' }} />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#homeCarousel" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon"></span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#homeCarousel" data-bs-slide="next">
                    <span className="carousel-control-next-icon"></span>
                </button>
            </div>

            {/* Header with View More Button */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Featured Products</h2>
                <Link to="/products" className="btn btn-outline-primary">
                    View More Products
                </Link>
            </div>

            {/* Product Grid */}
            <div className="row">
                {loading
                    ? Array.from({ length: 4 }).map((_, i) => (
                        <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={`skeleton-${i}`}>
                            <SkeletonCard />
                        </div>
                    ))
                    : products.map((product) => (
                        <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={product.id}>
                            <ProductCard product={product} />
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default Home;