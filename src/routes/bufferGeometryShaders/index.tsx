import { useMemo, useRef } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { TextureLoader, Color, Vector2 } from 'three';

const BufferGeometryShaders = () => {
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
    uColor: { type: 'vec3', value: new Color(0x525252) },
    uAccentColor: { type: 'vec3', value: new Color(0x74d4ff) },
    uTexture: { type: 'vec3', value: new TextureLoader().load('/circle.png') },
    uMouse: { type: 'vec2', value: new Vector2(0, 0) },
    uPointSize: { type: 'float', value: 6.0 },
    uAmplitude: { type: 'float', value: 15.0 },
    uSigma: { type: 'float', value: 10.0 },
  });
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

  const vertexShader = `
    uniform vec2 uMouse;
    uniform float uPointSize;
    uniform float uAmplitude;
    uniform float uSigma;

    varying float pointZ;

    float gauss(vec2 v) {
      float x = v.x;
      float y = v.y;
      float x_0 = uMouse.x;
      float y_0 = uMouse.y;
      return uAmplitude * exp(-( ((x - x_0) * (x - x_0)) / (2.0 * uSigma * uSigma) + ((y - y_0) * (y - y_0)) / (2.0 * uSigma * uSigma) ));
    }

    void main() {
      pointZ = gauss(position.xy);

      gl_PointSize = uPointSize;
      vec4 modelViewPosition = modelViewMatrix * vec4(position.xy, pointZ, 1.0);
      gl_Position = projectionMatrix * modelViewPosition; 
    }
  `;
  const fragmentShader = `
    uniform vec3 uColor;
    uniform vec3 uAccentColor;
    uniform vec2 uMouse;
    uniform float uAmplitude;
    uniform sampler2D uTexture;

    varying float pointZ;

    void main() {
      float colorMultiplier = pointZ / uAmplitude;
      gl_FragColor = vec4( uColor + uAccentColor * colorMultiplier, 1.0 ) * texture2D( uTexture, gl_PointCoord );
    }
  `;

  const handlePointerMove = () => {
    uniforms.current.uMouse.value = new Vector2(pointer.x * (viewport.width / 2), pointer.y * (viewport.height / 2));
  };

  return (
    <points onPointerMove={handlePointerMove}>
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
        transparent={true}
      />
    </points>
  );
};

export default BufferGeometryShaders;
