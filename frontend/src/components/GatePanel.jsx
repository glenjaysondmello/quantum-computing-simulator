import React from 'react';
import { Box, Grid, Typography } from '@mui/material';

const GatePanel = () => {
  const gates = [
    { id: 'h', label: 'H', color: '#1976d2' },
    { id: 'x', label: 'X', color: '#d32f2f' },
    { id: 'y', label: 'Y', color: '#d32f2f' },
    { id: 'z', label: 'Z', color: '#d32f2f' },
    { id: 'cx', label: 'CX', color: '#7b1fa2' },
    { id: 'rz', label: 'RZ', color: '#7b1fa2' },
  ];

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Quantum Gates
      </Typography>
      <Grid container spacing={1}>
        {gates.map((gate) => (
          <Grid item xs={4} key={gate.id}>
            <Box
              sx={{
                bgcolor: gate.color,
                color: 'white',
                p: 1,
                borderRadius: 1,
                textAlign: 'center',
                cursor: 'grab',
              }}
            >
              {gate.label}
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default GatePanel;