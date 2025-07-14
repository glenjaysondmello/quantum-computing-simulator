import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import BlochSphere from './BlochSphere';

const VisualizationPanel = ({ darkMode, probabilities, stateVector }) => {
  // Generate states for 4 qubits (16 states)
  const generateStates = () => {
    const states = [];
    for (let i = 0; i < 16; i++) {
      const binary = i.toString(2).padStart(4, '0');
      states.push(`|${binary}>`);
    }
    return states;
  };

  const data = generateStates().map((state, index) => ({
    state,
    probability: probabilities[index] || 0
  }));

  return (
    <Grid container spacing={0} sx={{ height: '100%' }}>
      <Grid item xs={12} md={6} sx={{ p: 2, borderRight: '1px solid', borderColor: darkMode ? '#334155' : '#cbd5e1' }}>
        <Typography
          variant="h6"
          gutterBottom
          sx={{ color: darkMode ? '#67e8f9' : '#0f172a', fontWeight: 'bold' }}
        >
          Probabilities (4 Qubits)
        </Typography>
        <Box sx={{ overflowX: 'auto', width: '100%' }}>
          <BarChart
            width={800} // Increased width to accommodate more bars
            height={300} // Increased height for better visibility
            data={data}
            margin={{ right: 20 }}
          >
            <XAxis
              dataKey="state"
              stroke={darkMode ? '#ffffff' : '#000000'}
              interval={0}
              angle={-45}
              textAnchor="end"
              height={70}
            />
            <YAxis stroke={darkMode ? '#ffffff' : '#000000'} />
            <Tooltip
              contentStyle={{
                backgroundColor: darkMode ? '#1e293b' : '#f1f5f9',
                color: darkMode ? '#ffffff' : '#000000',
              }}
            />
            <Bar dataKey="probability" fill={darkMode ? '#38bdf8' : '#1976d2'} />
          </BarChart>
        </Box>
      </Grid>

      <Grid item xs={12} md={6} sx={{ p: 2 }}>
        <Typography
          variant="h6"
          gutterBottom
          sx={{ color: darkMode ? '#67e8f9' : '#0f172a', fontWeight: 'bold' }}
        >
          Bloch Sphere
        </Typography>
        <Box
          sx={{
            width: '100%',
            height: 200,
            border: '1px solid',
            borderColor: darkMode ? '#334155' : '#cbd5e1',
            borderRadius: 2,
            overflow: 'hidden',
          }}
        >
          <BlochSphere darkMode={darkMode} />
        </Box>
      </Grid>
    </Grid>
  );
};

export default VisualizationPanel;
