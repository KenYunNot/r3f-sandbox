import React from 'react';
import { Canvas } from '@react-three/fiber';
import './App.css';

function App() {
  return (
    <div id='canvas-container'>
      <Canvas camera={{ fov: 45, aspect: window.innerWidth / window.innerHeight, position: [0, 0, 10] }}>
        <mesh>
          <sphereGeometry />
          <meshStandardMaterial color={'#00ff83'} />
        </mesh>
        <pointLight
          intensity={15}
          decay={1}
          position={[0, 10, 10]}
        />
      </Canvas>
    </div>
  );
}

export default App;
