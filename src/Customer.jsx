import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/navbar";
import { Shop } from "./pages/mainpage/mainpage";
import { Cart } from "./pages/shopcart/shopcart";
import { ShopContextProvider } from "./context/shopcontext";
import 'bootstrap/dist/css/bootstrap.min.css';
import { CategoryPage } from "./pages/mainpage/categorypage";
import videoBg from './assets/4kbg.mp4';
import "./Customer.css"; 

function Customer() {
  return (
    <div className="App">
      <ShopContextProvider>
        <Router>
          <div className="background-video">
            <video src={videoBg} autoPlay loop muted className="video-bg" />
          </div>
          <Navbar />
          
          <div className="container">
            <Routes>
              <Route path="/" element={<Shop />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/category/:name" element={<CategoryPage />} />
            </Routes>
          </div>
        </Router>
      </ShopContextProvider>
    </div>
  );
}

export default Customer;
