import React, { useState } from "react";
import { Box, Typography, Switch } from "@mui/material";
import { DndContext, closestCenter } from "@dnd-kit/core";
import GatePanel from "./GatePanel";
import CircuitGrid from "./CircuitGrid";
import VisualizationPanel from "./VisualizationPanel";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import NavBar from '../NavBar';

const QuantumComposer = () => {
  const [qubits] = useState(4);
  const [circuit, setCircuit] = useState([]);
  const [darkMode, setDarkMode] = useState(true);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (over) {
      const [qubit, position] = over.id.split("-").map(Number);
      const gate = active.data.current;
      if (!circuit.some((g) => g.qubit === qubit && g.position === position)) {
        setCircuit((prev) => [
          ...prev,
          {
            qubit,
            position,
            gate: { id: gate.id, label: gate.label, color: gate.color },
          },
        ]);
      }
    }
  };

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <Box
        sx={{
          height: "100vh",
          width: "100vw",
          display: "flex",
          flexDirection: "column",
          bgcolor: darkMode ? "#0f172a" : "#f8fafc",
          color: darkMode ? "#e2e8f0" : "#1e293b",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <NavBar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <Box
          sx={{
            flex: "0 0 60px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            px: 4,
            bgcolor: darkMode ? "#1e293b" : "#ffffff",
            borderBottom: "1px solid #475569",
          }}
        >
          <Typography variant="h5" fontWeight="bold">
            Quantum Composer
          </Typography>
          {/* <Box display="flex" alignItems="center" gap={1}>
            <Typography>Dark Mode</Typography>
            <Switch
              checked={darkMode}
              onChange={toggleDarkMode}
              icon={<Brightness7Icon />}
              checkedIcon={<Brightness4Icon />}
            />
          </Box> */}
        </Box>

        {/* Main Content */}
        <Box
          sx={{
            flex: "1 1 auto",
            display: "flex",
            overflow: "hidden",
          }}
        >
          {/* Left Gate Panel */}
          <Box
            sx={{
              flex: "0 0 240px",
              bgcolor: darkMode ? "#1e293b" : "#f1f5f9",
              overflowY: "auto",
              p: 2,
              borderRight: "1px solid #334155",
            }}
          >
            <GatePanel />
          </Box>

          {/* Middle Circuit Grid */}
          <Box
            sx={{
              flex: "1 1 auto",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              p: 2,
            }}
          >
            <Box sx={{ flex: "1 1 60%", overflow: "auto" }}>
              <CircuitGrid qubits={qubits} circuit={circuit} />
            </Box>
            <Box
              sx={{
                flex: "1 1 40%",
                overflow: "hidden",
                mt: 2,
                border: "2px solid",
                borderColor: darkMode ? "#334155" : "#cbd5e1",
                borderRadius: 2,
                p: 0, // remove padding to align tightly
                display: "flex",
                flexDirection: "column",
                bgcolor: darkMode ? "#1e293b" : "#ffffff",
              }}
            >
              <VisualizationPanel darkMode={darkMode} />
            </Box>
          </Box>
        </Box>
      </Box>
    </DndContext>
  );
};

export default QuantumComposer;
