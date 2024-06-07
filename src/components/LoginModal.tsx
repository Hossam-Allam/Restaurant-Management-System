import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Input,
  Checkbox,
  Link,
  Button,
} from "@nextui-org/react";
import { MailIcon } from "../components/MailIcon.jsx";
import { EyeFilledIcon } from "../components/EyeFilledIcon";
import { EyeSlashFilledIcon } from "../components/EyeSlashFilledIcon";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginModal = ({ isOpen, onOpenChange }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Email and password cannot be empty.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/customer/login",
        {
          username: email,
          password: password,
        }
      );
      console.log("Response data:", response.data);

      if (response.data.authenticated) {
        navigate("/customer", { state: { user: response.data } });
      } else {
        alert("Invalid username or password.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 custom-modal-header">
              Log in
            </ModalHeader>
            <ModalBody>
              <Input
                autoFocus
                endContent={
                  <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                }
                type="Email"
                label="Email"
                placeholder="Enter your email"
                variant="bordered"
                value={email || ""}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                label="Password"
                variant="bordered"
                placeholder="Enter your password"
                endContent={
                  <button
                    className="focus:outline-none"
                    type="button"
                    onClick={toggleVisibility}
                  >
                    {isVisible ? (
                      <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                    ) : (
                      <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                    )}
                  </button>
                }
                type={isVisible ? "text" : "password"}
                value={password || ""}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="flex py-2 px-1 justify-between">
                <Checkbox classNames={{ label: "text-small" }}>
                  Remember me
                </Checkbox>
                <Link color="primary" href="#" size="sm">
                  Forgot password?
                </Link>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="flat" onPress={onClose}>
                Close
              </Button>
              <Button color="primary" onPress={handleLogin}>
                Sign in
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default LoginModal;
