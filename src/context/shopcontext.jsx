import { createContext, useEffect, useState } from "react";
import { PRODUCTS } from "../products";



export const ShopContext = createContext(null);

const getDefaultCart = () => {
  let cart = {};
  for (let i = 1; i < PRODUCTS.length + 1; i++) {
    cart[i] = 0;
  }
  return cart;
};

export const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState(getDefaultCart());
  const [note, setNote] = useState("");

  useEffect(() => {
    setNote("");
  }, [cartItems]);

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = PRODUCTS.find((product) => product.id === Number(item));
        totalAmount += cartItems[item] * itemInfo.price;
      }
    }
    return totalAmount;
  };

  const addToCart = (itemId) => {
    setCartItems((prev) => {
      const updatedCartItems = { ...prev };
      if (updatedCartItems[itemId] === 0) {
        delete updatedCartItems[itemId];
      }
      return {
        ...updatedCartItems,
        [itemId]: (updatedCartItems[itemId] || 0) + 1
      };
    });
  };    

  const removeFromCart = (itemId) => {
    if (cartItems[itemId] > 0) {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    }
  };

  const updateCartItemCount = (newAmount, itemId) => {
    setCartItems((prev) => {
      const updatedCartItems = { ...prev };
      if (updatedCartItems[itemId] === 0) {
        delete updatedCartItems[itemId];
      }
      return {
        ...updatedCartItems,
        [itemId]: newAmount
      };
    });
  };



  const checkout = () => {
    alert("Your order is getting prepared!"); 
    setCartItems(getDefaultCart()); 
    navigate("/"); 
  };
  
  
  

  const deleteFromCart = (id) => {
    setCartItems((prevCartItems) => {
      const updatedCartItems = { ...prevCartItems };
      delete updatedCartItems[id];
      return updatedCartItems;
    });
  };

  const contextValue = {
    cartItems,
    addToCart,
    updateCartItemCount,
    removeFromCart,
    getTotalCartAmount,
    checkout,
    deleteFromCart,
    note,
    setNote
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};
