import React, { useContext } from "react";
import { ShopContext } from "../../context/shopcontext";
import { Col, Button } from "react-bootstrap"; 

export const CartItem = (props) => {
  const { id, productName, price, productImage } = props.data;
  const { cartItems, deleteFromCart, updateCartItemCount } = useContext(ShopContext);

  const handleRemoveFromCart = () => {
    deleteFromCart(id);
  };

  const handleIncrement = () => {
    if (cartItems[id] < 10) {
      updateCartItemCount(cartItems[id] + 1, id);
    }
  };

  const handleDecrement = () => {
    if (cartItems[id] > 1) {
      updateCartItemCount(cartItems[id] - 1, id);
    }
  };

  
  const totalItemPrice = price * cartItems[id];

  return (
    <Col sm={6} md={4} lg={3}> 
      <div className="cartItem">
        <div className="description">
          <p>
            <b>{productName}</b>
          </p>
          <p> Price: ${price} </p>
          <p> Total Price: ${totalItemPrice} </p>
          <div className="countHandler">
            <button onClick={handleDecrement}> - </button>
            <input
              value={cartItems[id]}
              readOnly
            />
            <button onClick={handleIncrement}> + </button>
          </div>
        </div>
        <div className="removeButton">
          <Button variant="danger" onClick={handleRemoveFromCart}>Remove</Button>
        </div>
      </div>
    </Col>
  );
};
