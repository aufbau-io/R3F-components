import React from 'react';
import GeoJSON from './GeoJSON'
import * as THREE from 'three';
import { useFrame  } from '@react-three/fiber';
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
  const [targetRotation, setTargetRotation] = React.useState(new THREE.Euler());

  useFrame(({ scene }) => {
    if (scene.rotation.equals(targetRotation)) return;

    scene.rotation.x += (targetRotation.x - scene.rotation.x) * 0.1;
    scene.rotation.y += (targetRotation.y - scene.rotation.y) * 0.1;
    scene.rotation.z += (targetRotation.z - scene.rotation.z) * 0.1;
  });
  function rotateToLocation([lat, long]) {
    const phi = THREE.MathUtils.degToRad(90 - lat);
    const theta = THREE.MathUtils.degToRad(long + 180);
    setTargetRotation(new THREE.Euler(-phi, theta, 0, 'YXZ'));
  }

  return (
    <group position={[0, 0, 0]}>
      <mesh>
        <sphereGeometry args={[1, 256]} />
        <shaderMaterial 
          vertexShader={vertexShader} 
          fragmentShader={fragmentShader}
        />
      </mesh>
      <GeoJSON setTargetRotation={setTargetRotation} rotateToLocation={rotateToLocation} />
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
