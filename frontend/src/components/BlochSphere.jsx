import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, Line } from '@react-three/drei';

const BlochSphere = () => {
  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      
      <Sphere args={[1, 32, 32]} position={[0, 0, 0]}>
        <meshPhongMaterial wireframe color="white" opacity={0.3} transparent />
      </Sphere>

      <Line points={[[-1.5, 0, 0], [1.5, 0, 0]]} color="red" /> {/* X-axis */}
      <Line points={[[0, -1.5, 0], [0, 1.5, 0]]} color="green" /> {/* Y-axis */}
      <Line points={[[0, 0, -1.5], [0, 0, 1.5]]} color="blue" /> {/* Z-axis */}

      <Line points={[[0, 0, 0], [0, 0, 1]]} color="purple" />
      
      <OrbitControls />
    </Canvas>
  );
};

export default BlochSphere;