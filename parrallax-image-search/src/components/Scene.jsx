import React, { useState, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import Plane from './Plane';
import * as THREE from 'three';

const imageSources = [
  '../assets/1.jpg',
  '../assets/2.jpg',
  '../assets/3.jpg',
  '../assets/4.jpg',
  '../assets/5.jpg',
  '../assets/6.jpg',
  '../assets/7.jpg',
  '../assets/8.jpg',
  '../assets/9.jpg',
  '../assets/10.jpg',
  '../assets/11.jpg',
  '../assets/12.jpg',
  '../assets/13.jpg',
  '../assets/14.jpg',
  '../assets/15.jpg',
];

function getRandomPosition() {
  return [Math.random() * 8 - 4, Math.random() * 4 - 2, Math.random()  * 50 - 25];
}

export default function Scene() {
  return (
      <Canvas
        gl={{ antialias: true, alpha: false }}
        camera={{ near: 0.1, far: 100, position: [0, 0, 0]}}
      >
      {/* <ambientLight intensity={1.5} /> */}
      {/* add fog */}
      <fog attach="fog" args={['#1b1b1b', 1, 40]} />
      <DynamicPlanes />
    </Canvas>
  );
}

const DynamicPlanes = () => {
  const [planes, setPlanes] = useState(imageSources.map(src => ({
    imgSrc: src,
    location: getRandomPosition(),
  })));
  const mouse = useRef([0, 0]);
  const scrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      // Update scroll position
      const currentScrollY = window.scrollY;
      // Check if we've scrolled up or down
      if (currentScrollY > scrollY.current) {
        // Scrolling down
        addPlane();
      } else {
        // Scrolling up - optional, depending on desired behavior
        // addPlane(true); // Uncomment to enable adding planes when scrolling up
      }
      scrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const addPlane = (isScrollingUp = false) => {
    setPlanes(prevPlanes => {
      const newPlaneIndex = prevPlanes.length % imageSources.length;
      const newPlane = {
        imgSrc: imageSources[newPlaneIndex],
        location: getRandomPosition(),
      };
      if (isScrollingUp) {
        return [newPlane, ...prevPlanes]; // Add to the beginning for scrolling up
      } else {
        return [...prevPlanes, newPlane]; // Add to the end for scrolling down
      }
    });
  };

  useFrame(({ camera }) => {
    camera.position.lerp(new THREE.Vector3(mouse.current[0] * 2, mouse.current[1] * 2, camera.position.z), 0.1);
  });

  useEffect(() => {
    const handleMouseMove = (event) => {
      mouse.current = [(event.clientX / window.innerWidth) * 2 - 1, -(event.clientY / window.innerHeight) * 2 + 1];
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return planes.map((plane, index) => (
    <Plane key={index} imgSrc={plane.imgSrc} location={plane.location} />
  ));
};
