// src/components/FeaturedProducts.js
import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./FeaturedProducts.css";

function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await fetch("https://dummyjson.com/products?limit=8");
        const data = await res.json();
        setProducts(data.products);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching featured products:", err);
      }
    };

    fetchFeatured();
  }, []);

  const truncateName = (name, maxLength = 13) => {
    if (name.length > maxLength) {
      return name.slice(0, maxLength) + "...";
    }
    return name;
  };

  if (loading) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  return (
    <section className="featured-section" data-aos="zoom-in">
      <div className="categories-row">
        {products.map((product) => (
          <Link
            key={product.id}
            to={`/product/${product.id}`}
            className="category-item"
          >
            <div className="category-img">
              <img src={product.thumbnail} alt={product.title} />
            </div>
            <span
              className="category-name"
              title={product.title}   // hover pe full name dikhayega
            >
              {truncateName(product.title)}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default FeaturedProducts;
