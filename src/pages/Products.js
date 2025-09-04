import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Products() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
const navigate = useNavigate();
  const selectedCategory = searchParams.get("category");
  const searchTerm = searchParams.get("search")?.toLowerCase() || "";
  const discountOnly = searchParams.get("discount") === "true"; // 👈 New

  const [allProducts, setAllProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 16;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let url = "";
      
        if (selectedCategory) {
          url = `https://dummyjson.com/products/category/${selectedCategory}`;
        } else {
          // sirf cosmetics related products
          url = `https://dummyjson.com/products/category/beauty`;
        }
      
        const res = await fetch(url);
        const data = await res.json();
        const allData = data.products || [];
      

        // Apply search filter if search term exists
        let filtered = allData;
        
        if (searchTerm) {
          filtered = allData.filter(
            (product) =>
              product.title.toLowerCase().includes(searchTerm) ||
              product.description.toLowerCase().includes(searchTerm) ||
              product.category.toLowerCase().includes(searchTerm)
          );
        }

        // Apply discount filter if discountOnly is true
        if (discountOnly) {
          console.log('Before discount filter count:', filtered.length);
          filtered = filtered.filter((p) => {
            console.log(`Product: ${p.title}, Discount: ${p.discountPercentage}%`);
            return p.discountPercentage > 0;
          });
          console.log('After discount filter count:', filtered.length);
        }

        console.log('Final filtered count:', filtered.length);
        setAllProducts(filtered);
        setCurrentPage(1);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    fetchProducts();
  }, [selectedCategory, searchTerm, discountOnly]);

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const visibleProducts = allProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const nextPage = () => {
    if (indexOfLastProduct < allProducts.length) {
      setCurrentPage((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
<Container className="mt-4">
  <div className="mb-5 text-center">
    <h2 
      className="fw-bold mb-3"
      style={{
        fontSize: '2.2rem',
        color: '#2c3e50',
        fontFamily: "'Poppins', sans-serif",
        position: 'relative',
        display: 'inline-block',
        paddingBottom: '10px'
      }}
    >
      {discountOnly 
        ? " Exclusive Offers — Grab the Best Deals Now "
        : " Welcome to Blue Mart — Discover Your Favorites "}
    </h2>
    <div 
      style={{
        height: '2px',
        width: '80px',
        background: '#2c3e50',
        margin: '12px auto 0',
        borderRadius: '2px',
        opacity: '0.7'
      }}
    />
  </div>

  <Row className="g-4">
    {visibleProducts.length > 0 ? (
      visibleProducts.map((product) => (
        <Col
          key={product.id}
          lg={3}
          md={4}
          sm={6}
          xs={12}
          data-aos="zoom-in"
        >
          <ProductCard product={product} />
        </Col>
      ))
    ) : (
      <div className="text-center py-5">
        <h4 className="text-muted ">
          {discountOnly
            ? "😕 No discounted items found in this category at the moment."
            : "No products match your search criteria."}
        </h4>
        {discountOnly && (
          <button
            className="btn btn-primary mt-1"
            onClick={() => navigate("/products")}
          >
            Browse All Products
          </button>
        )}
      </div>
    )}
  </Row>

  {/* Pagination */}
  {(currentPage > 1 || indexOfLastProduct < allProducts.length) && (
    <div className="d-flex justify-content-between mt-4 gap-3">
      {currentPage > 1 && (
        <Button variant="outline-primary" onClick={prevPage}>
          ← Previous Page
        </Button>
      )}

      {indexOfLastProduct < allProducts.length && (
        <Button variant="primary" onClick={nextPage}>
          Load More Products →
        </Button>
      )}
    </div>
  )}
</Container>

  );
}

export default Products;
