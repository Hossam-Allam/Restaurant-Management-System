import React from "react";
import "./navbar.style.css";
import { Button, ButtonGroup, ChakraProvider } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export const OwnerNavbar = ({buttonText, linkTo}) => {
  return (
    <ChakraProvider>
    <div>
      <div id="main-navbar" className="navbar" >
        <h2 className="logo">Orderly Admin</h2>
        <nav>
            <ButtonGroup gap="4">
              <Link to= "/owner">
                <Button colorScheme="blackAlpha">Dashboard</Button>
              </Link>
              <Link to= "/employees">
                <Button colorScheme="blackAlpha">Employees</Button>
              </Link>
              <Link to= "/items">
                <Button colorScheme="blackAlpha">Items</Button>
              </Link>
            </ButtonGroup>
        </nav>
      </div>
    </div>
    </ChakraProvider>
  );
};

export default OwnerNavbar;
