import React from "react";
import QuantumComposer from "./components/QuantumComposer";
import { ThemeProvider, createTheme } from "@mui/material";

const theme = createTheme();

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <QuantumComposer />
      </ThemeProvider>
    </>
  );
}

export default App;
