import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const CursorLight = ({ mousePosition = { x: 0, y: 0 } }) => {
  const lightRef = useRef();

  useFrame((state, delta) => {
    if (!lightRef.current) return;
    
    // Map normalized mouse (-1 to 1) to world coordinates
    const targetX = mousePosition.x * 5;
    const targetY = mousePosition.y * 3 + 1;
    
    lightRef.current.position.x = THREE.MathUtils.lerp(lightRef.current.position.x, targetX, delta * 8);
    lightRef.current.position.y = THREE.MathUtils.lerp(lightRef.current.position.y, targetY, delta * 8);
  });

  return (
    <pointLight
      ref={lightRef}
      color="#e879f9"
      intensity={15}
      distance={12}
      decay={2}
      position={[0, 2, 3]}
    />
  );
};

export default CursorLight;
