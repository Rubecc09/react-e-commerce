import { useEffect, useState } from "react";

const Sidebar = ({ selectedCategory, onSelectCategory }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch directly from fakestoreapi
    fetch("https://fakestoreapi.com/products/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  const itemStyle = (cat) => ({
    cursor: 'pointer',
    backgroundColor: selectedCategory === cat ? "#97C459" : "transparent",
    color: selectedCategory === cat ? "#27500A" : "#444",
    fontWeight: selectedCategory === cat ? "600" : "400",
    borderRadius: "8px",
    marginBottom: "4px",
    border: "none",
    textTransform: "capitalize",
    transition: "background-color 0.2s ease, color 0.2s ease",
  });

  return (
    <aside className="bg-light p-3 shadow-sm rounded">
      <h5>Categories</h5>
      <ul className="list-group">

        <li
          className="list-group-item list-group-item-action"
          style={itemStyle("all")}
          onClick={() => onSelectCategory("all")}
        >
          All Products
        </li>

        {categories.map((category, index) => (
          <li
            key={index}
            className="list-group-item list-group-item-action"
            style={itemStyle(category)}
            onClick={() => onSelectCategory(category)}
          >
            {category}
          </li>
        ))}

      </ul>
    </aside>
  );
};

export default Sidebar;