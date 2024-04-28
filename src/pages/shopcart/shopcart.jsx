import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../../context/shopcontext";
import { PRODUCTS } from "../../products";
import { CartItem } from "./shopcartitem";
import { useNavigate } from "react-router-dom";
import { Row, Col } from "react-bootstrap"; 

import "./shopcart.css";

export const Cart = () => {
  const { cartItems, getTotalCartAmount, checkout, note, setNote } = useContext(ShopContext);
  const totalAmount = getTotalCartAmount();
  const navigate = useNavigate();

  useEffect(() => {
    setNote("");
  }, []);

  const handleNoteChange = (e) => {
    const inputNote = e.target.value;
    if (inputNote.length <= 200) {
      setNote(inputNote); 
    }
  };

  return (
    <div className="cart">
      <div>
        <h1 className="yourorder">Your Order</h1>
      </div>
      
      <Row>
        <Col>
          {PRODUCTS.map((product) => {
            if (cartItems[product.id] > 0) {
              return <CartItem key={product.id} data={product} />;
            }
            return null; 
          })}
        </Col>
      </Row>

      {totalAmount > 0 && (
        <div className="notes">
          <label htmlFor="notes">Add Notes to Chef (Max 200 characters):</label>
          <textarea
            id="notes"
            name="notes"
            rows="4"
            cols="50"
            value={note}
            onChange={handleNoteChange}
            maxLength={200} 
          />
          <p>Characters left: {200 - note.length}</p>
        </div>
      )}

      {totalAmount > 0 ? (
        <div className="checkout">
          <p className="subtotal"> Subtotal: ${totalAmount} </p>
          <button onClick={() => navigate("/")}> Continue Browsing </button>
          <button
            onClick={() => {
              checkout();
              navigate("/checkout");
            }}
          >
            {" "}
            Checkout{" "}
          </button>
        </div>
      ) : (
        <h1 className="empty"> Your Cart is Empty</h1>
      )}
    </div>
  );
};
