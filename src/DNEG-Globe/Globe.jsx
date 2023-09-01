import React from 'react';
import GeoJSON from './GeoJSON'
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei'

const vertexShader = `
void main() {
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
void main() {
    gl_FragColor = vec4(251.0/255.0, 251.0/255.0, 240.0/255.0, 1.0);
}
`;

export default function Globe() {
  const globeRef = React.useRef();
  const [targetQuaternion, setTargetQuaternion] = React.useState(new THREE.Quaternion());

  useFrame(() => {
    const globe = globeRef.current;
    if (globe) {
      globe.quaternion.slerp(targetQuaternion, 0.1);
    }
  });

  function rotateToLocation([lat, long]) {
    const phi = THREE.MathUtils.degToRad(90 + lat);
    const theta = THREE.MathUtils.degToRad(long + 180);

    const euler = new THREE.Euler(-phi, theta, 0, 'YXZ');
    const target = new THREE.Quaternion().setFromEuler(euler);

    setTargetQuaternion(target);
  }

  return (
    <group ref={globeRef} position={[0, 0, 0]}>
      <mesh>
        <sphereGeometry args={[1, 32]} />
        <shaderMaterial 
          vertexShader={vertexShader} 
          fragmentShader={fragmentShader}
        />
      </mesh>
      <GeoJSON setTargetRotation={setTargetQuaternion} rotateToLocation={rotateToLocation} />
      <Html wrapperClass="label">
        <div>
          <button onClick={() => rotateToLocation([52.5200, 13.4050])}>Go to Berlin</button>
          <button onClick={() => rotateToLocation([34.0522, -118.2437])}>Go to Los Angeles</button>
          <button onClick={() => rotateToLocation([-23.5505, -46.6333])}>Go to São Paulo</button>
          <button onClick={() => rotateToLocation([35.6895, 139.6917])}>Go to Tokyo</button>
        </div>
      </Html>
    </group>
  );
}
