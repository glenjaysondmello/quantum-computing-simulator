import React from 'react';
import { Box } from '@mui/material';

const CircuitGrid = ({ qubits }) => {
  return (
    <Box sx={{ width: '100%' }}>
      {Array.from({ length: qubits }).map((_, i) => (
        <Box
          key={i}
          sx={{
            height: '60px',
            borderBottom: '1px solid #ccc',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Box sx={{ width: '60px', borderRight: '1px solid #ccc' }}>
            q[{i}]
          </Box>
          <Box sx={{ flex: 1, height: '100%' }}>
            {/* Circuit line */}
            <Box
              sx={{
                width: '100%',
                height: '2px',
                bgcolor: '#ccc',
                position: 'relative',
                top: '50%',
              }}
            />
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default CircuitGrid;