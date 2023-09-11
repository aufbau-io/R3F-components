import React from 'react';
import GeoJSON from './GeoJSON';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

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

export default function Globe({ country, showTorus, borderLineWidth }) {
  const globeRef = React.useRef();
  const torusRef = React.useRef();

  const [targetRotation, setTargetRotation] = React.useState(() => rotateToLocation(country).rotation);
  const [targetLocation, setTargetLocation] = React.useState(() => rotateToLocation(country));


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

  function rotateToLocation(coords) {
    const [lat, long] = coords;
    const radius = 1.035;
    const phi = THREE.MathUtils.degToRad(90 - lat);
    const theta = THREE.MathUtils.degToRad(long);

    const x = radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.cos(phi);
    const z = radius * Math.sin(phi) * Math.sin(theta);
    
    const rotation = [0, -phi, -theta]; // non-standard orientation

    return {
      location: [x, z, y], // non-standard orientation
      rotation: rotation
    };
  }

  React.useEffect(() => {
    const newValues = rotateToLocation(country);
    setTargetLocation(newValues.location);
    setTargetRotation(newValues.rotation);
  }, [country]);

  return (
    <group ref={globeRef}>

        {showTorus && targetLocation && 
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

      <GeoJSON borderLineWidth={borderLineWidth} />
      
    </group>
  );
}
