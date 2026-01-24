import React, { useState, useEffect, useCallback } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import { DndContext, closestCenter } from "@dnd-kit/core";
import GatePanel from "./GatePanel";
import CircuitGrid from "./CircuitGrid";
import VisualizationPanel from "./VisualizationPanel";
import CodePanel from "./CodePanel";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NavBar from '../NavBar';

const WS_URL = 'ws://localhost:3000';

const QuantumComposer = () => {
  const [qubits] = useState(4);
  const [circuit, setCircuit] = useState([]);
  const [darkMode, setDarkMode] = useState(true);
  const [isVisualizationOpen, setIsVisualizationOpen] = useState(true);
  const [ws, setWs] = useState(null);
  const [simulationResults, setSimulationResults] = useState({
    probabilities: [],
    stateVector: []
  });
  const [selectedLanguage, setSelectedLanguage] = useState('qiskit');

  useEffect(() => {
    const websocket = new WebSocket(WS_URL);
    
    websocket.onopen = () => {
      console.log('Connected to server');
      setWs(websocket);
    };

    websocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'simulation_result') {
        setSimulationResults(data.data);
      }
    };

    websocket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    return () => {
      websocket.close();
    };
  }, []);

  const updateSimulation = useCallback(() => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({
        type: 'circuit_update',
        circuit,
        selectedLanguage
      }));
    }
  }, [circuit, selectedLanguage, ws]);

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
        updateSimulation();
      }
    }
  };

  useEffect(() => {
    updateSimulation();
  }, [updateSimulation]);

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

          {/* Middle Circuit Grid and Code Panel */}
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
                p: 2,
                display: "flex",
                flexDirection: "column",
                bgcolor: darkMode ? "#1e293b" : "#ffffff",
              }}
            >
              <CodePanel 
                circuit={circuit} 
                selectedLanguage={selectedLanguage}
                onLanguageChange={setSelectedLanguage}
              />
            </Box>
          </Box>

          {/* Right Visualization Panel */}
          <Box
            sx={{
              position: "relative",
              width: isVisualizationOpen ? "400px" : "0px",
              bgcolor: darkMode ? "#1e293b" : "#f1f5f9",
              borderLeft: isVisualizationOpen ? `1px solid ${darkMode ? "#334155" : "#cbd5e1"}` : "none",
              transition: "width 0.3s ease-in-out",
              overflow: "hidden",
            }}
          >
            <IconButton
              onClick={() => setIsVisualizationOpen(!isVisualizationOpen)}
              sx={{
                position: "absolute",
                left: "-20px",
                top: "50%",
                transform: "translateY(-50%)",
                bgcolor: darkMode ? "#334155" : "#e2e8f0",
                color: darkMode ? "#e2e8f0" : "#334155",
                '&:hover': {
                  bgcolor: darkMode ? "#475569" : "#cbd5e1",
                },
                zIndex: 1000,
                transition: "all 0.3s ease-in-out",
                boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                width: "32px",
                height: "32px",
              }}
            >
              {isVisualizationOpen ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
            <Box sx={{ height: "100%", overflow: "auto", p: 2 }}>
              <VisualizationPanel 
                darkMode={darkMode} 
                probabilities={simulationResults.probabilities}
                stateVector={simulationResults.stateVector}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </DndContext>
  );
};

export default QuantumComposer;
