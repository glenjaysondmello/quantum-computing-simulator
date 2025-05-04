import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import BlochSphere from './BlochSphere';

const VisualizationPanel = ({ darkMode }) => {
  const data = [
    { state: '|00>', probability: 100 },
    { state: '|01>', probability: 0 },
    { state: '|10>', probability: 0 },
    { state: '|11>', probability: 0 },
  ];

  return (
    <Grid container spacing={0} sx={{ height: '100%' }}>
      <Grid item xs={12} md={6} sx={{ p: 2, borderRight: '1px solid', borderColor: darkMode ? '#334155' : '#cbd5e1' }}>
        <Typography
          variant="h6"
          gutterBottom
          sx={{ color: darkMode ? '#67e8f9' : '#0f172a', fontWeight: 'bold' }}
        >
          Probabilities
        </Typography>
        <BarChart width={400} height={200} data={data}>
          <XAxis dataKey="state" stroke={darkMode ? '#ffffff' : '#000000'} />
          <YAxis stroke={darkMode ? '#ffffff' : '#000000'} />
          <Tooltip
            contentStyle={{
              backgroundColor: darkMode ? '#1e293b' : '#f1f5f9',
              color: darkMode ? '#ffffff' : '#000000',
            }}
          />
          <Bar dataKey="probability" fill={darkMode ? '#38bdf8' : '#1976d2'} />
        </BarChart>
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
