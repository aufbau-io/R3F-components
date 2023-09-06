import React, { useState, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Plane from './Plane';

export default function Scene() {
  const [virtualScroll, setVirtualScroll] = useState(0);
  const sceneRef = useRef();

  useEffect(() => {
    const handleWheel = (event) => {
      // Update the virtual scroll value based on wheel movement
      // The 1000 is an arbitrary number that determines the "speed" or "sensitivity" of the scroll. Adjust as needed.
      let newScroll = virtualScroll + event.deltaY / 20000;
      console.log('delta y', event.deltaY / 20000);
      console.log('new scroll', newScroll);

      // Clamp the scroll value between 0 and 1
      newScroll = newScroll;

      console.log('cos(newScroll)', Math.cos(newScroll))


      
      setVirtualScroll(newScroll);
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [virtualScroll]);

  const spacing = virtualScroll; // from 0 to 1
  const rotationAngle = Math.PI / 8 * virtualScroll; // from 0 to 45 degrees

  return (
    <Canvas
      gl={{ antialias: false, alpha: false }}
      orthographic
      camera={{ near: 0.1, far: 10000, position: [0, 0, 2], zoom: window.innerWidth > 768 ? 400 : 300 }}
      ref={sceneRef}
    >
      <color attach="background" args={["#F1F1E6"]} />
      <group rotation={[rotationAngle * 0.5, -rotationAngle * 1.5, 0]}>
        <Plane location={[0, 0, -1.2 * spacing]} />
        <Plane location={[0, 0, 0]} />
        <Plane location={[0, 0, 1.2 * spacing]} />
      </group>
      {/* <OrbitControls/> */}
    </Canvas>
  );
}
