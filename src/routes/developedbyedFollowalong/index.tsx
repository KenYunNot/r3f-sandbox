import React from 'react';
import type { Mesh } from 'three';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const DevelopedbyedFollowalong = () => {
  const [sphereMesh, setSphereMesh] = React.useState<Mesh | null>(null);
  const [rgb, setRgb] = React.useState<number[]>([0, 255, 131]);
  const isMouseDown = React.useRef(false);

  React.useEffect(() => {
    const onMouseDown = () => {
      isMouseDown.current = true;
    };

    const onMouseUp = () => {
      isMouseDown.current = false;
    };

    const onMouseMove = (event: MouseEvent) => {
      if (!isMouseDown.current) return;

      setRgb([
        Math.round((event.pageX / window.innerWidth) * 255),
        Math.round((event.pageY / window.innerHeight) * 255),
        150,
      ]);
    };

    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('mousemove', onMouseMove);

    return () => {
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  useGSAP(() => {
    gsap.set('nav', { y: '-100%' });
    gsap.set('h1', { opacity: 0 });
  });

  useGSAP(() => {
    if (!sphereMesh) return;
    gsap
      .timeline({ defaults: { duration: 1 } })
      .fromTo(sphereMesh.scale, { x: 0, y: 0, z: 0 }, { x: 1, y: 1, z: 1 })
      .to('nav', { y: '0%' })
      .to('h1', { opacity: 1 });
  }, [sphereMesh]);

  return (
    <div>
      <nav className='relative px-32 py-16 flex justify-between text-white z-[2]'>
        <a
          href='/'
          className='font-bold no-underline'
        >
          Home
        </a>
        <ul className='list-none flex gap-16'>
          <li>Hello World</li>
          <li>My First R3F Project</li>
        </ul>
      </nav>
      <h1 className='absolute top-3/4 left-1/2 -translate-x-1/2 text-5xl text-white z-[2]'>Give it a spin</h1>
      <div className='absolute top-0 left-0 w-full h-full bg-black z-[1]'>
        <Canvas
          camera={{ fov: 45, position: [0, 0, 10] }}
          dpr={2}
        >
          <mesh ref={(ref) => setSphereMesh(ref)}>
            <sphereGeometry />
            <meshStandardMaterial color={`rgb(${rgb.join(',')})`} />
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
    </div>
  );
};

export default DevelopedbyedFollowalong;
