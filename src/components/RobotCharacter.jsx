import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

const RobotCharacter = () => {
  const groupRef = useRef();
  const headRef = useRef();
  const leftArmRef = useRef();
  const rightArmRef = useRef();
  
  const currentScroll = useRef(0);
  const targetScroll = useRef(0);

  // Materials
  const bodyMaterial = new THREE.MeshStandardMaterial({ 
    color: '#e5e7eb', // bright silver/white
    metalness: 0.4, 
    roughness: 0.2 
  });
  const accentMaterial = new THREE.MeshStandardMaterial({ 
    color: '#a78bfa', 
    metalness: 0.5, 
    roughness: 0.1 
  });
  const eyeMaterial = new THREE.MeshBasicMaterial({ 
    color: '#00ffcc' 
  });

  useFrame((state, delta) => {
    // 1. Calculate scroll progress (0 to 1)
    const maxScroll = document.body.scrollHeight - window.innerHeight;
    targetScroll.current = window.scrollY / maxScroll || 0;
    currentScroll.current = THREE.MathUtils.lerp(currentScroll.current, targetScroll.current, delta * 4);

    if (groupRef.current) {
      // 2. Map scroll to character position and rotation
      // Float down the screen and spin as we scroll
      groupRef.current.position.y = THREE.MathUtils.lerp(1, -1.5, currentScroll.current);
      
      // Make the character spin elegantly as we scroll down
      groupRef.current.rotation.y = currentScroll.current * Math.PI * 2;
      groupRef.current.rotation.z = Math.sin(currentScroll.current * Math.PI) * 0.2; // slight tilt

      // 3. Make the head track the mouse
      if (headRef.current) {
        // Map mouse coordinates to rotation
        const targetX = (state.pointer.y * Math.PI) / 4;
        const targetY = (state.pointer.x * Math.PI) / 4;
        headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, -targetX, delta * 5);
        headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, targetY, delta * 5);
      }

      // 4. Procedural arm swinging animation based on scroll or time
      if (leftArmRef.current && rightArmRef.current) {
        const time = state.clock.getElapsedTime();
        // Arms gently float/wave
        leftArmRef.current.rotation.x = Math.sin(time * 2) * 0.2;
        rightArmRef.current.rotation.x = Math.sin(time * 2 + Math.PI) * 0.2;
      }
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={1} floatingRange={[-0.2, 0.2]}>
      <group ref={groupRef} scale={1.3}>
        {/* Head */}
        <group ref={headRef} position={[0, 1.4, 0]}>
          <mesh castShadow receiveShadow material={bodyMaterial}>
            <boxGeometry args={[0.8, 0.6, 0.6]} />
          </mesh>
          {/* Eyes */}
          <mesh position={[-0.2, 0.1, 0.31]} material={eyeMaterial}>
            <boxGeometry args={[0.2, 0.08, 0.05]} />
          </mesh>
          <mesh position={[0.2, 0.1, 0.31]} material={eyeMaterial}>
            <boxGeometry args={[0.2, 0.08, 0.05]} />
          </mesh>
          {/* Ear Antennae */}
          <mesh position={[-0.45, 0, 0]} material={accentMaterial}>
            <cylinderGeometry args={[0.05, 0.05, 0.2, 16]} rotation={[0, 0, Math.PI / 2]} />
          </mesh>
          <mesh position={[0.45, 0, 0]} material={accentMaterial}>
            <cylinderGeometry args={[0.05, 0.05, 0.2, 16]} rotation={[0, 0, Math.PI / 2]} />
          </mesh>
        </group>

        {/* Neck */}
        <mesh position={[0, 1, 0]} material={accentMaterial}>
          <cylinderGeometry args={[0.1, 0.15, 0.4, 16]} />
        </mesh>

        {/* Torso */}
        <mesh position={[0, 0.2, 0]} castShadow receiveShadow material={bodyMaterial}>
          <boxGeometry args={[1, 1.2, 0.7]} />
        </mesh>

        {/* Chest Plate / Core */}
        <mesh position={[0, 0.2, 0.36]} material={accentMaterial}>
          <circleGeometry args={[0.25, 32]} />
        </mesh>
        {/* Glowing core center */}
        <mesh position={[0, 0.2, 0.37]} material={eyeMaterial}>
          <circleGeometry args={[0.15, 32]} />
        </mesh>

        {/* Left Arm */}
        <group ref={leftArmRef} position={[-0.7, 0.6, 0]}>
          {/* Shoulder pivot */}
          <mesh material={accentMaterial}>
            <sphereGeometry args={[0.15, 16, 16]} />
          </mesh>
          {/* Arm segment */}
          <mesh position={[0, -0.4, 0]} material={bodyMaterial}>
            <capsuleGeometry args={[0.1, 0.6, 4, 8]} />
          </mesh>
        </group>

        {/* Right Arm */}
        <group ref={rightArmRef} position={[0.7, 0.6, 0]}>
          {/* Shoulder pivot */}
          <mesh material={accentMaterial}>
            <sphereGeometry args={[0.15, 16, 16]} />
          </mesh>
          {/* Arm segment */}
          <mesh position={[0, -0.4, 0]} material={bodyMaterial}>
            <capsuleGeometry args={[0.1, 0.6, 4, 8]} />
          </mesh>
        </group>

        {/* Base/Hover Engine (instead of legs for a floating character) */}
        <mesh position={[0, -0.6, 0]} material={accentMaterial}>
          <cylinderGeometry args={[0.3, 0.5, 0.4, 16]} />
        </mesh>
        {/* Thruster glow */}
        <mesh position={[0, -0.85, 0]} material={eyeMaterial}>
          <cylinderGeometry args={[0.2, 0.4, 0.1, 16]} />
        </mesh>
      </group>
    </Float>
  );
};

export default RobotCharacter;
