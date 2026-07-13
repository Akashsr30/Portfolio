import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshTransmissionMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';

const AbstractSculpture = () => {
  const meshRef = useRef();
  const wireframeRef = useRef();
  
  // Smoothly interpolate values
  const currentScroll = useRef(0);
  const targetScroll = useRef(0);

  useFrame((state, delta) => {
    // Calculate scroll progress (0 to 1)
    const maxScroll = document.body.scrollHeight - window.innerHeight;
    targetScroll.current = window.scrollY / maxScroll || 0;
    
    // Lerp for buttery smooth scroll mapping
    currentScroll.current = THREE.MathUtils.lerp(currentScroll.current, targetScroll.current, delta * 4);

    if (meshRef.current) {
      // Base continuous rotation
      meshRef.current.rotation.x += delta * 0.1;
      meshRef.current.rotation.y += delta * 0.15;

      // Scroll-reactive transformations
      // Spin rapidly based on scroll depth
      meshRef.current.rotation.z = currentScroll.current * Math.PI * 4;
      
      // Move slightly up/down based on scroll to simulate following the user or reacting
      // Move from y: 0 to y: -2 over the course of the scroll
      meshRef.current.position.y = THREE.MathUtils.lerp(0.5, -0.5, currentScroll.current);
      
      // Scale slightly based on scroll
      const scaleBase = 1.8;
      const scaleOffset = Math.sin(currentScroll.current * Math.PI) * 0.3; // Bulges in the middle of page
      meshRef.current.scale.setScalar(scaleBase + scaleOffset);
    }
    
    // Synchronize wireframe shell
    if (wireframeRef.current && meshRef.current) {
      wireframeRef.current.rotation.copy(meshRef.current.rotation);
      wireframeRef.current.scale.copy(meshRef.current.scale).multiplyScalar(1.2);
      wireframeRef.current.position.copy(meshRef.current.position);
    }
  });

  return (
    <Float
      speed={2} // Animation speed, defaults to 1
      rotationIntensity={0.5} // XYZ rotation intensity, defaults to 1
      floatIntensity={0.5} // Up/down float intensity, works like a multiplier with floatingRange,defaults to 1
      floatingRange={[-0.1, 0.1]} // Range of y-axis values the object will float within, defaults to [-0.1,0.1]
    >
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1, 0]} />
        <MeshTransmissionMaterial 
          backside
          samples={4}
          thickness={0.5}
          chromaticAberration={1}
          anisotropy={0.3}
          distortion={0.5}
          distortionScale={0.5}
          temporalDistortion={0.2}
          color="#a78bfa"
          resolution={1024}
        />
      </mesh>
      
      {/* Wireframe outer shell for extra complexity */}
      <mesh ref={wireframeRef}>
        <icosahedronGeometry args={[1, 1]} />
        <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.03} />
      </mesh>
    </Float>
  );
};

export default AbstractSculpture;
