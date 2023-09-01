import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei';
import Globe from './Globe.jsx'

export default function Scene()
{

  {/*SHADERS HAVE BEEN USED A BUNCH TO ENFORCE STRICT BRAND COLORS*/}
  return <Canvas
      gl={{ antialias: false, alpha: true }}
      orthographic
      camera={{ near: 0.1, far: 10000, position: [0, 0, 2], zoom: 400 }}
    >

    <color attach="background" args={["#F1F1E6"]} />
    {/* <OrbitControls enableRotate={true} enableZoom={true} enablePan={false} /> */}

    <group rotation={[0, 0, -Math.PI/2]}>
      <Globe />
    </group>

    </Canvas>
}