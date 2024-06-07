import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Textarea,
} from "@nextui-org/react";
import OrderTable from "./WaiterOrderTable";
import { CircleCheck, Trash2 } from "lucide-react";

interface OrderCardProps {
  tableNumber: number;
  products: {
    id: number;
    name: string;
    category: string;
    itemStatus: string;
    price: number;
  }[];
  status: string;
  description: string;
  initialSubtotal: number;
  onDelete: () => void;
  orderId: number;
}

const mapStatus = (status: string) => {
  switch (status) {
    case "pending":
    case "in-progress":
      return "in-kitchen";
    case "ready":
      return "order-ready";
    case "delivered":
      return "delivered";
    case "paid":
      return "paid";
    default:
      return status;
  }
};

const OrderCard: React.FC<OrderCardProps> = ({
  tableNumber,
  products,
  status,
  description,
  initialSubtotal,
  onDelete,
  orderId, // Add orderId prop
}) => {
  const [productList, setProductList] = useState(
    products.map((product) => ({
      ...product,
      itemStatus: mapStatus(product.itemStatus),
    }))
  );
  const [subtotal, setSubtotal] = useState(initialSubtotal);

  useEffect(() => {
    const newSubtotal = productList
      .filter((product) => product.itemStatus !== "paid")
      .reduce((acc, product) => acc + product.price, 0)
      .toFixed(2);
    setSubtotal(newSubtotal);
  }, [productList]);

  const removeProduct = (id: number) => {
    setProductList((prevList) =>
      prevList.filter((product) => product.id !== id)
    );
  };

  const updateProductStatus = (id: number, status: string) => {
    setProductList((prevList) =>
      prevList.map((product) =>
        product.id === id ? { ...product, itemStatus: status } : product
      )
    );
  };

  const handleCompleteOrder = async () => {
    try {
      await axios.put(`http://localhost:8080/order/deliver?orderId=${orderId}`);
      await axios.put(`http://localhost:8080/order/paid?orderId=${orderId}`);
      onDelete();
    } catch (error) {
      console.error("Error completing order:", error);
      alert("An error occurred while completing the order. Please try again.");
    }
  };

  return (
    <Card>
      <CardHeader
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1
          style={{
            fontSize: "clamp(1rem, 30px, 3rem)",
            textAlign: "center",
            fontWeight: "bold",
            margin: 0,
          }}
        >
          Table {tableNumber}
        </h1>
      </CardHeader>
      <CardBody>
        <OrderTable
          products={productList}
          onStatusChange={updateProductStatus}
          onRemove={removeProduct}
        />
        <Textarea readOnly label="Customer Note" value={description} />
        <p>
          <strong>Subtotal:</strong> ${subtotal}
        </p>
      </CardBody>
      <CardFooter
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <Button
          endContent={<CircleCheck />}
          color="success"
          onClick={handleCompleteOrder}
        >
          Complete Order
        </Button>
        <Button endContent={<Trash2 />} color="danger" onClick={onDelete}>
          Cancel Order
        </Button>
      </CardFooter>
    </Card>
  );
};

export default OrderCard;
