import React, { useState, useCallback, useMemo, useEffect } from "react";
import axios from "axios";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useLocation, useNavigate } from "react-router-dom";
import { Textarea } from "@nextui-org/react";
import { Card, CardBody, CardFooter } from "@nextui-org/react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Input,
  Avatar,
  Tooltip,
  Button,
  Image,
} from "@nextui-org/react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
} from "@nextui-org/react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { PlusIcon } from "../components/PlusIcon";
import { DeleteIcon } from "../components/DeleteIcon";
import { MinusIcon } from "../components/MinusIcon";
import { SearchIcon } from "../components/SearchIcon.jsx";
import { CartIcon } from "../components/CartIcon.jsx";
import Products from "../components/Products";
import { columns, CartList } from "./CartData.js";
import CashIcon from "../components/CashIcon.svg";
import CreditIcon from "../components/CreditIcon.svg";

const Customer = () => {
  const location = useLocation();
  const user = location.state?.user;
  const navigate = useNavigate();
  const [list, setList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [cartList, setCartList] = useState(CartList);
  const [searchQuery, setSearchQuery] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [isPhoneNumberModalOpen, setIsPhoneNumberModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [settingsForm, setSettingsForm] = useState({
    field1: "",
    field2: "",
    field3: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:8080/dish/all")
      .then((response) => {
        const data = response.data;
        setList(data);
        // Extract unique categories
        const uniqueCategories = [
          ...new Set(data.map((dish) => dish.category)),
        ];
        setCategories(uniqueCategories);
        setSelectedCategory(uniqueCategories[0]); // Set the first category as default
      })
      .catch((error) => {
        console.error("Error fetching dishes:", error);
      });
  }, []);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleCartIconClick = () => {
    onOpen();
  };

  const handleCloseCart = () => {
    onClose();
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const filteredProducts = useMemo(() => {
    return list.filter(
      (product) =>
        product.category === selectedCategory &&
        product.name.toLowerCase().includes(searchQuery)
    );
  }, [list, selectedCategory, searchQuery]);

  const increaseQuantity = (id) => {
    setCartList((prevList) =>
      prevList.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCartList((prevList) =>
      prevList
        .map((item) =>
          item.id === id && item.quantity > 0
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const deleteItem = (id) => {
    setCartList((prevList) =>
      prevList
        .map((item) => (item.id === id ? { ...item, quantity: 0 } : item))
        .filter((item) => item.quantity > 0)
    );
  };

  const handleAddToCart = (productName) => {
    const productToAdd = list.find((product) => product.name === productName);
    if (productToAdd) {
      const existingProductIndex = cartList.findIndex(
        (item) => item.id === productToAdd.dishId
      );
      if (existingProductIndex !== -1) {
        // If the product already exists in the cart, increment its quantity
        const updatedCartList = cartList.map((item, index) =>
          index === existingProductIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        setCartList(updatedCartList);
      } else {
        const newProduct = {
          id: productToAdd.dishId,
          name: productToAdd.name,
          price: productToAdd.price,
          quantity: 1,
        };
        setCartList([...cartList, newProduct]);
      }
    }
  };

  const renderCell = useCallback((item, columnKey) => {
    const cellValue = item[columnKey];
    switch (columnKey) {
      case "name":
        return <h1>{item.name}</h1>;
      case "price":
        return <p className="text-bold text-sm capitalize">{item.price}</p>;
      case "quantity":
        return (
          <Chip className="capitalize" color="success" size="sm" variant="flat">
            {item.quantity}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Increase Quantity">
              <span
                className="text-lg text-default-400 cursor-pointer active:opacity-50"
                onClick={() => increaseQuantity(item.id)}
              >
                <PlusIcon />
              </span>
            </Tooltip>
            <Tooltip content="Decrease Quantity">
              <span
                className="text-lg text-default-400 cursor-pointer active:opacity-50"
                onClick={() => decreaseQuantity(item.id)}
              >
                <MinusIcon />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete Product">
              <span
                className="text-lg text-danger cursor-pointer active:opacity-50"
                onClick={() => deleteItem(item.id)}
              >
                <DeleteIcon />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const subtotal = useMemo(() => {
    return cartList.reduce(
      (sum, item) => sum + parseFloat(item.price) * item.quantity,
      0
    );
  }, [cartList]);

  const handleOpenPaymentModal = () => {
    setIsPaymentModalOpen(true);
  };

  const handleClosePaymentModal = () => {
    setIsPaymentModalOpen(false);
  };

  const handlePlaceOrder = async () => {
    const orderData = {
      customer: {
        id: user.customerId,
      },
      dishes: cartList.map((item) => ({
        dishId: item.id,
      })),
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/order/neworder",
        orderData
      );
      console.log("Order placed:", response.data);
      alert("Order placed successfully!");
      setCartList([]); // Clear the cart after successful order
      setIsPaymentModalOpen(false);
    } catch (error) {
      console.error("Error placing order:", error);
      alert("An error occurred while placing the order. Please try again.");
    }
  };

  const handleAddressButtonClick = () => {
    setIsAddressModalOpen(true);
  };

  const handlePhoneNumberButtonClick = () => {
    setIsPhoneNumberModalOpen(true);
  };

  const handlePasswordButtonClick = () => {
    setIsPasswordModalOpen(true);
  };

  const handleAddressSubmit = async () => {
    try {
      const response = await axios.put(
        "http://localhost:8080/customer/newaddress",
        null,
        {
          params: {
            id: user.customerId,
            address: settingsForm.field1,
          },
        }
      );
      console.log("Address updated:", response.data);
      alert("Address updated successfully!");
      setIsAddressModalOpen(false);
    } catch (error) {
      console.error("Error updating address:", error);
      alert("An error occurred while updating the address. Please try again.");
    }
  };

  const handlePhoneNumberSubmit = async () => {
    try {
      const response = await axios.put(
        "http://localhost:8080/customer/newnumber",
        null,
        {
          params: {
            id: user.customerId,
            phoneno: settingsForm.field2,
          },
        }
      );
      console.log("Number updated: ", response.data);
      alert("Number updated!");
      setIsPhoneNumberModalOpen(false);
    } catch (error) {
      console.error(error);
      alert(
        "An error occurred while updating the phone number. Please try again."
      );
    }
  };

  const handlePasswordSubmit = async () => {
    try {
      const response = await axios.put(
        "http://localhost:8080/customer/newpass",
        null,
        {
          params: {
            id: user.customerId,
            password: settingsForm.field3,
          },
        }
      );
      console.log("Password updated:", response.data);
      alert("Password updated successfully!");
      setSettingsForm({ ...settingsForm, field3: "" });
      setIsPasswordModalOpen(false);
    } catch (error) {
      console.error("Error updating password:", error);
      alert("An error occurred while updating the password. Please try again.");
    }
  };

  const handleSettingsFormChange = (e) => {
    const { name, value } = e.target;
    setSettingsForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  return (
    <NextUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="dark">
        <Navbar>
          <NavbarBrand>
            <Link href="/">
              <Image
                src="/src/assets/OrderlyOnlyWhite.png"
                alt="ORDERLY Logo"
                width={50}
                height={50}
              />
            </Link>
            <p className="font-bold text-inherit">ORDERLY</p>
          </NavbarBrand>
          <NavbarContent className="hidden sm:flex gap-4" justify="center">
            <NavbarItem isActive>
              <Link href="/waiter" aria-current="page" color="secondary">
                Waiter Demo
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link
                color="foreground"
                href="#"
                onClick={() => navigate("/chef")}
              >
                Chef Demo
              </Link>
            </NavbarItem>
          </NavbarContent>
          <NavbarContent as="div" justify="end">
            <Input
              classNames={{
                base: "max-w-full sm:max-w-[10rem] h-10",
                mainWrapper: "h-full",
                input: "text-small",
                inputWrapper:
                  "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
              }}
              placeholder="Type to search..."
              size="sm"
              startContent={<SearchIcon size={18} />}
              type="search"
              onChange={handleSearchChange}
            />
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Avatar
                  isBordered
                  as="button"
                  className="transition-transform"
                  color="secondary"
                  name={user?.userName}
                  size="sm"
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownItem key="profile" className="h-14 gap-2">
                  <p className="font-semibold">Signed in as</p>
                  <p className="font-semibold">{user?.userName}</p>
                </DropdownItem>
                <DropdownItem key="address" onClick={handleAddressButtonClick}>
                  New Address
                </DropdownItem>
                <DropdownItem
                  key="phone"
                  onClick={handlePhoneNumberButtonClick}
                >
                  New Phone Number
                </DropdownItem>
                <DropdownItem
                  key="password"
                  onClick={handlePasswordButtonClick}
                >
                  New Password
                </DropdownItem>
                <DropdownItem key="logout" href="/" color="danger">
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <Link
              color="foreground"
              style={{ cursor: "pointer" }}
              onPress={handleCartIconClick}
            >
              <CartIcon />
            </Link>
          </NavbarContent>
        </Navbar>

        <Modal isOpen={isOpen} onClose={onClose} size="5xl" backdrop="blur">
          <ModalContent>
            <ModalHeader>Shopping Cart</ModalHeader>
            <ModalBody>
              <Table aria-label="Cart table">
                <TableHeader columns={columns}>
                  {(column) => (
                    <TableColumn
                      key={column.uid}
                      align={column.uid === "actions" ? "center" : "start"}
                    >
                      {column.name}
                    </TableColumn>
                  )}
                </TableHeader>
                <TableBody
                  emptyContent={"You haven't added anything to the cart yet"}
                  items={cartList}
                >
                  {(item) => (
                    <TableRow key={item.id}>
                      {(columnKey) => (
                        <TableCell>
                          {columnKey === "actions" ? (
                            <div className="relative flex items-center gap-2">
                              <Tooltip content="Increase Quantity">
                                <span
                                  className="text-lg text-default-400 cursor-pointer active:opacity-50"
                                  onClick={() => increaseQuantity(item.id)}
                                >
                                  <PlusIcon />
                                </span>
                              </Tooltip>
                              <Tooltip content="Decrease Quantity">
                                <span
                                  className="text-lg text-default-400 cursor-pointer active:opacity-50"
                                  onClick={() => decreaseQuantity(item.id)}
                                >
                                  <MinusIcon />
                                </span>
                              </Tooltip>
                              <Tooltip color="danger" content="Delete Product">
                                <span
                                  className="text-lg text-danger cursor-pointer active:opacity-50"
                                  onClick={() => deleteItem(item.id)}
                                >
                                  <DeleteIcon />
                                </span>
                              </Tooltip>
                            </div>
                          ) : (
                            renderCell(item, columnKey)
                          )}
                        </TableCell>
                      )}
                    </TableRow>
                  )}
                </TableBody>
              </Table>
              <Textarea
                label="Note"
                placeholder="Enter a note for your order for the chef to see"
              />
              <div>
                <h1>Subtotal: ${subtotal.toFixed(2)}</h1>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" onPress={handleOpenPaymentModal}>
                Order
              </Button>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        <Modal
          isOpen={isPaymentModalOpen}
          onClose={handleClosePaymentModal}
          backdrop="blur"
        >
          <ModalContent>
            <ModalHeader className="text-4xl justify-center">
              Payment Options
            </ModalHeader>
            <ModalBody>
              <div className="flex justify-center gap-2">
                <Card
                  shadow="sm"
                  isPressable
                  onPress={handlePlaceOrder}
                  style={{ width: "100%", height: "100%" }}
                >
                  <CardBody
                    className="flex justify-center items-center p-0"
                    style={{ width: "100%", height: "100%" }}
                  >
                    <Image
                      src={CreditIcon}
                      alt="Credit Card"
                      className="object-contain"
                    />
                    <b className="mt-2">Credit Card</b>
                  </CardBody>
                </Card>
                <Card
                  shadow="sm"
                  isPressable
                  onPress={handlePlaceOrder}
                  style={{ width: "100%", height: "100%" }}
                >
                  <CardBody
                    className="flex justify-center items-center p-0"
                    style={{ width: "100%", height: "100%" }}
                  >
                    <Image
                      src={CashIcon}
                      alt="Cash"
                      className="object-contain"
                    />
                    <b className="mt-2">Cash</b>
                  </CardBody>
                </Card>
              </div>
            </ModalBody>
            <ModalFooter className="justify-center">
              <Button
                color="danger"
                variant="light"
                onPress={handleClosePaymentModal}
              >
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        <Modal
          isOpen={isAddressModalOpen}
          onClose={() => setIsAddressModalOpen(false)}
        >
          <ModalContent>
            <ModalHeader>New Address</ModalHeader>
            <ModalBody>
              <Input
                clearable
                label="Address"
                name="field1"
                value={settingsForm.field1}
                onChange={handleSettingsFormChange}
              />
            </ModalBody>
            <ModalFooter>
              <Button
                auto
                flat
                color="error"
                onPress={() => setIsAddressModalOpen(false)}
              >
                Cancel
              </Button>
              <Button auto onPress={handleAddressSubmit}>
                Submit
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        <Modal
          isOpen={isPhoneNumberModalOpen}
          onClose={() => setIsPhoneNumberModalOpen(false)}
        >
          <ModalContent>
            <ModalHeader>New Phone Number</ModalHeader>
            <ModalBody>
              <Input
                clearable
                label="Phone Number"
                name="field2"
                value={settingsForm.field2}
                onChange={handleSettingsFormChange}
              />
            </ModalBody>
            <ModalFooter>
              <Button
                auto
                flat
                color="error"
                onPress={() => setIsPhoneNumberModalOpen(false)}
              >
                Cancel
              </Button>
              <Button auto onPress={handlePhoneNumberSubmit}>
                Submit
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        <Modal
          isOpen={isPasswordModalOpen}
          onClose={() => setIsPasswordModalOpen(false)}
        >
          <ModalContent>
            <ModalHeader>New Password</ModalHeader>
            <ModalBody>
              <Input
                clearable
                label="Password"
                name="field3"
                value={settingsForm.field3}
                onChange={handleSettingsFormChange}
              />
            </ModalBody>
            <ModalFooter>
              <Button
                auto
                flat
                color="error"
                onPress={() => setIsPasswordModalOpen(false)}
              >
                Cancel
              </Button>
              <Button auto onPress={handlePasswordSubmit}>
                Submit
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        <div className="flex" style={{ paddingTop: "7.5vh" }}>
          <div className="w-1/4 p-4">
            {categories.map((category, index) => (
              <div key={index} style={{ paddingBottom: "1.5vh" }}>
                <Link
                  className={`text-inherit ${
                    selectedCategory === category
                      ? "text-4xl font-bold text-secondary"
                      : "text-2xl text-foreground"
                  }`}
                  onClick={() => handleCategoryChange(category)}
                >
                  {category}
                </Link>
              </div>
            ))}
          </div>

          <div>
            <Products
              products={filteredProducts}
              handleAddToCart={handleAddToCart}
            />
          </div>
        </div>
      </NextThemesProvider>
    </NextUIProvider>
  );
};

export default Customer;
