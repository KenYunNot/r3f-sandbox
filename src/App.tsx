import React from 'react';
import { Canvas } from '@react-three/fiber';
import './App.css';
import { OrbitControls } from '@react-three/drei';

function App() {
  return (
    <>
      <nav>
        <a href='/'>Sphere</a>
        <ul>
          <li>Explore</li>
          <li>Create</li>
        </ul>
      </nav>
      <h1 className='title'>Give it a spin</h1>
      <div id='canvas-container'>
        <Canvas
          camera={{ fov: 45, position: [0, 0, 10] }}
          dpr={2}
        >
          <mesh>
            <sphereGeometry />
            <meshStandardMaterial color={'#00ff83'} />
          </mesh>
          <pointLight
            intensity={15}
            decay={1}
            position={[0, 10, 10]}
          />
          <OrbitControls
            enableDamping={true}
            enablePan={false}
            enableZoom={false}
            autoRotate={true}
            autoRotateSpeed={10}
          />
        </Canvas>
      </div>
    </>
  );
}

export default App;
