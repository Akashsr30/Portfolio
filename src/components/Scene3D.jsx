import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, ContactShadows, Float } from '@react-three/drei';
import CharacterModel from './CharacterModel';

const Scene3D = () => {
  return (
    <div className="w-full h-full relative">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={1.5} color="#a78bfa" />
        <directionalLight position={[-10, -10, -10]} intensity={0.5} color="#ffffff" />
        
        <Suspense fallback={null}>
          <Float speed={1.5} rotationIntensity={0} floatIntensity={0.5} floatingRange={[-0.1, 0.1]}>
            <CharacterModel />
          </Float>
          <Environment preset="city" />
          
          {/* Subtle ground shadow */}
          <ContactShadows 
            position={[0, -2.5, 0]} 
            opacity={0.4} 
            scale={20} 
            blur={2} 
            far={4} 
            color="#000000"
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Scene3D;
