import { useMemo, useRef } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { TextureLoader, Color, Vector3 } from 'three';

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
  const { viewport, pointer } = useThree();
  const uniforms = useRef({
    uColor: { type: 'vec3', value: new Color(0x424242) },
    uTexture: { type: 'vec3', value: new TextureLoader().load('/circle.png') },
    uMouse: { type: 'vec3', value: new Vector3() },
    uPointSize: { type: 'float', value: 6.0 },
  });
  const vertexShader = `
    uniform float uPointSize;

    varying vec3 vUv;

    void main() {
      vUv = position;

      vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);
      gl_PointSize = uPointSize;
      gl_Position = projectionMatrix * modelViewPosition; 
    }
  `;
  const fragmentShader = `
    uniform vec3 uColor;
    uniform sampler2D uTexture;

    varying vec3 vUv;
  
    void main() {
      gl_FragColor = vec4(uColor, 1.0) * texture2D( uTexture, gl_PointCoord );
    }
  `;

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
      <shaderMaterial
        uniforms={uniforms.current}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
      />
    </points>
  );
};

export default BufferGeometryDemo;
