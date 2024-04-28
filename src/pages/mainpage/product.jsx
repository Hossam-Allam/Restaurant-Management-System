import React, { useContext } from "react";
import { ShopContext } from "../../context/shopcontext";
import { Col, Button } from "react-bootstrap";
import "./product.css";

export const Product = (props) => {
  const { id, productName, price, productImg, description } = props.data;
  const { addToCart, cartItems, updateCartItemCount } = useContext(ShopContext);

  const cartItemCount = cartItems[id] || 0;

  const handleAddToCart = () => {
    if (!(id in cartItems)) {
      addToCart(id);
    }
  };
  

  const handleIncrement = () => {
    if (cartItemCount < 10) {
      updateCartItemCount(cartItemCount + 1, id);
    }
  };

  const handleDecrement = () => {
    if (cartItemCount > 1) {
      updateCartItemCount(cartItemCount - 1, id);
    }
  };

  return (
    <Col xs={12} sm={6} md={4} lg={3} className=" justify-content-center">
      <div className="product">
        <img src={productImg} alt={productName} className="product-image" />
        <div className="description">
          <p>
            <b>{productName}</b>
          </p>
          <p> ${price}</p>
          <p>{description}</p>
        </div>
        <div className="quantity-control">
          <button onClick={handleDecrement}>-</button>
          <input type="text" value={cartItemCount} readOnly />
          <button onClick={handleIncrement}>+</button>
        </div>
        <Button className="addToCartBtn" disabled={cartItemCount === 10} onClick={handleAddToCart}>
          Add To Cart {cartItemCount > 0 && <> ({cartItemCount})</>}
        </Button>
      </div>
    </Col>
  );
};
