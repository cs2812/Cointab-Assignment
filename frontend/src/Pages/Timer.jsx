import { Box, Text } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";

function Timer({ count, setCount, email,setShow }) {
  const baseUrl = "http://localhost:8080/login";
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [timeOut, setTime] = useState(1000);
  let id = useRef();
  // SetTime
  const deadline = Date.now() + 24 * 60 * 60 * 1000;

  const getTime = () => {
    const time = deadline - Date.now();
    setTime(time);
    // console.log("time", time);

    setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
    setHours(Math.floor(time / (60 * 60 * 1000)));

    setMinutes(Math.floor((time / 1000 / 60) % 60));
    setSeconds(Math.floor((time / 1000) % 60));
  };

  // Stop timer after 24 hours
  const stop = () => {
    clearInterval(id.current);
    id.current = null;
  };

  //Update attempt to Zero in Database
  const UpdateCountToZero = () => {
    const payload = {
      email: email,
    };
    // console.log(payload)
    fetch(`${baseUrl}/attempt`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.message === "Count update successfully") {
          setShow(true)
          setCount(0);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (id.current) return;
    id.current = setInterval(() => getTime(deadline), 1000);
  }, []);

  useEffect(() => {
    if (timeOut < 1000) {
      //   localStorage.setItem("count", 0);
      setCount(0);
      stop();
      UpdateCountToZero();
      //   navigate("/login");
    }
  }, [timeOut]);

  return (
    // <---- Error Box ---->
    <Box textAlign={"center"}>
      <Text mt={4} mb={1} fontSize="2xl" color="red"> 
        Too many wrong attempts !
      </Text>
      <Text>
        Your Account is Blocked. Try after{" "}
        <Text as="span" color="blue.300" fontSize={"xl"} fontWeight={500}>
          {hours + ":" + minutes + ":" + seconds}
        </Text>{" "}
        hours.
      </Text>
    </Box>
  );
}

export default Timer;
