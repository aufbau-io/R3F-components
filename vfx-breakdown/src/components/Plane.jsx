import React from 'react';
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

export default function Plane({ location = [0, 0, 0] }) {

  return (
    <group position={location}>
      <mesh>
        <planeBufferGeometry args={[2, 1]} />
        <shaderMaterial
          vertexShader={vertexShader}
          fragmentShader={fragmentShaderRed}
          transparent
          side={THREE.DoubleSide}
        /> 
      </mesh>
    </group>
  );
}
