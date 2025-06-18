import React from "react";
import { NavDropdown } from "react-bootstrap";

function CategoryDropdown() {
  return (
    <div style={{ position: "absolute", top: "100%", left: "0", zIndex: "1000" }}>
      <ul className="list-group shadow rounded" style={{ backgroundColor: "#ffffff", minWidth: "180px" }}>
        <li className="list-group-item list-group-item-action">Shoes</li>
        <li className="list-group-item list-group-item-action">Clothes</li>
        <li className="list-group-item list-group-item-action">Bags</li>
        <li className="list-group-item list-group-item-action">Accessories</li>
        <li className="list-group-item list-group-item-action">Watches</li>
      </ul>
    </div>
  );
}

export default CategoryDropdown;