import { useMemo } from 'react';
import { Canvas, useLoader, useThree } from '@react-three/fiber';
import { TextureLoader } from 'three';
import circleImg from '/circle.png';

const BufferGeometryDemo = () => {
  return (
    <div className='w-full h-screen'>
      <div
        id='canvas-container'
        className='absolute top-0 left-0 w-full h-full'
      >
        <Canvas camera={{ position: [0, 0, 50] }}>
          <BufferPoints sep={1} />
        </Canvas>
      </div>
    </div>
  );
};

const BufferPoints = ({ sep }: { sep: number }) => {
  const { viewport } = useThree();
  const imgTexture = useLoader(TextureLoader, circleImg);
  const { positions, normals } = useMemo(() => {
    const positions = [];
    const normals = [];

    for (let xi = 0; xi < viewport.width; xi += sep) {
      for (let yi = 0; yi < viewport.height; yi += sep) {
        const x = xi - (viewport.width - 1) / 2;
        const y = yi - (viewport.height - 1) / 2;
        const z = 0;
        positions.push(x, y, z);
        normals.push(0, 0, 1);
      }
    }

    return {
      positions: new Float32Array(positions),
      normals: new Float32Array(normals),
    };
  }, [viewport, sep]);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach='attributes-position'
          args={[positions, 3]}
        />
        <bufferAttribute
          attach='attributes-normals'
          args={[normals, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        map={imgTexture}
        color={0x242424}
        size={0.6}
        sizeAttenuation
        transparent={false}
        alphaTest={0.5}
        opacity={1.0}
      />
    </points>
  );
};

export default BufferGeometryDemo;
