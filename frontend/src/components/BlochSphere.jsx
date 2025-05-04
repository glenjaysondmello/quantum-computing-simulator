import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, Line } from '@react-three/drei';
import { useTheme } from '@mui/material/styles';

const BlochSphere = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const sphereColor = isDark ? '#1e40af' : '#ffffff'; // Dark blue in dark mode, white in light

  return (
    <Canvas camera={{ position: [2.5, 2.5, 2.5], fov: 45 }}>
      <ambientLight intensity={0.6} />
      <pointLight position={[5, 5, 5]} intensity={1} />

      <Sphere args={[1, 64, 64]} position={[0, 0, 0]}>
        <meshPhongMaterial
          color={sphereColor}
          wireframe
          opacity={0.3}
          transparent
        />
      </Sphere>

      {/* Axis Lines */}
      <Line points={[[-1.5, 0, 0], [1.5, 0, 0]]} color="red" />
      <Line points={[[0, -1.5, 0], [0, 1.5, 0]]} color="green" />
      <Line points={[[0, 0, -1.5], [0, 0, 1.5]]} color="blue" />

      {/* State vector */}
      <Line points={[[0, 0, 0], [0, 0.7, 0.7]]} color="purple" />

      <OrbitControls enableZoom />
    </Canvas>
  );
};

export default BlochSphere;
