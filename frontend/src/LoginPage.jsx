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
import { useEffect } from "react";
import { useRef } from "react";

const LoginPage = () => {
  const baseUrl = "http://localhost:8080/login"
  const toast = useToast();
  const currentRef = useRef();
  const timerid = useRef(null);
  const navigate = useNavigate();
  const [count, setCount] = useState(0);
  const [email, setEmail] = useState("");
  let [timer, setTimer] = useState(86400000);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [lastLoginTime, setlastLoginTime] = useState("");

  // const wrongCount = JSON.parse(localStorage.getItem("count"));
  // const upcomingDate = Number(lastLoginTime) + 86400000;

  useEffect(() => {
    if (!currentRef.current) {
      let Timer = setTimeout(() => {
        if (count > 4) {
          const payload = {
            email: email,
          };
          console.log("payload", payload);
          fetch( `${baseUrl}/countupdate`,
            {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(payload),
            }
          )
            .then((res) => res.json())
            .then((res) => {
              if (res.message === "Count update successfully") {
                setCount(res.wrongCount);
                localStorage.setItem("count", JSON.stringify(res.wrongCount));
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
      }, 86400000);

      return () => {
        clearTimeout(Timer);
      };
    }
  }, [lastLoginTime, count]);

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
          localStorage.setItem("count", JSON.stringify(res.wrongCount));
          toast({
            title: "Login Failed",
            position: "top",
            description: "Something went wrong please try again",
            status: "error",
            duration: 2000,
            isClosable: true,
          });
        }
        if (
          res.message ===
          "You had typed 5 attempts you are now blocked for 24 hrs"
        ) {
          localStorage.setItem("lastLoginTime", res.lastTimeLogin);
          setlastLoginTime(res.lastTimeLogin);
          localStorage.setItem("count", JSON.stringify(res.wrongCount));
          setCount(res.wrongCount);
        }
      });
  };

  function ChangeMsToTime(duration) {
     var seconds = Math.floor((duration / 1000) % 60),
      minutes = Math.floor((duration / (1000 * 60)) % 60),
      hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    return hours + ":" + minutes + ":" + seconds;
  }
  useEffect(() => {
    if (count === 5) {
      if (!timerid.current) {
        let id = setInterval(() => {
          setTimer((prev) => prev - 100);
        }, 100);
        timerid.current = id;
      }
    }
    return () => {
      clearTimeout(timerid.current);
      timerid.current = null;
    };
  }, [count]);

  return (
    <Box
      w="100%"
      display={"flex"}
      justifyContent="center"
      alignItems={"center"}
    >
      {count === 5 ? (
        // <---- Error Box ---->
        <Box>
          <Text mt={4} mb={1} fontSize="2xl">
            Too many wrong attempts !
          </Text>
          <Text maxWidth="sm">
            Your Account is Blocked. Try after <Text as="spam" fontSize={"xl"} fontWeight={500}>{ChangeMsToTime(timer)}</Text>  hours
          </Text>
        </Box>

      ) : (
        <Box w={{ base: "80%", sm: "80%", md: "60%", lg: "50%" }} h="500px">
          <Text mt="20px" fontWeight="bold" fontSize={"22px"}>
            Login Page
          </Text>
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
                onClick={handleLoginUser}
              >
                Submit
              </Button>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default LoginPage;
