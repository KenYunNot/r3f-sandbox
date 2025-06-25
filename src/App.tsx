import React from 'react';
import { Canvas } from '@react-three/fiber';
import './App.css';

function App() {
  return (
    <div id='canvas-container'>
      <Canvas camera={{ fov: 45, aspect: 800 / 600, position: [0, 0, 10] }}>
        <mesh>
          <sphereGeometry />
          <meshStandardMaterial args={[{ color: '#00ff83' }]} />
        </mesh>
        <pointLight
          args={['white', 1, 100]}
          position={[0, 10, 10]}
        />
      </Canvas>
    </div>
  );
}

export default App;
