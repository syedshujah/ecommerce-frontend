import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useLocation } from "react-router-dom";

function Products() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const selectedCategory = searchParams.get("category");
  const searchTerm = searchParams.get("search")?.toLowerCase() || "";

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
          url = `https://dummyjson.com/products?limit=100`;
        }

        const res = await fetch(url);
        const data = await res.json();
        const allData = data.products || [];

        // Filter search (category already handled by URL)
        const filtered = allData.filter((product) =>
          product.title.toLowerCase().includes(searchTerm) ||
          product.description.toLowerCase().includes(searchTerm) ||
          product.category.toLowerCase().includes(searchTerm)
        );

        setAllProducts(searchTerm ? filtered : allData);
        setCurrentPage(1);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    fetchProducts();
  }, [selectedCategory, searchTerm]);

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const visibleProducts = allProducts.slice(indexOfFirstProduct, indexOfLastProduct);

 const nextPage = () => {
  if (indexOfLastProduct < allProducts.length) {
    setCurrentPage((prev) => prev + 1);

    // 👇 Auto Scroll to Top After Loading New Page
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Smooth scroll
    });
  }
};


  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
        window.scrollTo({
      top: 0,
      behavior: "smooth", // Smooth scroll
    });
    }
  };

  return (
    <Container className="mt-4">
      <h3 className="mb-4 text-center text-primary fw-bold">
        Shop from Blue Mart
      </h3>

      <Row className="g-4">
        {visibleProducts.length > 0 ? (
          visibleProducts.map((product) => (
            <Col key={product.id} lg={3} md={4} sm={6} xs={12} data-aos="zoom-in">
              <ProductCard product={product} />
            </Col>
          ))
        ) : (
          <p className="text-center text-muted">No products found.</p>
        )}
      </Row>

      {/* Pagination Buttons */}
     
       {(currentPage > 1 || indexOfLastProduct < allProducts.length) && (
  <div className="d-flex justify-content-between mt-4 gap-3">
    {currentPage > 1 && (
      <Button variant="outline-primary" onClick={prevPage}>
        Previous
      </Button>
    )}

    {indexOfLastProduct < allProducts.length && (
      <Button variant="primary" onClick={nextPage}>
        Load More
      </Button>
    )}
  </div>
)}


   
    </Container>
  );
}

export default Products;
