import React from 'react';
import type { Mesh } from 'three';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import './App.css';

function App() {
  const [sphereMesh, setSphereMesh] = React.useState<Mesh | null>(null);

  useGSAP(() => {
    gsap.set('nav', { y: '-100%' });
    gsap.set('.title', { opacity: 0 });
  });

  useGSAP(() => {
    if (!sphereMesh) return;
    gsap
      .timeline({ defaults: { duration: 1 } })
      .fromTo(sphereMesh.scale, { x: 0, y: 0, z: 0 }, { x: 1, y: 1, z: 1 })
      .fromTo('nav', { y: '-100%' }, { y: '0%' })
      .fromTo('.title', { opacity: 0 }, { opacity: 1 });
  }, [sphereMesh]);

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
          <mesh ref={(ref) => setSphereMesh(ref)}>
            <sphereGeometry />
            <meshStandardMaterial color='#00ff83' />
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
            autoRotateSpeed={2}
          />
        </Canvas>
      </div>
    </>
  );
}

export default App;
