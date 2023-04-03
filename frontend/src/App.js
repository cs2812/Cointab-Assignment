import "./App.css";
import Navbar from "./Components/Navbar";
import { Box } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";
import SignupPage from "./Pages/SignupPage";
import PrivateRoute from "./Components/PrivateRoute";
import { useState } from "react";

function App() {
  const [ show ,setShow] =useState(true)
  // console.log(show)
  return (
    <Box className="App" w="100%">
      <Navbar show={show}/>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<LoginPage setShow={setShow}/>} />
        <Route path="/signUp" element={<SignupPage />} />
      </Routes>
    </Box>
  );
}

export default App;
