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
        height: '60px',
        borderRight: '1px dashed rgba(255, 255, 255, 0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'background-color 0.2s',
        '&:hover': {
          bgcolor: 'rgba(255, 255, 255, 0.07)',
        },
      }}
    />
  );
};

const CircuitGrid = ({ qubits, circuit }) => {
  const positions = 12; // Wider circuit layout

  return (
    <Box sx={{ width: '100%', overflowX: 'auto', pb: 2 }}>
      {Array.from({ length: qubits }).map((_, qubit) => (
        <Box
          key={qubit}
          sx={{
            display: 'flex',
            alignItems: 'center',
            borderBottom: '1px solid #334155',
            height: '60px',
            position: 'relative',
          }}
        >
          {/* Qubit Label */}
          <Box
            sx={{
              width: '60px',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#67e8f9',
              fontWeight: 'bold',
              borderRight: '1px solid #334155',
              bgcolor: 'rgba(255, 255, 255, 0.02)',
            }}
          >
            q[{qubit}]
          </Box>

          {/* Circuit Cells */}
          <Box sx={{ flex: 1, display: 'flex', position: 'relative' }}>
            {/* Rail Line */}
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: 0,
                right: 0,
                height: '2px',
                bgcolor: '#475569',
                zIndex: 0,
              }}
            />

            {/* Droppable Cells */}
            {Array.from({ length: positions }).map((_, position) => (
              <GridCell key={position} qubit={qubit} position={position} />
            ))}

            {/* Gates */}
            {circuit
              .filter((g) => g.qubit === qubit)
              .map((gate) => (
                <Box
                  key={`${gate.qubit}-${gate.position}`}
                  sx={{
                    position: 'absolute',
                    left: `${gate.position * 60 + 10}px`,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '40px',
                    height: '32px',
                    bgcolor: gate.gate.color,
                    color: '#fff',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 600,
                    fontSize: '14px',
                    boxShadow: 4,
                    zIndex: 2,
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
