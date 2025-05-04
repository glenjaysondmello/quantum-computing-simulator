import React from "react";
import { ThemeProvider, createTheme } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router";
// import { useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";
import Home from "./Home";
import QuantumComposer from "./components/QuantumComposer";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PrivateRoute from "./privateRoute/PrivateRoute";

const theme = createTheme();

function App() {
  // const { token } = useSelector((store) => store.auth);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {/* {!token && (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </>
          )} */}
          <Route
            path="/composer"
            element={
              <PrivateRoute>
                <ThemeProvider theme={theme}>
                  <QuantumComposer />
                </ThemeProvider>
              </PrivateRoute>
            }
          />
        </Routes>
        <Toaster position="top-center" reverseOrder={false}/>
      </BrowserRouter>
    </>
  );
}

export default App;
