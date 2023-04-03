import React from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const baseUrl = "http://localhost:8080/signup"
  const toast = useToast();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSignupUser = () => {
    const payload = {
      name,
      email,
      password,
    };
    fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.message === "signup sucessful") {
          toast({
            title: "Signup Success",
            position: "top",
            description: "Signup Successfully",
            status: "success",
            duration: 2000,
            isClosable: true,
          });
          navigate("/login");
        } else if (res.message === "Something went wrong please try again") {
          toast({
            title: "Signup Failed",
            position: "top",
            description: res.message,
            status: "error",
            duration: 2000,
            isClosable: true,
          });
        }
      });
  };

  return (
    <Box w="100%">
      <Text mt="20px" fontWeight="bold" fontSize={"22px"}>
        Signup Page
      </Text>
      <Box
        w={{ base: "80%", sm: "80%", md: "60%", lg: "40%" }}
        m="auto"
        mt="20px"
        height="450px"
        p="15px"
        borderRadius={"10px"}
        border={"3px solid #f2f2f2"}
      >
        <Box w="70%" m="auto">
          <FormControl isRequired mt="20px">
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              placeholder="Enter your Name"
              onChange={(e) => setName(e.target.value)}
              borderRadius={"0px"}
            />
          </FormControl>

          <FormControl isRequired mt="20px">
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              borderRadius={"0px"}
            />
          </FormControl>

          <FormControl isRequired mt="20px">
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <Input
                type={showPassword ? "text" : "password"}
                borderRadius={0}
                name="password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                variant={"solid"}
                borderRadius={"0px"}
                onClick={() => setShowPassword((showPassword) => !showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </Button>
            </InputGroup>
          </FormControl>

          <Button
            w="40%"
            m="auto"
            mt="20px"
            colorScheme='teal' variant='solid'
            bg="#03989e"
            color="white"
            onClick={handleSignupUser}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default SignupPage;
