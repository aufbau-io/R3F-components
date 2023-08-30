import GeoJSON from './GeoJSON'

const vertexShader = `
void main() {
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
void main() {
    gl_FragColor = vec4(251.0/255.0, 251.0/255.0, 240.0/255.0, 1.0);
}
`;

export default function Globe() {
    return (
      <group position={[0, 0, 0]}>
        <mesh>
          <sphereGeometry args={[1, 256]} />
          <shaderMaterial 
            vertexShader={vertexShader} 
            fragmentShader={fragmentShader}
        />
        </mesh>
        <GeoJSON />
      </group>
    );
  }