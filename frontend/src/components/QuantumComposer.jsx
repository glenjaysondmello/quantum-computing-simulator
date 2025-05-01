import React, { useState } from 'react';
import { Box, Grid, Paper, IconButton, Typography, Switch } from '@mui/material';
import { DndContext, closestCenter } from '@dnd-kit/core';
import GatePanel from './GatePanel';
import CircuitGrid from './CircuitGrid';
import VisualizationPanel from './VisualizationPanel';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const QuantumComposer = () => {
  const [qubits] = useState(4);
  const [circuit, setCircuit] = useState([]);
  const [darkMode, setDarkMode] = useState(true);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (over) {
      const [qubit, position] = over.id.split('-').map(Number);
      const gate = active.data.current;
      if (!circuit.some((g) => g.qubit === qubit && g.position === position)) {
        setCircuit((prev) => [
          ...prev,
          { qubit, position, gate: { id: gate.id, label: gate.label, color: gate.color } },
        ]);
      }
    }
  };

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  const backgroundGradient = darkMode
    ? 'linear-gradient(to bottom right, #0f172a, #1e3a8a)'
    : 'linear-gradient(to bottom right, #f8fafc, #bfdbfe)';

  const paperStyle = {
    p: 2,
    borderRadius: 3,
    bgcolor: darkMode ? '#1e293b' : '#ffffff',
    color: darkMode ? '#e2e8f0' : '#1e293b',
    boxShadow: 3,
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <Box
        sx={{
          height: '100vh',
          background: backgroundGradient,
          p: 2,
          transition: 'all 0.3s ease',
        }}
      >
        {/* Top bar */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h4" fontWeight="bold" color={darkMode ? '#67e8f9' : '#0f172a'}>
            Quantum Composer
          </Typography>
          <Box display="flex" alignItems="center" gap={1}>
            <Typography variant="body2" color={darkMode ? '#f8fafc' : '#1e293b'}>
              Dark Mode
            </Typography>
            <Switch
              checked={darkMode}
              onChange={toggleDarkMode}
              color="default"
              icon={<Brightness7Icon />}
              checkedIcon={<Brightness4Icon />}
            />
          </Box>
        </Box>

        {/* Grid layout */}
        <Grid container spacing={2}>
          <Grid item xs={12} md={3}>
            <Paper sx={{ ...paperStyle, height: '90vh' }}>
              <GatePanel />
            </Paper>
          </Grid>
          <Grid item xs={12} md={9}>
            <Paper sx={{ ...paperStyle, height: '60vh', mb: 2 }}>
              <CircuitGrid qubits={qubits} circuit={circuit} />
            </Paper>
            <Paper sx={{ ...paperStyle, height: '28vh' }}>
              <VisualizationPanel />
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </DndContext>
  );
};

export default QuantumComposer;
