import React from "react";
import { useNavigate } from "react-router-dom";
import "./CategoryGrid.css";

const categories = [
    { name: "smartphones", image: "/categories/smartphone.avif" },
    { name: "laptops", image: "/categories/laptops.jpeg" },
    { name: "fragrances", image: "/categories/fragrances.webp" },
    { name: "groceries", image: "/categories/groceries.jpg" },
    { name: "furniture", image: "/categories/furniture.jpeg" },
    { name: "tops", image: "/categories/tops.jpg" },
];

function CategoryGrid() {
    const navigate = useNavigate();

    const handleClick = (category) => {
        navigate(`/products?category=${category}`);
    };

    return (
        <section data-aos="slide-up">
        <div className="category-grid-container">
            <h2 className="text-center text-primary fw-bold mb-4">Shop by Category</h2>
            <div className="category-grid">
                {categories.map((cat, index) => (
                    <div
                        key={cat.name}
                        className="category-card"
                        onClick={() => handleClick(cat.name)}
                        style={{ animationDelay: `${index * 0.2}s` }} // 👈 new
                    >
                        <img src={cat.image} alt={cat.name} className="category-image" />
                        <div className="category-name">{cat.name.toUpperCase()}</div>
                    </div>
                ))}

            </div>
        </div>
        </section>
    );
}

export default CategoryGrid;
