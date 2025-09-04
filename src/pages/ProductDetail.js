import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Container, Row, Col, Image, Spinner, Button, Form, Nav } from "react-bootstrap";
import { useCart } from "../context/CartContext";
import ProductCard from "../components/ProductCard";
import { showAddToCartToast } from "../utils/useToast";
import "./ProductDetail.css"; // custom CSS

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("Medium");
  const [arrivedBy, setArrivedBy] = useState(null);
  const [activeTab, setActiveTab] = useState("description");

  // Reviews state
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");

  // Selected Image state
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchData = async () => {
      const res = await fetch(`https://dummyjson.com/products/${id}`);
      const data = await res.json();
      setProduct(data);
      setSelectedImage(data.images[0]); // default main image
      setLoading(false);

      // simulate arrival date
      const arrivalDate = new Date();
      arrivalDate.setDate(arrivalDate.getDate() + 5);
      setArrivedBy(
        arrivalDate.toLocaleDateString(undefined, {
          weekday: "long",
          month: "short",
          day: "numeric",
        })
      );

      const relatedRes = await fetch(
        `https://dummyjson.com/products/category/${data.category}`
      );
      const relatedData = await relatedRes.json();
      const filtered = relatedData.products.filter((p) => p.id !== data.id);
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

  const hasDiscount = product.discountPercentage && product.discountPercentage > 0;
  const originalPrice = product.price;
  const discountPercent = product.discountPercentage || 0;
  const discountedPrice = hasDiscount
    ? (originalPrice * (100 - discountPercent)) / 100
    : originalPrice;

  const sizes = ["Small", "Medium", "Large"];

  const handleAddToCart = () => {
    addToCart({ ...product, quantity, selectedSize });
    showAddToCartToast(product);
  };

  const handleBuyNow = () => {
    addToCart({ ...product, quantity, selectedSize });
    navigate("/cart");
  };

  // Handle Review Submit
  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (rating === 0 || reviewText.trim() === "") return;

    const newReview = {
      id: Date.now(),
      rating,
      text: reviewText,
    };
    setReviews([newReview, ...reviews]);
    setRating(0);
    setReviewText("");
  };

  return (
    <Container className="my-5 product-detail-page">
      {/* Top Section: Image + Details */}
      <Row className="mb-5 align-items-center">
        {/* Left side - Image Gallery */}
        <Col md={6} className="text-center">
          <div className="main-image mb-3">
            <Image
              src={selectedImage}
              fluid
              rounded
              className="product-image"
            />
          </div>

          {/* Thumbnails */}
          <div className="d-flex justify-content-center gap-2 flex-wrap">
            {product.images.slice(0, 5).map((img, index) => (
              <Image
                key={index}
                src={img}
                thumbnail
                className="small-preview"
                style={{
                  width: "70px",
                  height: "70px",
                  cursor: "pointer",
                  border: selectedImage === img ? "2px solid #007bff" : "1px solid #ddd",
                }}
                onClick={() => setSelectedImage(img)}
              />
            ))}
          </div>
        </Col>

        {/* Right side - Details */}
        <Col md={6} className="p-3 product-detail-right">
          <h2 className="product-title">{product.title}</h2>
          <p className="product-tracking">
            SKU: <span className="fw-semibold">#{product.id}</span>
          </p>

          {/* Price */}
          <div className="mb-4">
            {hasDiscount ? (
              <>
                <span className="text-muted text-decoration-line-through me-2">
                  ${originalPrice.toFixed(2)}
                </span>
                <span className="price-highlight">
                  ${discountedPrice.toFixed(2)}
                </span>
                <span className="discount-badge">
                  {discountPercent.toFixed(0)}% OFF
                </span>
              </>
            ) : (
              <span className="price-highlight">
                ${originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          {/* Size */}
          <Form.Group className="mb-4">
            <Form.Label className="section-label">Select Size</Form.Label>
            <div className="d-flex gap-2">
              {sizes.map((size) => (
                <Button
                  key={size}
                  variant={selectedSize === size ? "primary" : "outline-secondary"}
                  onClick={() => setSelectedSize(size)}
                  className="size-btn"
                >
                  {size}
                </Button>
              ))}
            </div>
          </Form.Group>

          {/* Quantity */}
          <Form.Group className="mb-4">
            <Form.Label className="section-label">Quantity</Form.Label>
            <div className="quantity-wrapper">
              <button
                type="button"
                className="qty-btn"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                –
              </button>

              <Form.Control
                type="number"
                min={1}
                max={product.stock || 100}
                value={quantity}
                onChange={(e) =>
                  setQuantity(
                    Math.max(1, Math.min(product.stock || 100, Number(e.target.value)))
                  )
                }
                className="qty-input"
              />

              <button
                type="button"
                className="qty-btn"
                onClick={() =>
                  setQuantity(Math.min(product.stock || 100, quantity + 1))
                }
              >
                +
              </button>
            </div>
          </Form.Group>

          {/* Buttons */}
          <div className="d-flex gap-3 mb-4">
            <Button onClick={handleAddToCart} className="add-cart-btn flex-grow-1">
              🛒 Add to Cart
            </Button>
            <Button onClick={handleBuyNow} className="buy-now-btn flex-grow-1">
              💳 Buy Now
            </Button>
          </div>

          {/* Delivery Info */}
          {arrivedBy && (
            <p className="product-info">
              🚚 Arrives by <strong>{arrivedBy}</strong>
            </p>
          )}
          <p className="product-info">💵 Cash on Delivery Available</p>
          <p className="product-info">🔄 7 Days Return & Exchange</p>
        </Col>
      </Row>

      {/* Tabs Section */}
      <div className="product-tabs">
        <Nav variant="tabs" activeKey={activeTab} onSelect={(k) => setActiveTab(k)}>
          <Nav.Item>
            <Nav.Link eventKey="description">Description</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="reviews">Reviews</Nav.Link>
          </Nav.Item>
        </Nav>
        <div className="tab-content p-4 bg-white rounded shadow-sm">
          {activeTab === "description" && (
            <p className="product-description">{product.description}</p>
          )}

          {activeTab === "reviews" && (
            <div>
              {/* Review Form */}
              <Form onSubmit={handleReviewSubmit} className="review-form mb-4">
                <Form.Label className="fw-bold">Your Rating</Form.Label>
                <div className="rating-stars mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={`star ${star <= rating ? "filled" : ""}`}
                      onClick={() => setRating(star)}
                    >
                      ★
                    </span>
                  ))}
                </div>

                <Form.Group className="mb-3">
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Write your review..."
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                  />
                </Form.Group>

                <Button type="submit" className="submit-review-btn">
                  Submit Review
                </Button>
              </Form>

              {/* Reviews List */}
              <div className="reviews-list">
                {reviews.length === 0 ? (
                  <p className="text-muted">⭐ No reviews yet.</p>
                ) : (
                  reviews.map((rev) => (
                    <div key={rev.id} className="review-item mb-3 p-3 border rounded">
                      <div className="d-flex align-items-center mb-2">
                        {[...Array(rev.rating)].map((_, i) => (
                          <span key={i} className="star filled">★</span>
                        ))}
                        {[...Array(5 - rev.rating)].map((_, i) => (
                          <span key={i} className="star">★</span>
                        ))}
                      </div>
                      <p className="mb-0">{rev.text}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      <h4 className="text-dark fw-bold mb-4 mt-5">You May Also Like</h4>
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
