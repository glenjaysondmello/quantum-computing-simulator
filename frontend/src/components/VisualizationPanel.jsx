import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import BlochSphere from './BlochSphere';

const VisualizationPanel = () => {
  const data = [
    { state: '|00>', probability: 100 },
    { state: '|01>', probability: 0 },
    { state: '|10>', probability: 0 },
    { state: '|11>', probability: 0 },
  ];

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Typography variant="h6" gutterBottom>
          Probabilities
        </Typography>
        <BarChart width={400} height={200} data={data}>
          <XAxis dataKey="state" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="probability" fill="#1976d2" />
        </BarChart>
      </Grid>
      <Grid item xs={6}>
        <Typography variant="h6" gutterBottom>
          Bloch Sphere
        </Typography>
        <Box sx={{ width: '100%', height: 200 }}>
          <BlochSphere />
        </Box>
      </Grid>
    </Grid>
  );
};

export default VisualizationPanel;