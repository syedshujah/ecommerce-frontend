import React from "react";
import { useNavigate } from "react-router-dom";
import "./CategoryGrid.css";

const categories = [
  { name: "Skincare", image: "/categories/img1.png" },
  { name: "Makeup", image: "/categories/img2.png" },
  { name: "Beauty Tools", image: "/categories/img3.png" },
  { name: "Hair Care", image: "/categories/img4.png" },
  { name: "Fragrances", image: "/categories/img5.png" },
  { name: "Sunblock", image: "/categories/img6.png" },
  { name: "Serums", image: "/categories/img7.png" },
  { name: "Facewash", image: "/categories/img8.png" },
];

function CategoryGrid() {
  const navigate = useNavigate();

  const handleClick = (category) => {
    navigate(`/products?category=${category}`);
  };

  return (
    <section className="cg-container">
      <div className="cg-grid">
        {categories.map((cat, index) => (
          <div
            key={cat.name}
            className="cg-item"
            onClick={() => handleClick(cat.name)}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="cg-img">
              <img src={cat.image} alt={cat.name} />
            </div>
            <div className="cg-name" title={cat.name}>
              {cat.name.toUpperCase()}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default CategoryGrid;
