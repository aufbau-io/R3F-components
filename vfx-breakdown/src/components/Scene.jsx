import React from 'react';
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei';
import Plane from './Plane';

export default function Scene() {

  return (
    <Canvas
      gl={{ antialias: false, alpha: false }}
      orthographic
      camera={{ near: 0.1, far: 10000, position: [0, 0, 2], zoom: window.innerWidth > 768 ? 400 : 300 }}
    >

      <color attach="background" args={["#F1F1E6"]} />
      <group>
        <Plane />
      </group>
      <OrbitControls/>

    </Canvas>
  );
}