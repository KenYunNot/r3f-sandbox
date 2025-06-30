import { useEffect, useRef } from 'react';
import { TextureLoader, Color, type Mesh } from 'three';
import { Canvas, useLoader } from '@react-three/fiber';
import { Environment } from '@react-three/drei';

import './styles.css';

const MouseFollow = () => {
  return (
    <div className='container'>
      <a href='/'>Home</a>
      <div id='canvas-container'>
        <Canvas
          camera={{ position: [0, 0, 50] }}
          scene={{ background: new Color(0xf0f0f0) }}
        >
          <Environment files={'environments/qwantani_afternoon_puresky_2k.hdr'} />
          <Box />
          <ambientLight intensity={5} />
        </Canvas>
      </div>
    </div>
  );
};

const Box = () => {
  const meshRef = useRef<Mesh>(null!);
  const [colorMap, metalnessMap, normalMap, roughnessMap] = useLoader(TextureLoader, [
    'Metal061B_1K-JPG/Metal061B_1K-JPG_Color.jpg',
    'Metal061B_1K-JPG/Metal061B_1K-JPG_Metalness.jpg',
    'Metal061B_1K-JPG/Metal061B_1K-JPG_NormalGL.jpg',
    'Metal061B_1K-JPG/Metal061B_1K-JPG_Roughness.jpg',
  ]);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      meshRef.current.lookAt(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1,
        0.5
      );
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[10, 10, 10]} />
      <meshStandardMaterial
        color='rgb(4,158,244)'
        roughness={1}
        metalness={0.5}
        map={colorMap}
        metalnessMap={metalnessMap}
        normalMap={normalMap}
        roughnessMap={roughnessMap}
      />
    </mesh>
  );
};

export default MouseFollow;
