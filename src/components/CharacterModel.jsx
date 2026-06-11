import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, useAnimations } from '@react-three/drei';
import * as THREE from 'three';

const CharacterModel = () => {
  const group = useRef();
  
  // Load a highly professional, rigged 3D character model from the PMNDRS public asset market
  // This is "Stacy", a standard high-quality animated character. 
  // You can easily swap this URL with your own .glb file path later (e.g., './my-character.glb')
  const { nodes, materials, animations } = useGLTF('./robot.glb');
  const { actions } = useAnimations(animations, group);

  const currentScroll = useRef(0);
  const targetScroll = useRef(0);

  useEffect(() => {
    // Play the Idle animation by default if it exists
    if (actions && actions['Idle']) {
      actions['Idle'].play();
    } else if (actions && actions['idle']) {
      actions['idle'].play();
    } else if (actions && Object.keys(actions).length > 0) {
      // Play the first available animation if 'idle' isn't found
      const firstAction = Object.keys(actions)[0];
      actions[firstAction].play();
    }
  }, [actions]);

  useFrame((state, delta) => {
    const maxScroll = document.body.scrollHeight - window.innerHeight;
    targetScroll.current = window.scrollY / maxScroll || 0;
    currentScroll.current = THREE.MathUtils.lerp(currentScroll.current, targetScroll.current, delta * 4);

    if (group.current) {
      // SCROLL INTERACTION:
      // The character stays vertically stable but subtly rotates to look around based on scroll progress
      // (Starts looking slightly right, rotates to look left as you scroll down)
      group.current.rotation.y = THREE.MathUtils.lerp(Math.PI / 4, -Math.PI / 6, currentScroll.current);
      
      // Keep position fixed to its local container coordinates
      group.current.position.y = -2;
      
      // MOUSE INTERACTION:
      // The character's entire group slightly tilts towards the mouse for a 3D parallax feel
      const targetX = (state.pointer.x * Math.PI) / 8;
      const targetY = (state.pointer.y * Math.PI) / 8;
      
      group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -targetY, delta * 2);
      group.current.rotation.z = THREE.MathUtils.lerp(group.current.rotation.z, -targetX, delta * 2);
    }
  });

  return (
    <group ref={group} dispose={null} scale={1.8}>
      <primitive object={nodes.Scene || nodes.scene || nodes._rootJoint || Object.values(nodes)[0]} />
    </group>
  );
};

// Preload the model so it renders instantly
useGLTF.preload('./robot.glb');

export default CharacterModel;
