import React, { useState } from "react";
import axios from "axios";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Divider,
} from "@nextui-org/react";
import OrderTable from "./OrderTable";
import { CircleCheck, Trash2, ChevronDown, ChevronUp } from "lucide-react";

interface OrderCardProps {
  tableNumber: number;
  products: {
    id: number;
    name: string;
    category: string;
    itemStatus: string;
  }[];
  status: string;
  orderId: number;
  onComplete: (orderId: number) => void;
  onCancel: (orderId: number) => void; // Add onCancel prop
}

const OrderCard: React.FC<OrderCardProps> = ({
  tableNumber,
  products,
  status,
  orderId,
  onComplete,
  onCancel, // Add onCancel prop
}) => {
  const [isTableVisible, setIsTableVisible] = useState(true);

  const toggleTableVisibility = () => {
    setIsTableVisible(!isTableVisible);
  };

  const handleCompleteOrder = async () => {
    try {
      await axios.put(`http://localhost:8080/order/ready?orderId=${orderId}`);
      onComplete(orderId);
    } catch (error) {
      console.error("Error completing order:", error);
      alert("An error occurred while completing the order. Please try again.");
    }
  };

  const handleCancelOrder = () => {
    onCancel(orderId);
  };

  return (
    <Card
      style={{ display: "flex", flexDirection: "column", minHeight: "100px" }}
    >
      <CardHeader
        onClick={toggleTableVisibility}
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          cursor: "pointer",
          transition: "background-color 0.3s ease",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.backgroundColor = "rgba(0, 0, 0, 0.2)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.backgroundColor = "transparent")
        }
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
        {isTableVisible ? (
          <ChevronUp style={{ marginLeft: "auto" }} />
        ) : (
          <ChevronDown style={{ marginLeft: "auto" }} />
        )}
      </CardHeader>
      <Divider />
      {isTableVisible && (
        <CardBody style={{ flexGrow: 1 }}>
          <OrderTable products={products} />
        </CardBody>
      )}
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
        <Button
          endContent={<Trash2 />}
          color="danger"
          onClick={handleCancelOrder}
        >
          Cancel Order
        </Button>
      </CardFooter>
    </Card>
  );
};

export default OrderCard;
