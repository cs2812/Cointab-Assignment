import React, { useEffect } from "react";
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
import Timer from "./Timer";

const LoginPage = ({setShow}) => {
  const baseUrl = "http://localhost:8080/login";
  const toast = useToast();
  const navigate = useNavigate();
  const [count, setCount] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const AttemptShouldBe = 4;

  const handleLoginUser = () => {
    const payload = {
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
        if (res.message === "login successful" && res.token) {
          localStorage.setItem("userToken", res.token);
          localStorage.setItem("userData", JSON.stringify(res.userData));
          toast({
            title: "Login Success",
            position: "top",
            description: "you are successfully logged in",
            status: "success",
            duration: 2000,
            isClosable: true,
          });
          navigate("/");
        }
        if (res.message === "Something went wrong") {
          setCount(res.wrongCount);
          localStorage.setItem("count", res.wrongCount);
          toast({
            title: "Login Failed",
            position: "top",
            description: "Something went wrong please try again",
            status: "error",
            duration: 2000,
            isClosable: true,
          });
        }
        if (res.message === "5 attempts") {
          localStorage.setItem("show",false)
          setCount(res.wrongCount);
        }
      });
    };
    
    useEffect(()=>{
      if(count>AttemptShouldBe){
      setShow(false)
    }
  },[count])

  return (
    <Box
      w="100%"
      display={"flex"}
      justifyContent="center"
      alignItems={"center"}
    >
      <Box w={{ base: "80%", sm: "80%", md: "60%", lg: "50%" }} h="500px">
        <Text mt="20px" fontWeight="bold" fontSize={"22px"}>
          Login Page
        </Text>
        {
        // <--- Error Box --->
        count > AttemptShouldBe ? (
          <Box>
            <Timer count={count} setCount={setCount} setShow={setShow} email={email} />
          </Box>
        ) : (
          ""
        )}
        <Box
          m="auto"
          mt="40px"
          p="1rem"
          borderRadius={"10px"}
          border={"3px solid #f2f2f2"}
        >
          <Box w="70%" m="auto">
            <FormControl isRequired mt="10px">
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
                  onClick={() =>
                    setShowPassword((showPassword) => !showPassword)
                  }
                >
                  {showPassword ? "Hide" : "Show"}
                </Button>
              </InputGroup>
            </FormControl>

            <Button
              w="40%"
              m="auto"
              mt="20px"
              colorScheme="teal"
              variant="solid"
              bg="#03989e"
              color="white"
              disabled={count > AttemptShouldBe}
              onClick={handleLoginUser}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginPage;
