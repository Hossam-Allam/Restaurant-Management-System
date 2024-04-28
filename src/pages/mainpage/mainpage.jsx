import React from "react";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import { PRODUCTS } from "../../products";
import "bootstrap/dist/css/bootstrap.min.css";
import "./mainpage.css";

export const Shop = () => {
  const categories = [...new Set(PRODUCTS.map((product) => product.category))];

  return (
    <div className="shop">
      <div className="shopTitle">
        <h1>Orderly Menu</h1>
      </div>

      <div className="products">
        <Row>
          <Col>
            <div className="category-links">
              {categories.map((category) => (
                <Link key={category} to={`/category/${category}`} className="category-link">
                  <div className="category-box">
                    <img src={PRODUCTS.find(product => product.category === category).productImg} alt={category} />
                    <span>{category.toUpperCase()}</span>
                  </div>
                </Link>
              ))}
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};
