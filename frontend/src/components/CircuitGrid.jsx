import React from 'react';
import { Box, Typography } from '@mui/material';
import { useDroppable } from '@dnd-kit/core';

const GridCell = ({ qubit, position }) => {
  const { setNodeRef } = useDroppable({
    id: `${qubit}-${position}`,
  });

  return (
    <Box
      ref={setNodeRef}
      sx={{
        width: '60px',
        height: '100%',
        border: '1px dashed rgba(255, 255, 255, 0.2)',
        bgcolor: 'rgba(255, 255, 255, 0.05)',
        transition: '0.2s',
        '&:hover': {
          bgcolor: 'rgba(255, 255, 255, 0.1)',
        },
      }}
    />
  );
};

const CircuitGrid = ({ qubits, circuit }) => {
  const positions = 10;

  return (
    <Box sx={{ width: '100%', px: 1 }}>
      {Array.from({ length: qubits }).map((_, qubit) => (
        <Box
          key={qubit}
          sx={{
            height: '60px',
            borderBottom: '1px solid #444',
            display: 'flex',
            alignItems: 'center',
            color: '#ffffff',
          }}
        >
          <Box
            sx={{
              width: '60px',
              borderRight: '1px solid #444',
              fontWeight: 'bold',
              textAlign: 'center',
              color: '#67e8f9',
            }}
          >
            q[{qubit}]
          </Box>

          <Box sx={{ flex: 1, height: '100%', position: 'relative' }}>
            <Box
              sx={{
                width: '100%',
                height: '2px',
                bgcolor: '#888',
                position: 'absolute',
                top: '50%',
                zIndex: 1,
              }}
            />

            <Box sx={{ display: 'flex', height: '100%' }}>
              {Array.from({ length: positions }).map((_, pos) => (
                <GridCell key={pos} qubit={qubit} position={pos} />
              ))}
            </Box>

            {/* Render dropped gates */}
            {circuit
              .filter((gate) => gate.qubit === qubit)
              .map((gate) => (
                <Box
                  key={`${gate.qubit}-${gate.position}`}
                  sx={{
                    position: 'absolute',
                    left: `${gate.position * 60 + 10}px`,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    bgcolor: gate.gate.color,
                    color: '#fff',
                    px: 1.5,
                    py: 0.5,
                    borderRadius: '6px',
                    zIndex: 2,
                    boxShadow: 3,
                    fontWeight: 'bold',
                    textAlign: 'center',
                    width: '40px',
                  }}
                >
                  {gate.gate.label}
                </Box>
              ))}
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default CircuitGrid;
