import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Row, Col, Image, Spinner, Button } from "react-bootstrap";
import { useCart } from "../context/CartContext";
import ProductCard from "../components/ProductCard"; // ✅ Import your reusable card component

function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedProducts, setRelatedProducts] = useState([]);

 useEffect(() => {
  window.scrollTo(0, 0); // 👈 Page scroll to top
  const fetchData = async () => {
    const res = await fetch(`https://dummyjson.com/products/${id}`);
    const data = await res.json();
    setProduct(data);
    setLoading(false);

    const relatedRes = await fetch(`https://dummyjson.com/products/category/${data.category}`);
    const relatedData = await relatedRes.json();
    const filtered = relatedData.products.filter(p => p.id !== data.id);
    setRelatedProducts(filtered);
  };

  fetchData();
}, [id]);


  if (loading || !product) {
    return (
      <Container className="text-center my-5">
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <Row className="mb-4">
        <Col md={6}>
          <Image src={product.thumbnail} fluid rounded />
        </Col>
        <Col md={6}>
          <h2 className="text-primary fw-bold">{product.title}</h2>
          <p className="text-muted">{product.brand}</p>
          <h4>${product.price}</h4>
          <p>{product.description}</p>
          <Button
            variant="primary"
            className="mt-4"
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </Button>
        </Col>
      </Row>

      {/* ✅ Related Products Section */}
      <h4 className="text-dark fw-bold mb-3 mt-5">Related Products</h4>
      <Row className="g-4">
        {relatedProducts.map((prod) => (
          <Col key={prod.id} lg={3} md={4} sm={6} xs={12}>
            <Link to={`/product/${prod.id}`} style={{ textDecoration: "none" }}>
              <ProductCard product={prod} />
            </Link>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default ProductDetail;
