import React from 'react';
import { Canvas } from '@react-three/fiber'
// import { OrbitControls } from '@react-three/drei';
import Globe from './Globe';

export default function Scene({ country, showTorus, borderLineWidth }) {

  return (
    <Canvas
      gl={{ antialias: false, alpha: false }}
      orthographic
      camera={{ near: 0.1, far: 10000, position: [0, 0, 2], zoom: window.innerWidth > 768 ? 400 : 300 }}
    >

      <color attach="background" args={["#e9e8fb"]} />
      <group rotation={[0, 0, -Math.PI / 2]}>
      <ambientLight intensity={0.75} color="#e9e8fb" />
        <spotLight position={[0, 0, 100]} color="#f0f0f0" />
        <Globe country={country} showTorus={showTorus} borderLineWidth={borderLineWidth} />
      </group>

    </Canvas>
  );
}