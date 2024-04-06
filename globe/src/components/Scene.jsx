import React from 'react';
import { Canvas } from '@react-three/fiber'
// import { OrbitControls } from '@react-three/drei';
import Globe from './Globe';

export default function Scene({ country, showTorus, borderLineWidth }) {

  return (
    <Canvas
      gl={{ antialias: false, alpha: true }}
      opacity={0}
      orthographic
      camera={{ near: 0.1, far: 10, position: [0, 0, 2], zoom: window.innerWidth > 768 ? 400 : 300 }}
    >
      <group rotation={[0, 0, -Math.PI / 2]}>
      <ambientLight intensity={0.75} color="#e9e8fb" />
      <ambientLight intensity={0.75} color="#746ca8" />
        <spotLight position={[0, 0, 100]} color="#e9e8fb" />
        <Globe country={country} showTorus={showTorus} borderLineWidth={borderLineWidth} />
      </group>

    </Canvas>
  );
}