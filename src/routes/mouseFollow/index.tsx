import { useRef } from 'react';
import { TextureLoader, type Mesh } from 'three';
import { Canvas, useLoader, useThree } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const MouseFollow = () => {
  return (
    <div className='w-full h-screen'>
      <div className='px-8 md:px-16 py-8 flex justify-between items-center'>
        <a
          href='/'
          className='inline-block text-3xl z-50 hover:underline'
        >
          Home
        </a>
        <p>GSAP for smooth transition</p>
      </div>
      <div className='absolute top-0 left-0 w-full h-full -z-[1]'>
        <Canvas camera={{ position: [0, 0, 50] }}>
          <Environment files={'environments/qwantani_afternoon_puresky_2k.hdr'} />
          <Box
            x={20}
            color='rgb(4,158,244)'
          />
          <Box
            x={-20}
            color='gray'
          />
          <Box
            x={20}
            y={20}
            z={-10}
            color='red'
          />
          <Box
            z={-20}
            color='green'
          />
          <ambientLight intensity={5} />
          <fog
            attach='fog'
            args={['black', 40, 100]}
          />
        </Canvas>
      </div>
    </div>
  );
};

const Box = ({
  x = 0,
  y = 0,
  z = 0,
  size = 10,
  color,
}: {
  x?: number;
  y?: number;
  z?: number;
  size?: number;
  color: string;
}) => {
  const { viewport } = useThree();
  const meshRef = useRef<Mesh>(null!);
  const mousePosition = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const [colorMap, metalnessMap, normalMap, roughnessMap] = useLoader(TextureLoader, [
    'Metal061B_1K-JPG/Metal061B_1K-JPG_Color.jpg',
    'Metal061B_1K-JPG/Metal061B_1K-JPG_Metalness.jpg',
    'Metal061B_1K-JPG/Metal061B_1K-JPG_NormalGL.jpg',
    'Metal061B_1K-JPG/Metal061B_1K-JPG_Roughness.jpg',
  ]);

  useGSAP(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const [vectorX, vectorY] = [
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1,
      ];
      gsap.to(mousePosition.current, {
        x: vectorX * (viewport.width / 2),
        y: vectorY * (viewport.height / 2),
        duration: 1.5,
        ease: 'power4.out',
        onUpdate: () => meshRef.current.lookAt(mousePosition.current.x, mousePosition.current.y, 5),
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  });

  return (
    <mesh
      ref={meshRef}
      position={[x, y, z]}
    >
      <boxGeometry args={[size, size, size]} />
      <meshStandardMaterial
        color={color}
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
