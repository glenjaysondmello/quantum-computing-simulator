import React from 'react';
import { Box } from '@mui/material';
import { useDroppable } from '@dnd-kit/core';

const GridCell = ({ qubit, position}) => {
  const { setNodeRef } = useDroppable({
    id: `${qubit}-${position}`,
  });

  return (
    <Box
      ref={setNodeRef}
      sx={{
        width: '60px',
        height: '100%',
        border: '2px dashed #1976d2',
        bgcolor: '#e3f2fd',
        position: 'relative',
      }}
    />
  );
};

const CircuitGrid = ({ qubits, circuit }) => {
  const positions = 10; // Number of grid positions per qubit

  return (
    <Box sx={{ width: '100%' }}>
      {Array.from({ length: qubits }).map((_, qubit) => (
        <Box
          key={qubit}
          sx={{
            height: '60px',
            borderBottom: '1px solid #ccc',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Box sx={{ width: '60px', borderRight: '1px solid #ccc' }}>
            q[{qubit}]
          </Box>
          <Box sx={{ flex: 1, height: '100%', position: 'relative' }}>
            {/* Circuit line */}
            <Box
              sx={{
                width: '100%',
                height: '2px',
                bgcolor: '#ccc',
                position: 'absolute',
                top: '50%',
                zIndex: 1,
              }}
            />
            {/* Grid cells for dropping */}
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
                    color: 'white',
                    p: 1,
                    borderRadius: 1,
                    zIndex: 2,
                    width: '40px',
                    textAlign: 'center',
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