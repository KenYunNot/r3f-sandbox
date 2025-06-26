import React from 'react';
import type { Color, Mesh } from 'three';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import './App.css';

function App() {
  const canvas = React.useRef<HTMLDivElement>(null);
  const timeline = gsap.timeline({ defaults: { duration: 1 } });

  useGSAP(() => {
    timeline.fromTo('nav', { y: '-100%' }, { y: '0%' });
  });

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
      <div
        ref={canvas}
        id='canvas-container'
      >
        <Canvas
          camera={{ fov: 45, position: [0, 0, 10] }}
          dpr={2}
        >
          <Sphere
            color='#00ff83'
            timeline={timeline}
          />
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

const Sphere = ({
  color = '0xffffff',
  timeline,
}: {
  color: string | number | Color;
  timeline: ReturnType<typeof gsap.timeline>;
}) => {
  const sphereMesh = React.useRef<Mesh>(null!);

  useGSAP(() => {
    timeline.fromTo(sphereMesh.current.scale, { x: 0, y: 0, z: 0 }, { x: 1, y: 1, z: 1 });
  });

  return (
    <mesh ref={sphereMesh}>
      <sphereGeometry />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

export default App;
