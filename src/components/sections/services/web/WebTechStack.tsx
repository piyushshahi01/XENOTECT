"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Text, Environment, Stars } from "@react-three/drei";
import * as THREE from "three";

const techStack = [
  { name: "React", color: "#61DAFB", pos: [-4, 2, 0], scale: 1 },
  { name: "Next.js", color: "#FFFFFF", pos: [4, 1, -2], scale: 1.2 },
  { name: "TypeScript", color: "#3178C6", pos: [0, 3, -1], scale: 0.9 },
  { name: "Node.js", color: "#339933", pos: [-3, -2, 1], scale: 1.1 },
  { name: "Three.js", color: "#FFFFFF", pos: [3, -2, 2], scale: 1 },
  { name: "PostgreSQL", color: "#336791", pos: [0, -3, -2], scale: 0.8 },
  { name: "Tailwind", color: "#38B2AC", pos: [-5, 0, -3], scale: 1.3 },
  { name: "GSAP", color: "#88CE02", pos: [5, -0.5, 0], scale: 0.9 }
];

function FloatingTech({ name, color, pos, scale }: any) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2} position={pos as any}>
      <mesh ref={meshRef} scale={scale}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial color="#111111" wireframe={true} transparent opacity={0.2} />
        {/* Glowing inner core */}
        <mesh scale={0.8}>
          <icosahedronGeometry args={[1, 0]} />
          <meshBasicMaterial color={color} transparent opacity={0.1} />
        </mesh>
        
        <Text
          position={[0, 0, 1.2]}
          fontSize={0.4}
          color={color}
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.02}
          outlineColor="#000000"
        >
          {name}
        </Text>
      </mesh>
    </Float>
  );
}

export function WebTechStack() {
  return (
    <section className="relative w-full h-[80vh] bg-transparent overflow-hidden flex flex-col items-center justify-center">
      
      <div className="absolute top-20 z-10 flex flex-col items-center text-center gap-4 pointer-events-none">
        <div className="inline-flex rounded-full px-4 py-1.5 text-[10px] uppercase tracking-[0.2em] font-medium bg-white/5 border border-white/10 text-white/70 w-fit">
          Infrastructure
        </div>
        <h2 className="font-sans text-4xl md:text-5xl font-bold tracking-tighter text-white">
          The Modern Stack
        </h2>
      </div>

      <div className="absolute inset-0 w-full h-full z-0 cursor-move">
        <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#ffffff" />
          <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />
          
          <group>
            {techStack.map((tech, i) => (
              <FloatingTech key={i} {...tech} />
            ))}
          </group>
          
          <Environment preset="night" />
        </Canvas>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#000000] to-transparent pointer-events-none z-10" />
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#000000] to-transparent pointer-events-none z-10" />
    </section>
  );
}
