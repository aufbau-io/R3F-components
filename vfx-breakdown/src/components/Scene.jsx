import React, { useState, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Plane from './Plane';

const SCROLL_SENSITIVITY = 0.0005; // how fast the planes will move
const SPACING_FACTOR = 3; // how much the planes will scale
const SCALE_FACTOR = 0.5; // how much the planes will scale

let ZOOM = window.innerWidth > 768 ? 400: 300; // camera zoom


export default function Scene() {
  const [virtualScroll, setVirtualScroll] = useState(0);
  const [cosScroll, setCosScroll] = useState(0);
  const [cosScale, setCosScale] = useState(1 + SCALE_FACTOR);
  const sceneRef = useRef();

  useEffect(() => {
    const handleWheel = (event) => {
      let newScroll = virtualScroll + event.deltaY * SCROLL_SENSITIVITY;
      let cosScroll = Math.cos(newScroll);
      
      setVirtualScroll(newScroll);
      setCosScroll(cosScroll);

      let scale = 1 + SCALE_FACTOR * (1 - Math.abs(cosScroll));

      console.log(scale);
      // console.log(scale);

      setCosScale(scale);
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [virtualScroll]);

  const spacing = cosScroll * SPACING_FACTOR; // from 0 to SCALE_FACTOR
  const rotationAngle = Math.PI / 8 * cosScroll; // from 0 to 45 degrees

  return (
    <Canvas
      gl={{ antialias: false, alpha: false }}
      orthographic
      camera={{ near: 0.1, far: 10000000, position: [0, 0, 6], zoom: ZOOM }}
      ref={sceneRef}
    >
      <color attach="background" args={["#F1F1E6"]} />
      <group rotation={[rotationAngle * 0.2, -rotationAngle * 1, 0]} scale={[cosScale, cosScale, cosScale]} >
        <Plane location={[0, 0, -1 * spacing]} />
        <Plane location={[0, 0, 0]} />
        <Plane location={[0, 0, 1 * spacing]} />
      </group>
      {/* <OrbitControls/> */}
    </Canvas>
  );
}
