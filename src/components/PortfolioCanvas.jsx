import React, { Suspense, useRef, useState, useEffect, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, ContactShadows } from '@react-three/drei';
import Character3D from './Character3D';
import CursorLight from './CursorLight';

const PortfolioCanvas = ({ activeSection }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const scrollYRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      scrollYRef.current = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track mouse position (normalized -1 to 1)
  const handleMouseMove = useCallback((e) => {
    setMousePos({
      x: (e.clientX / window.innerWidth) * 2 - 1,
      y: -(e.clientY / window.innerHeight) * 2 + 1,
    });
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);


  return (
    <div 
      className="fixed inset-0 w-full h-full pointer-events-none" 
      style={{ zIndex: 5 }}
    >
      <Canvas
        camera={{ position: [0, 1, 7], fov: 40 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        dpr={[1, 1.5]}
        shadows
      >
        {/* Base lighting */}
        <ambientLight intensity={0.4} />
        <directionalLight
          position={[5, 8, 5]}
          intensity={1.2}
          color="#ffffff"
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        <directionalLight position={[-3, 4, -3]} intensity={0.4} color="#a78bfa" />

        {/* Cursor-following pink/purple point light */}
        <CursorLight mousePosition={mousePos} />

        <Suspense fallback={null}>
          {/* Main 3D Character */}
          <Character3D scrollYRef={scrollYRef} mousePosition={mousePos} activeSection={activeSection} />

          {/* Environment for reflections */}
          <Environment preset="night" />

          {/* Ground shadow */}
          <ContactShadows
            position={[0, -2.5, 0]}
            opacity={0.5}
            scale={15}
            blur={2.5}
            far={4}
            color="#000000"
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default PortfolioCanvas;
