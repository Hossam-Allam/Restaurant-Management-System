import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import OrderCard from "../components/WaiterOrderCard";

const mergeOrdersByTableNumber = (orders) => {
  const mergedOrders = {};
  let nextId = 1;

  orders.forEach((order) => {
    if (!mergedOrders[order.tableNumber]) {
      mergedOrders[order.tableNumber] = {
        tableNumber: order.tableNumber,
        products: [],
        status: order.status,
        description: order.description,
      };
    }
    // Assign unique IDs to each product
    order.products.forEach((product) => {
      mergedOrders[order.tableNumber].products.push({
        ...product,
        id: nextId++,
      });
    });
  });

  return Object.values(mergedOrders);
};

const calculateSubtotal = (products) => {
  return products
    .filter((product) => product.itemStatus !== "paid")
    .reduce((acc, product) => acc + product.price, 0)
    .toFixed(2);
};

const WaiterInterface: React.FC = () => {
  const [orders, setOrders] = useState([]);
  const [columns, setColumns] = useState([[], [], []]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:8080/order/get");
        const fetchedOrders = response.data
          .filter((order) => order.ready && (!order.delivered || !order.paid)) // Filter orders where ready is true and delivered or paid is false
          .sort((a, b) => new Date(a.orderTime) - new Date(b.orderTime)) // Sort orders by orderTime
          .map((order, index) => ({
            orderId: order.orderId, // Add orderId to the mapped object
            tableNumber: index + 1,
            description: order.customer.address || "N/A",
            products: order.dishes.map((dish) => ({
              id: dish.dishId,
              name: dish.name,
              category: dish.category,
              itemStatus: "order-ready",
              price: dish.price,
            })),
            status: "order-ready",
          }));
        setOrders(fetchedOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const updateColumns = useCallback(() => {
    const containerWidth = window.innerWidth;
    const columnCount = Math.max(1, Math.floor(containerWidth / 685));
    const columnHeights = Array(columnCount).fill(0);
    const newColumns = Array.from({ length: columnCount }, () => []);

    orders.forEach((order) => {
      const minHeightIndex = columnHeights.indexOf(Math.min(...columnHeights));
      newColumns[minHeightIndex].push(order);
      columnHeights[minHeightIndex] += 1;
    });

    setColumns(newColumns);
  }, [orders]);

  useEffect(() => {
    updateColumns();
    window.addEventListener("resize", updateColumns);

    const resizeObserver = new ResizeObserver(updateColumns);
    document
      .querySelectorAll(".column")
      .forEach((col) => resizeObserver.observe(col));

    return () => {
      window.removeEventListener("resize", updateColumns);
      resizeObserver.disconnect();
    };
  }, [updateColumns]);

  const handleDeleteOrder = (orderId) => {
    setOrders((prevOrders) =>
      prevOrders.filter((order) => order.orderId !== orderId)
    );
  };

  return (
    <div style={{ display: "flex", gap: "1rem" }}>
      {columns.map((col, colIndex) => (
        <div
          key={colIndex}
          className="column"
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          {col.map((order, orderIndex) => (
            <OrderCard
              key={`${order.tableNumber}-${orderIndex}`}
              tableNumber={order.tableNumber}
              products={order.products}
              status={order.status}
              description={order.description}
              initialSubtotal={calculateSubtotal(order.products)}
              orderId={order.orderId}
              onDelete={() => handleDeleteOrder(order.orderId)}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default WaiterInterface;
