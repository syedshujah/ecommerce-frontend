import React from "react";
import "./TrendingProducts.css"
function TrendingCategories({ categories }) {
    categories = [
        {id:1, name: "Skincare", image: "/categories/img1.jpg" },
        {id:2, name: "Makeup", image: "/categories/img2.jpg" },
        {id:3, name: "Beauty Tools", image: "/categories/img3.webp" },
        {id:4, name: "Hair Care", image: "/categories/img4.webp" },
        {id:5, name: "Fragrances", image: "/categories/img5.webp" },
        {id:6, name: "Sunblock", image: "/categories/img6.jpg" },
        {id:7, name: "Serums", image: "/categories/img7.jpg" },
        {id:8, name: "Facewash", image: "/categories/img8.webp" },
      ];
  return (
    <section className="trending-categories-section">
      <h2 className="section-title">Trending Categories</h2>
      <div className="categories-grid">
        {categories.map((cat) => (
          <div key={cat.id} className="category-card">
            <div className="category-img">
              <img src={cat.image} alt={cat.name} />
            </div>
            <div className="category-name">{cat.name}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default TrendingCategories;
