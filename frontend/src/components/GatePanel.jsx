import React from 'react';
import { Box, Grid, Typography, useTheme } from '@mui/material';
import { useDraggable } from '@dnd-kit/core';

const Gate = ({ gate }) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: gate.id,
    data: gate,
  });

  return (
    <Box
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      sx={{
        bgcolor: gate.color,
        color: '#ffffff',
        px: 2,
        py: 1,
        userSelect: 'none',
        borderRadius: 2,
        textAlign: 'center',
        cursor: 'grab',
        fontWeight: 'bold',
        boxShadow: 3,
        transition: '0.2s ease-in-out',
        opacity: isDragging ? 0.7 : 1,
        '&:hover': {
          transform: 'scale(1.05)',
          opacity: 0.85,
        },
      }}
    >
      {gate.label}
    </Box>
  );
};

const GatePanel = () => {
  const theme = useTheme();
  const gates = [
    { id: 'h', label: 'H', color: '#2563eb' },     // Blue-600
    { id: 'x', label: 'X', color: '#dc2626' },     // Red-600
    { id: 'y', label: 'Y', color: '#ca8a04' },     // Amber-600
    { id: 'z', label: 'Z', color: '#059669' },     // Emerald-600
    { id: 'cx', label: 'CX', color: '#7c3aed' },   // Violet-600
    { id: 'rz', label: 'RZ', color: '#db2777' },   // Pink-600
  ];

  return (
    <Box>
      <Typography
        variant="h6"
        gutterBottom
        sx = {{color:'#67e8f9', fontWeight: 'bold'}}
        // sx={{ color: theme.palette.mode === 'dark' ? '#67e8f9' : '#0f172a', fontWeight: 'bold'}}
      >
        Quantum Gates
      </Typography>
      <Grid container spacing={1}>
        {gates.map((gate) => (
          <Grid item xs={6} sm={4} key={gate.id}>
            <Gate gate={gate} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default GatePanel;
