import React, { useMemo } from 'react';
import * as THREE from 'three';
import { TextureLoader } from 'three';
import { useLoader } from '@react-three/fiber';

export default function Plane({ location = [0, 0, 0], imgSrc, cosScroll }) {
  const texture = useLoader(TextureLoader, imgSrc);
  texture.minFilter = THREE.LinearFilter;

  // Calculate the initial zoom based on the maximum expected pan effect
  useMemo(() => {
    const pan_effect = 0.05;
    const maxPanEffect = pan_effect; // The maximum extent of the pan effect
    const initialZoom = 1.0 - maxPanEffect; // Ensure initial zoom accounts for max pan effect
    const parallaxFactor = location[2] - 4; // Use Z position as a factor for parallax intensity
    texture.offset.x = parallaxFactor * cosScroll * 0.5 * pan_effect + 0.1; // Adjust for desired effect
    // Adjust initial zoom to counter the pan effect and apply additional zoom based on cosScroll
    texture.repeat.set(initialZoom + Math.abs(parallaxFactor) * location[0] * (1 - cosScroll), initialZoom);

  }, [cosScroll, location, texture]);

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
