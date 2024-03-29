import React, { useState, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';

import Plane from './Plane';
import imgBack from '../assets/return-to-seoul-1.jpg';
import imgMiddle from '../assets/return-to-seoul-2.jpg';
import imgFront from '../assets/return-to-seoul-3.jpg';

const SCROLL_SENSITIVITY = 0.0003; // how fast the planes will move

const SPACING_FACTOR = 1.5; // how much the plane spacing will scale with zoom
const SPACING_X = 1.25; // spacing offset in the x direction
const SPACING_Y = 0.25; // spacing offset in the y direction

const SCALE_FACTOR = 0.5; // how much the scene will scale with zoom (180deg out of phase with zoom)

// BYRON, YOU'LL NEED TO TWEAK THIS ZOOM VAR FOR THE DIFFERENT SCREEN SIZES
let zoom = window.innerWidth > 768 ? 400: 300; // camera zoom, based on screen size

function cubicEaseOut(t) {
  const f = t - 1.0;
  return f * f * f + 1.0;
}

export default function Scene() {
  const [virtualScroll, setVirtualScroll] = useState(0);
  const [cosScroll, setCosScroll] = useState(0);
  const [cosScale, setCosScale] = useState(1 + SCALE_FACTOR);
  const sceneRef = useRef();

  useEffect(() => {
    const handleWheel = (event) => {
      let newScroll = virtualScroll + event.deltaY * SCROLL_SENSITIVITY;
      let cosScrollRaw = 1 - Math.abs(Math.cos(newScroll));
      let cosScroll = cubicEaseOut(cosScrollRaw);
      
      setVirtualScroll(newScroll);
      setCosScroll(cosScroll);

      let scale = 1 + SCALE_FACTOR * (1 - Math.abs(cosScroll));
      setCosScale(scale);
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [virtualScroll]);

  const spacing = cosScroll * SPACING_FACTOR; // from 0 to SPACING_FACTOR
  const rotationAngle = Math.PI / 6 * cosScroll; // from 0 to 45 degrees

  return (
    <Canvas
      gl={{ antialias: true, alpha: false }}
      camera={{ near: 0.1, far: 10000, position: [0, 0, 500], zoom: zoom }}
      ref={sceneRef}
    >
      <color attach="background" args={["#F1F1E6"]} />
      <group rotation={[rotationAngle * SPACING_Y, -rotationAngle * SPACING_X, 0]} scale={[cosScale, cosScale, cosScale]} >
        <Plane imgSrc={imgBack} location={[0, 0, -1 * spacing]} cosScroll={cosScroll} />
        <Plane imgSrc={imgMiddle} location={[0, 0, 0]} cosScroll={cosScroll} />
        <Plane imgSrc={imgFront} location={[0, 0, 1 * spacing]} cosScroll={cosScroll} />
      </group>
    </Canvas>
  );
}
