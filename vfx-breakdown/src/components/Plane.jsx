import React, { useMemo } from 'react';
import * as THREE from 'three';
import { TextureLoader } from 'three';
import { useLoader } from '@react-three/fiber';

export default function Plane({ location = [0, 0, 0], imgSrc }) {
  const texture = useLoader(TextureLoader, imgSrc);
  texture.minFilter = THREE.LinearFilter;

  // Adjusting UV coordinates based on the texture's aspect ratio
  const adjustedUVs = useMemo(() => {
    const planeAspect = 2;  // 2:1 aspect ratio of the plane
    const imageAspect = texture.image.width / texture.image.height;
    
    const bufferGeometry = new THREE.PlaneBufferGeometry(2, 1);
    const uvAttribute = bufferGeometry.attributes.uv;

    for (let i = 0; i < uvAttribute.count; i++) {
      // Adjusting the uv's x coordinate based on the aspect ratio
      uvAttribute.setX(i, uvAttribute.getX(i) / (planeAspect / imageAspect));
    }

    return bufferGeometry;
  }, [texture]);

  return (
    <group position={location}>
      <mesh>
        <primitive attach="geometry" object={adjustedUVs} />
        <meshBasicMaterial attach="material" map={texture} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}
