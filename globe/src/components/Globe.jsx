import React, { useEffect, useMemo } from 'react';
import GeoJSON from './GeoJSON';
import * as THREE from 'three';
import { useFrame  } from '@react-three/fiber';


export default function Globe({ country, showTorus, borderLineWidth }) {
  const globeRef = React.useRef();
  const torusRef = React.useRef();

  // const [targetRotation, setTargetRotation] = React.useState(() => rotateToLocation(country).rotation);
  // const [targetLocation, setTargetLocation] = React.useState(() => rotateToLocation(country));

  const { location: targetLocation, rotation: targetRotation } = useMemo(() => rotateToLocation(country), [country]);


  useFrame(() => {
    const globe = globeRef.current;
    const torus = torusRef.current;
    if (globe) {
      globe.rotation.x = THREE.MathUtils.lerp(globe.rotation.x,  targetRotation[0], 0.05);
      globe.rotation.y = THREE.MathUtils.lerp(globe.rotation.y,  targetRotation[1], 0.05);
      globe.rotation.z = THREE.MathUtils.lerp(globe.rotation.z,  targetRotation[2], 0.05);
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


  return (
    <group ref={globeRef}>
        {showTorus && 
        <mesh ref={torusRef} position={targetLocation}>
            <torusGeometry args={[0.04, 0.02, 16, 100]} />
            <meshStandardMaterial color="#746ca8" />
            {/* <shaderMaterial 
              vertexShader={vertexShader} 
              fragmentShader={fragmentShaderRed}
            /> */}
        </mesh>}
      
      <mesh>
        <sphereGeometry args={[1, 32]} />
        <meshStandardMaterial color="#e9e8fb" />
        {/* <shaderMaterial 
          vertexShader={vertexShader} 
          fragmentShader={fragmentShader}
        /> */}
      </mesh>

      <GeoJSON borderLineWidth={borderLineWidth} />
      
    </group>
  );
}
