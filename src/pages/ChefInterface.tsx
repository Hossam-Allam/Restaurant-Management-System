import React, { useEffect, useState } from "react";
import axios from "axios";
import OrderCard from "../components/OrderCard";

const ChefInterface: React.FC = () => {
  const [orders, setOrders] = useState([]);
  const [columns, setColumns] = useState([[], [], []]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:8080/order/get");
        const fetchedOrders = response.data
          .filter((order) => !order.ready) // Filter orders where ready is false
          .sort((a, b) => new Date(a.orderTime) - new Date(b.orderTime)) // Sort orders by orderTime
          .map((order, index) => ({
            orderId: order.orderId, // Add orderId
            tableNumber: index + 1,
            products: order.dishes.map((dish) => ({
              id: dish.dishId,
              name: dish.name,
              category: dish.category,
              itemStatus: "pending",
            })),
            status: "pending",
          }));
        setOrders(fetchedOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const handleCompleteOrder = (orderId) => {
    setOrders((prevOrders) =>
      prevOrders.filter((order) => order.orderId !== orderId)
    );
  };

  const handleCancelOrder = (orderId) => {
    setOrders((prevOrders) =>
      prevOrders.filter((order) => order.orderId !== orderId)
    );
  };

  const updateColumns = () => {
    const containerWidth = window.innerWidth;
    const columnCount = Math.max(1, Math.floor(containerWidth / 610));
    const columnHeights = Array(columnCount).fill(0);
    const newColumns = Array.from({ length: columnCount }, () => []);

    orders.forEach((order) => {
      const minHeightIndex = columnHeights.indexOf(Math.min(...columnHeights));
      newColumns[minHeightIndex].push(order);
      columnHeights[minHeightIndex] += 1;
    });

    setColumns(newColumns);
  };

  useEffect(() => {
    updateColumns();
    window.addEventListener("resize", updateColumns);
    return () => window.removeEventListener("resize", updateColumns);
  }, [orders]);

  return (
    <div style={{ display: "flex", gap: "1rem" }}>
      {columns.map((col, colIndex) => (
        <div
          key={colIndex}
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          {col.map((order) => (
            <OrderCard
              key={order.tableNumber + "-" + order.products.length} // Unique key
              tableNumber={order.tableNumber}
              products={order.products}
              status={order.status}
              orderId={order.orderId}
              onComplete={handleCompleteOrder}
              onCancel={handleCancelOrder}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default ChefInterface;
