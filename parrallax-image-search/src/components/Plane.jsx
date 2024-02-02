// Assume this is in 'Plane.jsx'
import React, { useMemo } from 'react';
import { useLoader } from '@react-three/fiber';
import * as THREE from 'three';

export default function Plane({ location = [0, 0, 0], imgSrc }) {
  const texture = useLoader(THREE.TextureLoader, imgSrc);
  texture.minFilter = THREE.LinearFilter;

  const adjustedGeometry = useMemo(() => {
    const imageAspect = texture.image.width / texture.image.height;
    const bufferGeometry = new THREE.PlaneGeometry(imageAspect, 1); // Adjusted for image aspect ratio
    return bufferGeometry;
  }, [texture]);

  return (
    <group position={location}>
      <mesh>
        <primitive attach="geometry" object={adjustedGeometry} />
        <meshBasicMaterial attach="material" map={texture} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}
