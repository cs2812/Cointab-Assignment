import { Button, Flex } from "@chakra-ui/react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({show}) => {
  // console.log("nav",show)
  const navigate = useNavigate();

  const userData = JSON.parse(localStorage.getItem("userData"));

  const userToken = localStorage.getItem("userToken");

  const handleLogoutUser = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userData");
    navigate("/login");
  };

  return (
    <Flex w="100vw" p="10px" bg="#d0d6db" justifyContent={"right"}>
      {userToken ? (
        <Flex gap="10px">
          <Button>
            {userData.email}
          </Button>
          <Button
            onClick={handleLogoutUser}
            fontSize={{ base: "12px", sm: "12px", md: "16px", lg: "20px" }}
          >
            Logout
          </Button>
        </Flex>
      ) : (
        <Flex gap="10px">
          <Button disabled={show === false}>
            <Link to="/login">Login</Link>
          </Button>
          <Button disabled={show === false}>
            <Link to="/signup">Signup</Link>
          </Button>
        </Flex>
      )}
    </Flex>
  );
};

export default Navbar;
