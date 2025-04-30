import React, { useState } from 'react';
import { Box, Grid, Paper } from '@mui/material';
import GatePanel from './GatePanel';
import CircuitGrid from './CircuitGrid';
import VisualizationPanel from './VisualizationPanel';

const QuantumComposer = () => {
  const [qubits] = useState(4);
  const [circuit] = useState([]);

  return (
    <Box sx={{ flexGrow: 1, height: '100vh', p: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Paper sx={{ p: 2, height: '90vh' }}>
            <GatePanel />
          </Paper>
        </Grid>
        <Grid item xs={9}>
          <Paper sx={{ p: 2, height: '60vh', mb: 2 }}>
            <CircuitGrid qubits={qubits} circuit={circuit} />
          </Paper>
          <Paper sx={{ p: 2, height: '28vh' }}>
            <VisualizationPanel />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default QuantumComposer;