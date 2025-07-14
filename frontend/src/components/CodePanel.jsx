import React, { useState } from 'react';
import { Box, Typography, IconButton, Select, MenuItem, FormControl } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const CodePanel = ({ circuit, selectedLanguage, onLanguageChange }) => {

  const handleLanguageChange = (event) => {
    onLanguageChange(event.target.value);
  };
  const generateQSharpCode = () => {
    let code = 'namespace QuantumCircuit {\n';
    code += '    open Microsoft.Quantum.Canon;\n';
    code += '    open Microsoft.Quantum.Intrinsic;\n\n';
    code += '    operation RunCircuit() : Unit {\n';
    code += '        use qubits = Qubit[4];\n\n';

    const sortedOperations = [...circuit].sort((a, b) => a.position - b.position);

    sortedOperations.forEach(op => {
      switch (op.gate.id) {
        case 'h':
          code += `        H(qubits[${op.qubit}]);\n`;
          break;
        case 'x':
          code += `        X(qubits[${op.qubit}]);\n`;
          break;
        case 'y':
          code += `        Y(qubits[${op.qubit}]);\n`;
          break;
        case 'z':
          code += `        Z(qubits[${op.qubit}]);\n`;
          break;
        case 'cx':
          const targetQubit = (op.qubit + 1) % 4;
          code += `        CNOT(qubits[${op.qubit}], qubits[${targetQubit}]);\n`;
          break;
        case 'rz':
          code += `        Rz(PI() / 4.0, qubits[${op.qubit}]);\n`;
          break;
      }
    });

    code += '\n        // Reset all qubits\n';
    code += '        ResetAll(qubits);\n';
    code += '    }\n';
    code += '}\n';

    return code;
  };

  const generateQiskitCode = () => {
    let code = 'from qiskit import QuantumCircuit, QuantumRegister, ClassicalRegister\n\n';
    code += '# Create quantum circuit with 4 qubits\n';
    code += 'qr = QuantumRegister(4, "q")\n';
    code += 'cr = ClassicalRegister(4, "c")\n';
    code += 'qc = QuantumCircuit(qr, cr)\n\n';

    // Sort circuit operations by position to maintain order
    const sortedOperations = [...circuit].sort((a, b) => a.position - b.position);

    // Add gates to the circuit
    sortedOperations.forEach(op => {
      switch (op.gate.id) {
        case 'h':
          code += `qc.h(qr[${op.qubit}])  # Hadamard gate\n`;
          break;
        case 'x':
          code += `qc.x(qr[${op.qubit}])  # Pauli-X gate\n`;
          break;
        case 'y':
          code += `qc.y(qr[${op.qubit}])  # Pauli-Y gate\n`;
          break;
        case 'z':
          code += `qc.z(qr[${op.qubit}])  # Pauli-Z gate\n`;
          break;
        case 'cx':
          // For CX gates, we'll need to handle control and target qubits
          // For simplicity, we'll assume the control qubit is the current one
          // and the target is the next qubit
          const targetQubit = (op.qubit + 1) % 4;
          code += `qc.cx(qr[${op.qubit}], qr[${targetQubit}])  # CNOT gate\n`;
          break;
        case 'rz':
          code += `qc.rz(pi/4, qr[${op.qubit}])  # RZ gate with pi/4 rotation\n`;
          break;
        default:
          break;
      }
    });

    // Add measurement operations
    code += '\n# Measure all qubits\n';
    code += 'qc.measure(qr, cr)\n';

    return code;
  };

  const getCode = () => {
    switch (selectedLanguage) {
      case 'qsharp':
        return generateQSharpCode();
      case 'qiskit':
      default:
        return generateQiskitCode();
    }
  };

  const handleCopyCode = () => {
    const code = getCode();
    navigator.clipboard.writeText(code);
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 1,
          gap: 2,
        }}
      >
        <Typography variant="h6" sx={{ color: '#67e8f9', fontWeight: 'bold', flexGrow: 1 }}>
          Code Output
        </Typography>
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <Select
            value={selectedLanguage}
            onChange={handleLanguageChange}
            sx={{ color: '#67e8f9', '& .MuiOutlinedInput-notchedOutline': { borderColor: '#67e8f9' } }}
          >
            <MenuItem value="qiskit">Qiskit</MenuItem>
            <MenuItem value="qsharp">Q#</MenuItem>
          </Select>
        </FormControl>
        <IconButton
          onClick={handleCopyCode}
          size="small"
          sx={{ color: '#67e8f9' }}
          title="Copy code"
        >
          <ContentCopyIcon />
        </IconButton>
      </Box>
      <Box
        sx={{
          flex: 1,
          bgcolor: '#1e293b',
          borderRadius: 1,
          p: 2,
          overflow: 'auto',
          fontFamily: 'monospace',
          whiteSpace: 'pre',
          color: '#e2e8f0',
        }}
      >
        {getCode()}
      </Box>
    </Box>
  );
};

export default CodePanel;