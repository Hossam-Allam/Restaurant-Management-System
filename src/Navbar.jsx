import React from "react";
import "./navbar.style.css";
import { Button, ButtonGroup, ChakraProvider } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export const Navbar = ({buttonText, linkTo}) => {
  return (
    <ChakraProvider>
    <div>
      <div id="main-navbar" className="navbar">
        <h2> </h2>
        <nav>
        {buttonText && linkTo && ( 
            <ButtonGroup gap="4">
              <Link to={linkTo}>
                <Button colorScheme="blackAlpha">{buttonText}</Button>
              </Link>
            </ButtonGroup>
          )}
        </nav>
      </div>
    </div>
    </ChakraProvider>
  );
};

export default Navbar;
