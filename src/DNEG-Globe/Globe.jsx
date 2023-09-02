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

const fragmentShaderRed = `
void main() {
    gl_FragColor = vec4(255.0/255.0, 98.0/255.0, 90.0/255.0, 1.0);
}
`;

export default function Globe() {
  const globeRef = React.useRef();
  const torusRef = React.useRef();
  const [targetRotation, setTargetRotation] = React.useState([0, 0, 0]);
  const [targetLocation, setTargetLocation] = React.useState(null);

  useFrame(() => {
    const globe = globeRef.current;
    const torus = torusRef.current;
    if (globe) {
      globe.rotation.x = THREE.MathUtils.lerp(globe.rotation.x,  targetRotation[0], 0.1);
      globe.rotation.y = THREE.MathUtils.lerp(globe.rotation.y,  targetRotation[1], 0.1);
      globe.rotation.z = THREE.MathUtils.lerp(globe.rotation.z,  targetRotation[2], 0.1);
    }
    if (torus && targetLocation) {
      torus.lookAt(new THREE.Vector3(0,0, 0));
    }
  });

  // function getTorusQuaternion([lat, long]) {
  //   const phi = THREE.MathUtils.degToRad(90 - lat);
  //   const theta = THREE.MathUtils.degToRad(long);
  
  //   const x = Math.sin(phi) * Math.cos(theta);
  //   const y = Math.cos(phi);
  //   const z = Math.sin(phi) * Math.sin(theta);
  
  //   // This is the direction vector from the center of the globe to the specified location.
  //   const position = new THREE.Vector3(x, y, z);
  
  //   // We want the torus's "up" vector to align with this direction.
  //   const up = new THREE.Vector3(0, 1, 0);
  
  //   // Calculate the quaternion for this rotation.
  //   const quaternion = new THREE.Quaternion().setFromUnitVectors(up, position.normalize());
  
  //   return quaternion;
  // }

  function rotateToLocation(coords) {
    const [lat, long] = coords;
    const radius = 1.035;
    const phi = THREE.MathUtils.degToRad(90 - lat);
    const theta = THREE.MathUtils.degToRad(long);

    const x = radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.cos(phi);
    const z = radius * Math.sin(phi) * Math.sin(theta);
    

    // Position the torus
    setTargetLocation([x, z, y]);

    // Set target rotation for non-standard orientation
    setTargetRotation([0, -phi, -theta]); // [theta, -phi, 0]);
  }

  return (
    <group ref={globeRef}>
        {targetLocation && 
        <mesh ref={torusRef} position={targetLocation}>
            <torusGeometry args={[0.03, 0.002, 8, 32]} />
            <shaderMaterial 
              vertexShader={vertexShader} 
              fragmentShader={fragmentShaderRed}
            />
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
          <button onClick={() => rotateToLocation([-90, 0])}>Go to South Pole</button>

          <button onClick={() => rotateToLocation([51.5074, -0.1278])}>Go to London</button>
          <button onClick={() => rotateToLocation([49.2827, -123.1207])}>Go to Vancouver</button>
          <button onClick={() => rotateToLocation([45.5017, -73.5673])}>Go to Montreal</button>
          <button onClick={() => rotateToLocation([30.7046, 76.7179])}>Go to Mohali</button>
          <button onClick={() => rotateToLocation([19.0760, 72.8777])}>Go to Mumbai</button>
          <button onClick={() => rotateToLocation([12.9716, 77.5946])}>Go to Bangalore</button>
          <button onClick={() => rotateToLocation([34.0522, -118.2437])}>Go to Los Angeles</button>
          <button onClick={() => rotateToLocation([43.6532, -79.3832])}>Go to Toronto</button>
          <button onClick={() => rotateToLocation([13.0827, 80.2707])}>Go to Chennai</button>
          <button onClick={() => rotateToLocation([-33.8688, 151.2093])}>Go to Sydney</button>
        </div>
      </Html>
    </group>
  );
}
