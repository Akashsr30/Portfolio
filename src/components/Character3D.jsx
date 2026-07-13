import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, useAnimations } from '@react-three/drei';
import * as THREE from 'three';

const Character3D = ({ scrollYRef, mousePosition = { x: 0, y: 0 }, activeSection = 'hero' }) => {
  const group = useRef();
  const { scene, animations } = useGLTF('./robot.glb');
  const { actions } = useAnimations(animations, group);
  
  const currentAnim = useRef('Idle');
  const smoothScroll = useRef(0);
  const smoothMouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (actions && actions['Idle']) {
      actions['Idle'].reset().fadeIn(0.5).play();
      currentAnim.current = 'Idle';
    }
  }, [actions]);

  const switchAnimation = (name) => {
    if (!actions || !actions[name] || currentAnim.current === name) return;
    const prev = actions[currentAnim.current];
    const next = actions[name];
    if (prev) prev.fadeOut(0.4);
    next.reset().fadeIn(0.4).play();
    currentAnim.current = name;
  };

  const [hovered, setHovered] = React.useState(false);
  const [clicked, setClicked] = React.useState(false);

  useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : 'auto';
  }, [hovered]);

  useEffect(() => {
    if (clicked) {
      const timer = setTimeout(() => setClicked(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [clicked]);

  useFrame((state, delta) => {
    if (!group.current) return;
    
    smoothMouse.current.x = THREE.MathUtils.lerp(smoothMouse.current.x, mousePosition.x, delta * 4);
    smoothMouse.current.y = THREE.MathUtils.lerp(smoothMouse.current.y, mousePosition.y, delta * 4);
    
    let targetX = 0;
    let targetY = -2;
    let targetScale = 0.5;
    let targetRotY = 0;
    let targetRotX = 0;
    let anim = 'Idle';

    const { viewport } = state;
    const paddingX = viewport.width * 0.25; 
    const cornerX = viewport.width * 0.5 - 1.2; 
    const cornerY = -viewport.height * 0.5 + 1.2; 

    const scrollY = scrollYRef?.current || 0;
    const vh = window.innerHeight;

    const heroToAbout = Math.min(Math.max(scrollY / vh, 0), 1);
    const aboutToSkills = Math.min(Math.max((scrollY - vh) / vh, 0), 1);

    // Aggressive mouse tracking multipliers
    const mouseTrackY = smoothMouse.current.x * 0.8;
    const mouseTrackX = -smoothMouse.current.y * 0.5;

    // Default: Phase 1 (Hero)
    targetX = -paddingX;
    targetY = -1.5;
    targetScale = 0.55;
    targetRotY = Math.PI / 6 + mouseTrackY;
    targetRotX = mouseTrackX;
    anim = hovered ? 'Wave' : 'Idle';

    // Phase 2: About
    if (heroToAbout > 0) {
      const ease1 = heroToAbout * heroToAbout * (3 - 2 * heroToAbout);
      targetX = THREE.MathUtils.lerp(-paddingX, paddingX, ease1);
      targetRotY = THREE.MathUtils.lerp(Math.PI / 6, -Math.PI / 7, ease1) + mouseTrackY;
      targetRotX = mouseTrackX;
    }

    // Phase 3 & Beyond: Mascot
    if (aboutToSkills > 0) {
      const ease2 = aboutToSkills * aboutToSkills * (3 - 2 * aboutToSkills);
      targetX = THREE.MathUtils.lerp(paddingX, cornerX, ease2);
      targetY = THREE.MathUtils.lerp(-1.5, cornerY, ease2);
      targetScale = THREE.MathUtils.lerp(0.55, 0.35, ease2);
      
      const time = state.clock.elapsedTime;
      targetY += Math.sin(time * 2) * 0.1 * ease2; 
      
      targetRotY = -Math.PI / 5 + mouseTrackY;
      targetRotX = mouseTrackX;
    }

    // Override animation if clicked
    if (clicked) {
      anim = 'ThumbsUp'; // Assuming you have a ThumbsUp or Jump animation
    } else if (hovered && aboutToSkills > 0) {
      anim = 'Wave'; // Wave when hovered in mascot mode
    }

    // Apply transformations
    group.current.position.x = THREE.MathUtils.lerp(group.current.position.x, targetX, delta * 10);
    group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, targetY, delta * 10);
    group.current.scale.setScalar(THREE.MathUtils.lerp(group.current.scale.x, targetScale, delta * 10));

    const currentRot = new THREE.Euler().setFromQuaternion(group.current.quaternion);
    const newRotY = THREE.MathUtils.lerp(currentRot.y, targetRotY, delta * 6);
    const newRotX = THREE.MathUtils.lerp(currentRot.x, targetRotX, delta * 6);
    group.current.quaternion.setFromEuler(new THREE.Euler(newRotX, newRotY, 0));
    
    switchAnimation(anim);
  });

  return (
    <group 
      ref={group} 
      dispose={null} 
      scale={1.0}
      onPointerOver={(e) => { e.stopPropagation(); setHovered(true); }}
      onPointerOut={(e) => { e.stopPropagation(); setHovered(false); }}
      onClick={(e) => { e.stopPropagation(); setClicked(true); }}
    >
      <primitive object={scene} />
    </group>
  );
};

useGLTF.preload('./robot.glb');

export default Character3D;
