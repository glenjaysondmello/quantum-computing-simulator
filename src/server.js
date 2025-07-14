const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const cors = require('cors');

const app = express();
app.use(cors());
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Store active connections
const clients = new Set()

// Quantum simulation helper functions
const createQuantumState = (numQubits) => {
  const size = Math.pow(2, numQubits);
  return new Array(size).fill(0).map((_, i) => i === 0 ? 1 : 0);
};

const applyGate = (state, gate, qubit) => {
  const size = state.length;
  const newState = new Array(size).fill(0);
  
  for (let i = 0; i < size; i++) {
    const bit = (i >> qubit) & 1;
    let newIndex = i;
    
    switch (gate) {
      case 'x':
        newIndex = i ^ (1 << qubit);
        newState[newIndex] = state[i];
        break;
      case 'h':
        const sign = bit === 0 ? 1 : -1;
        newState[i] += state[i] / Math.sqrt(2);
        newState[i ^ (1 << qubit)] += sign * state[i] / Math.sqrt(2);
        break;
      // Add more gates as needed
    }
  }
  
  return newState;
};

const calculateProbabilities = (state) => {
  return state.map(amplitude => Math.pow(Math.abs(amplitude), 2));
};

// Handle WebSocket connections
wss.on('connection', (ws) => {
  clients.add(ws);

  ws.on('message', (message) => {
    try {
      const data = JSON.parse(message);
      
      if (data.type === 'circuit_update') {
        // Initialize quantum state
        let state = createQuantumState(4);
        
        // Apply gates in sequence
        data.circuit.forEach(operation => {
          state = applyGate(state, operation.gate.id, operation.qubit);
        });
        
        // Calculate probabilities
        const probabilities = calculateProbabilities(state);

        // Send the results back to the client
        ws.send(JSON.stringify({
          type: 'simulation_result',
          data: {
            probabilities,
            stateVector: state,
            selectedLanguage: data.selectedLanguage
          }
        }));
      }
    } catch (error) {
      console.error('Error processing circuit:', error);
      ws.send(JSON.stringify({
        type: 'error',
        message: 'Error simulating quantum circuit'
      }));
    }
  });

  ws.on('close', () => {
    clients.delete(ws);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});