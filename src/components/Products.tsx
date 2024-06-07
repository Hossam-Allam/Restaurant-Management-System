import React from "react";
import { Card, CardBody, CardFooter } from "@nextui-org/react";

const Products = ({ products, handleAddToCart }) => {
  return (
    <div
      className="gap-2 grid grid-cols-2 sm:grid-cols-4"
      style={{ height: "560px", width: "960px" }}
    >
      {products.map((item) => (
        <div key={item.dishId} className="flex justify-center">
          <Card
            shadow="sm"
            isPressable
            onPress={() => handleAddToCart(item.name)}
            style={{
              width: "240px",
              maxWidth: "240px",
              height: "100%",
            }}
          >
            <CardBody
              className="overflow-visible p-0"
              style={{
                background: `url(${item.img}) center/cover no-repeat`,
              }}
            >
              <div style={{ height: "100%", width: "100%" }}></div>
            </CardBody>
            <CardFooter className="text-small justify-between">
              <b>{item.name}</b>
              <p className="text-default-500">${item.price.toFixed(2)}</p>
            </CardFooter>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default Products;
