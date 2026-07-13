import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const DeskScene = ({ visible = false, scrollProgress = 0 }) => {
  const groupRef = useRef();
  const monitorLightRef = useRef();
  
  useFrame((state, delta) => {
    if (!groupRef.current) return;
    
    // Smooth opacity via scale (since mesh opacity requires transparency setup)
    const targetScale = visible ? 1 : 0;
    const currentScale = groupRef.current.scale.x;
    const newScale = THREE.MathUtils.lerp(currentScale, targetScale, delta * 3);
    groupRef.current.scale.setScalar(newScale);
    
    // Pulsing monitor light
    if (monitorLightRef.current && visible) {
      monitorLightRef.current.intensity = 8 + Math.sin(state.clock.elapsedTime * 2) * 2;
    }
  });

  return (
    <group ref={groupRef} position={[-3.5, -1.8, -1]} scale={0}>
      {/* Desk surface */}
      <mesh position={[0, 0.8, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.5, 0.08, 1.2]} />
        <meshStandardMaterial color="#1a1a2e" metalness={0.3} roughness={0.4} />
      </mesh>
      
      {/* Desk legs */}
      {[[-1.1, 0, -0.45], [1.1, 0, -0.45], [-1.1, 0, 0.45], [1.1, 0, 0.45]].map((pos, i) => (
        <mesh key={i} position={pos} castShadow>
          <cylinderGeometry args={[0.03, 0.03, 0.8, 8]} />
          <meshStandardMaterial color="#2a2a3e" metalness={0.5} roughness={0.3} />
        </mesh>
      ))}
      
      {/* Monitor Stand */}
      <mesh position={[0, 1.1, -0.3]}>
        <cylinderGeometry args={[0.04, 0.08, 0.3, 8]} />
        <meshStandardMaterial color="#1a1a2e" metalness={0.6} roughness={0.2} />
      </mesh>
      
      {/* Monitor Screen */}
      <mesh position={[0, 1.55, -0.35]}>
        <boxGeometry args={[1.6, 0.9, 0.05]} />
        <meshStandardMaterial color="#0a0a15" metalness={0.1} roughness={0.8} />
      </mesh>
      
      {/* Monitor Screen Glow (emissive surface) */}
      <mesh position={[0, 1.55, -0.32]}>
        <planeGeometry args={[1.45, 0.78]} />
        <meshBasicMaterial color="#e040fb" transparent opacity={0.15} />
      </mesh>
      
      {/* Monitor light that reflects onto character */}
      <pointLight
        ref={monitorLightRef}
        color="#e040fb"
        intensity={8}
        distance={6}
        decay={2}
        position={[0, 1.5, 0.5]}
      />
      
      {/* Keyboard */}
      <mesh position={[0, 0.88, 0.15]}>
        <boxGeometry args={[0.8, 0.03, 0.3]} />
        <meshStandardMaterial color="#1a1a2e" metalness={0.4} roughness={0.5} />
      </mesh>
      
      {/* Mouse */}
      <mesh position={[0.6, 0.88, 0.2]}>
        <boxGeometry args={[0.12, 0.025, 0.18]} />
        <meshStandardMaterial color="#2a2a3e" metalness={0.5} roughness={0.3} />
      </mesh>
      
      {/* Coffee mug */}
      <mesh position={[-0.9, 0.95, 0.2]}>
        <cylinderGeometry args={[0.06, 0.05, 0.12, 16]} />
        <meshStandardMaterial color="#e5e7eb" metalness={0.1} roughness={0.6} />
      </mesh>
    </group>
  );
};

export default DeskScene;
