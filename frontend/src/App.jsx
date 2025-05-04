import React from "react";
import { ThemeProvider, createTheme } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./Home";
import QuantumComposer from "./components/QuantumComposer";
import Login from "./pages/Login";
import Signup from "./pages/Signup";


const theme = createTheme();

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/composer"
            element={
              <ThemeProvider theme={theme}>
                <QuantumComposer />
              </ThemeProvider>
            }
          />
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
