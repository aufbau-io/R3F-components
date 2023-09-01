import React from 'react';
import GeoJSON from './GeoJSON';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';

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
  const [targetRotation, setTargetRotation] = React.useState([0, 0, 0]);
  const [targetLocation, setTargetLocation] = React.useState(null);
  const [torusQuaternion, setTorusQuaternion] = React.useState(new THREE.Quaternion()); // New state for torus rotation

  useFrame(() => {
    const globe = globeRef.current;
    if (globe) {
      globe.rotation.y = THREE.MathUtils.lerp(globe.rotation.y, targetRotation[1], 0.1);
      globe.rotation.x = THREE.MathUtils.lerp(globe.rotation.x, targetRotation[2], 0.1);
    }
  });

  function getTorusQuaternion([lat, long]) {
    const radius = 1.02;
    const phi = THREE.MathUtils.degToRad(90 - lat);
    const theta = THREE.MathUtils.degToRad(long);

    const x = radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.cos(phi);
    const z = radius * Math.sin(phi) * Math.sin(theta);

    

    // Calculate the rotation for the torus to lie flat on the sphere
    const up = new THREE.Vector3(0, 1, 0);
    const position = new THREE.Vector3(z, y, x);
    const quaternion = new THREE.Quaternion().setFromUnitVectors(position.normalize(), up);

    return quaternion;
  }

  function rotateToLocation(coords) {
    const [lat, long] = coords;
    const radius = 1.02;
    const phi = THREE.MathUtils.degToRad(90 - lat);
    const theta = THREE.MathUtils.degToRad(long);

    const x = radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.cos(phi);
    const z = radius * Math.sin(phi) * Math.sin(theta);
    

    // Position the torus
    setTargetLocation([x, z, y]);

    // Set target rotation for non-standard orientation
    setTargetRotation([0, -phi, theta]);

    // Set the rotation for the torus
    const quaternion = getTorusQuaternion(coords);
    setTorusQuaternion(quaternion);
  }

  return (
    <group ref={globeRef} >
      {targetLocation && 
      <mesh position={targetLocation} quaternion={torusQuaternion}>
      <torusGeometry args={[0.02, 0.005, 8, 32]} />
      <meshBasicMaterial color="red" />
  </mesh>}
      
      <mesh>
        <sphereGeometry args={[1, 32]} />
        <shaderMaterial 
          vertexShader={vertexShader} 
          fragmentShader={fragmentShader}
        />
      </mesh>

      <GeoJSON />
      
      <Html wrapperClass="label">
        <div>
        <button onClick={() => rotateToLocation([90, 0])}>Go to North Pole</button>
          <button onClick={() => rotateToLocation([52.5200, 13.4050])}>Go to Berlin</button>
          <button onClick={() => rotateToLocation([0, -118.2437])}>Go to Test</button>
          <button onClick={() => rotateToLocation([34.0522, -118.2437])}>Go to Los Angeles</button>
          <button onClick={() => rotateToLocation([-23.5505, -46.6333])}>Go to São Paulo</button>
          <button onClick={() => rotateToLocation([0, 139.6917])}>Go to Test</button>
          <button onClick={() => rotateToLocation([35.6895, 139.6917])}>Go to Tokyo</button>
        </div>
      </Html>
    </group>
  );
}
