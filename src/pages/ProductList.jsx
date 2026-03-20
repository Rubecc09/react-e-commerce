import { useEffect, useState, useRef, useCallback } from "react";
import ProductCard from '../components/ProductCard';
import Sidebar from '../components/Sidebar';

const PRODUCTS_PER_PAGE = 8;

// Skeleton card shown while products are loading
const SkeletonCard = () => (
    <div className="card h-100" style={{
        borderRadius: "18px",
        overflow: "hidden",
        border: "1px solid rgba(0,0,0,0.08)",
    }}>
        {/* Image placeholder */}
        <div style={{
            height: "260px",
            backgroundColor: "#d8edbc",
            animation: "shimmer 1.5s infinite ease-in-out",
        }} />
        <div className="card-body">
            {/* Title placeholder */}
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
            {/* Price placeholder */}
            <div style={{
                height: "20px", width: "40%", borderRadius: "8px",
                backgroundColor: "#d8edbc", marginBottom: "16px",
                animation: "shimmer 1.5s infinite ease-in-out",
            }} />
            {/* Button placeholder */}
            <div style={{
                height: "38px", width: "100%", borderRadius: "980px",
                backgroundColor: "#d8edbc",
                animation: "shimmer 1.5s infinite ease-in-out",
            }} />
        </div>

        {/* Shimmer keyframes injected once */}
        <style>{`
            @keyframes shimmer {
                0%   { opacity: 1; }
                50%  { opacity: 0.4; }
                100% { opacity: 1; }
            }
        `}</style>
    </div>
);

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState("default");
    const [visibleCount, setVisibleCount] = useState(PRODUCTS_PER_PAGE);
    const [loadingMore, setLoadingMore] = useState(false);

    // Ref for the sentinel div
    const sentinelRef = useRef(null);

    useEffect(() => {
        fetch("https://fakestoreapi.com/products")
            .then((res) => res.json())
            .then((data) => {
                const formatted = data.map(item => ({
                    id: item.id,
                    name: item.title,
                    oldPrice: item.price * 1.25,
                    price: item.price,
                    discount: 20,
                    rating: Math.round(item.rating.rate),
                    image: item.image,
                    category: item.category
                }));
                setProducts(formatted);
                setLoading(false);
            })
            .catch((error) => {
                console.error("API Fetch Error:", error);
                setLoading(false);
            });
    }, []);

    // Reset visible count when filters/sort change
    useEffect(() => {
        setVisibleCount(PRODUCTS_PER_PAGE);
    }, [selectedCategory, searchTerm, sortBy]);

    // Filter + sort pipeline
    const filteredProducts = products
        .filter(p => selectedCategory === "all" || p.category === selectedCategory)
        .filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
        .sort((a, b) => {
            if (sortBy === "price-asc")  return a.price - b.price;
            if (sortBy === "price-desc") return b.price - a.price;
            if (sortBy === "name")       return a.name.localeCompare(b.name);
            return 0;
        });

    const visibleProducts = filteredProducts.slice(0, visibleCount);
    const hasMore = visibleCount < filteredProducts.length;

    // IntersectionObserver
    const handleObserver = useCallback((entries) => {
        const target = entries[0];
        if (target.isIntersecting && hasMore && !loadingMore) {
            setLoadingMore(true);
            // Small delay to show the skeleton loading tiles briefly
            setTimeout(() => {
                setVisibleCount(prev => prev + PRODUCTS_PER_PAGE);
                setLoadingMore(false);
            }, 700);
        }
    }, [hasMore, loadingMore]);

    useEffect(() => {
        const observer = new IntersectionObserver(handleObserver, { threshold: 0.1 });
        if (sentinelRef.current) observer.observe(sentinelRef.current);
        return () => observer.disconnect();
    }, [handleObserver]);

    const formatHeading = (cat) =>
        cat === "all"
            ? "All Products"
            : cat.replace(/\b\w/g, c => c.toUpperCase());

    const controlStyle = {
        borderRadius: "980px",
        border: "2px solid #3B6D11",
        padding: "0.5em 1.2em",
        fontSize: "0.9rem",
        backgroundColor: "#f9fdf4",
        outline: "none",
    };

    return (
        <div className="container">
            <div className="row">

                <div className="col-lg-2 col-md-3 mb-4">
                    <Sidebar
                        selectedCategory={selectedCategory}
                        onSelectCategory={(cat) => {
                            setSelectedCategory(cat);
                            setSearchTerm("");
                        }}
                    />
                </div>

                <div className="col-lg-10 col-md-9">

                    {/* Heading + Search + Sort */}
                    <div className="d-flex align-items-center justify-content-between mb-3 gap-3 flex-wrap">
                        <h2 className="mb-0">{formatHeading(selectedCategory)}</h2>
                        <div className="d-flex gap-2">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search products..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                style={{ ...controlStyle, maxWidth: "220px" }}
                            />
                            <select
                                className="form-select"
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                style={{ ...controlStyle, maxWidth: "200px", cursor: "pointer" }}
                            >
                                <option value="default">Sort: Default</option>
                                <option value="price-asc">Price: Low to High</option>
                                <option value="price-desc">Price: High to Low</option>
                                <option value="name">Name: A to Z</option>
                            </select>
                        </div>
                    </div>

                    {/* No results message */}
                    {!loading && filteredProducts.length === 0 && (
                        <p className="text-muted">No products found for "{searchTerm}".</p>
                    )}

                    <div className="row">
                        {/* Initial skeleton */}
                        {loading && Array.from({ length: PRODUCTS_PER_PAGE }).map((_, i) => (
                            <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={`skeleton-${i}`}>
                                <SkeletonCard />
                            </div>
                        ))}

                        {/* Real products */}
                        {!loading && visibleProducts.map((product) => (
                            <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={product.id}>
                                <ProductCard product={product} />
                            </div>
                        ))}

                        {/* Inline skeleton tiles */}
                        {loadingMore && Array.from({ length: PRODUCTS_PER_PAGE }).map((_, i) => (
                            <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={`more-skeleton-${i}`}>
                                <SkeletonCard />
                            </div>
                        ))}
                    </div>

                    {/* Sentinel div */}
                    <div ref={sentinelRef} style={{ height: "1px" }} />

                    {/* End of results message */}
                    {!loading && !hasMore && filteredProducts.length > 0 && (
                        <p className="text-center text-muted mb-4" style={{ fontSize: "0.9rem" }}>
                            You've seen all {filteredProducts.length} products.
                        </p>
                    )}

                </div>
            </div>
        </div>
    );
};

export default ProductList;