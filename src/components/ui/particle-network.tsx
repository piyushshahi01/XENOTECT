"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export function ParticleNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const [stats, setStats] = useState({ nodes: 160, links: 0, fps: 60 });

  useEffect(() => {
    if (!canvasRef.current) return;

    // --- Setup ---
    const canvas = canvasRef.current;
    const isMobile = window.innerWidth < 768;
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: !isMobile,
      alpha: true,
      powerPreference: "high-performance",
    });

    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    renderer.setPixelRatio(DPR);
    renderer.setClearColor(0x000000, 0); // Transparent
    
    let width = window.innerWidth;
    let height = window.innerHeight;
    renderer.setSize(width, height);

    const camera = new THREE.PerspectiveCamera(55, width / height, 1, 1000);
    camera.position.z = 400;

    const scene = new THREE.Scene();
    // Add subtle fog to create depth fade
    scene.fog = new THREE.FogExp2(0x050505, 0.0015);

    // --- Particles & Lines ---
    const particlesData: any[] = [];
    const maxParticleCount = 160;
    const particleCount = maxParticleCount;
    const r = 800;
    const rHalf = r / 2;

    const effectController = {
      minDistance: 130,
      limitConnections: false,
      maxConnections: 20,
    };

    const group = new THREE.Group();
    scene.add(group);

    const segments = maxParticleCount * maxParticleCount;

    const positions = new Float32Array(segments * 3);
    const colors = new Float32Array(segments * 3);

    const pMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 4,
      blending: THREE.AdditiveBlending,
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: true,
    });

    const particles = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(maxParticleCount * 3);

    for (let i = 0; i < maxParticleCount; i++) {
      const x = Math.random() * r - r / 2;
      const y = Math.random() * r - r / 2;
      const z = Math.random() * r - r / 2;

      particlePositions[i * 3] = x;
      particlePositions[i * 3 + 1] = y;
      particlePositions[i * 3 + 2] = z;

      particlesData.push({
        velocity: new THREE.Vector3(
          -1 + Math.random() * 2,
          -1 + Math.random() * 2,
          -1 + Math.random() * 2
        ).normalize().multiplyScalar(0.4), // Slower drift
        numConnections: 0,
      });
    }

    particles.setDrawRange(0, particleCount);
    particles.setAttribute(
      "position",
      new THREE.BufferAttribute(particlePositions, 3).setUsage(THREE.DynamicDrawUsage)
    );

    const pointCloud = new THREE.Points(particles, pMaterial);
    group.add(pointCloud);

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3).setUsage(THREE.DynamicDrawUsage));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3).setUsage(THREE.DynamicDrawUsage));
    geometry.computeBoundingSphere();

    const material = new THREE.LineBasicMaterial({
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      transparent: true,
      opacity: 0.3
    });

    const linesMesh = new THREE.LineSegments(geometry, material);
    group.add(linesMesh);

    // --- Interaction & Motion ---
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const onDocumentMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX - width / 2) * 0.05;
      mouseY = (event.clientY - height / 2) * 0.05;
    };

    document.addEventListener("mousemove", onDocumentMouseMove, false);

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize, false);

    // --- Animation Loop ---
    let frameId: number;
    let lastTime = performance.now();
    let frames = 0;
    let currentFps = 60;
    let lastStatsUpdateTime = performance.now();

    const animate = () => {
      frameId = requestAnimationFrame(animate);

      // FPS Calculation
      const time = performance.now();
      frames++;
      if (time >= lastTime + 1000) {
        currentFps = Math.round((frames * 1000) / (time - lastTime));
        frames = 0;
        lastTime = time;
      }

      // Pointer Drift
      targetX = mouseX * 0.001;
      targetY = mouseY * 0.001;

      if (group) {
        group.rotation.y += 0.0005; // Slow breathing rotation
        group.rotation.y += (targetX - group.rotation.y) * 0.05;
        group.rotation.x += (targetY - group.rotation.x) * 0.05;
      }

      let vertexpos = 0;
      let colorpos = 0;
      let numConnected = 0;

      for (let i = 0; i < particleCount; i++)
        particlesData[i].numConnections = 0;

      for (let i = 0; i < particleCount; i++) {
        const particleData = particlesData[i];

        particlePositions[i * 3] += particleData.velocity.x;
        particlePositions[i * 3 + 1] += particleData.velocity.y;
        particlePositions[i * 3 + 2] += particleData.velocity.z;

        if (particlePositions[i * 3 + 1] < -rHalf || particlePositions[i * 3 + 1] > rHalf)
          particleData.velocity.y = -particleData.velocity.y;
        if (particlePositions[i * 3] < -rHalf || particlePositions[i * 3] > rHalf)
          particleData.velocity.x = -particleData.velocity.x;
        if (particlePositions[i * 3 + 2] < -rHalf || particlePositions[i * 3 + 2] > rHalf)
          particleData.velocity.z = -particleData.velocity.z;

        if (effectController.limitConnections && particleData.numConnections >= effectController.maxConnections)
          continue;

        for (let j = i + 1; j < particleCount; j++) {
          const particleDataB = particlesData[j];
          if (effectController.limitConnections && particleDataB.numConnections >= effectController.maxConnections)
            continue;

          const dx = particlePositions[i * 3] - particlePositions[j * 3];
          const dy = particlePositions[i * 3 + 1] - particlePositions[j * 3 + 1];
          const dz = particlePositions[i * 3 + 2] - particlePositions[j * 3 + 2];
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist < effectController.minDistance) {
            particleData.numConnections++;
            particleDataB.numConnections++;

            const alpha = 1.0 - dist / effectController.minDistance;

            positions[vertexpos++] = particlePositions[i * 3];
            positions[vertexpos++] = particlePositions[i * 3 + 1];
            positions[vertexpos++] = particlePositions[i * 3 + 2];

            positions[vertexpos++] = particlePositions[j * 3];
            positions[vertexpos++] = particlePositions[j * 3 + 1];
            positions[vertexpos++] = particlePositions[j * 3 + 2];

            colors[colorpos++] = alpha;
            colors[colorpos++] = alpha;
            colors[colorpos++] = alpha;

            colors[colorpos++] = alpha;
            colors[colorpos++] = alpha;
            colors[colorpos++] = alpha;

            numConnected++;
          }
        }
      }

      linesMesh.geometry.setDrawRange(0, numConnected * 2);
      linesMesh.geometry.attributes.position.needsUpdate = true;
      linesMesh.geometry.attributes.color.needsUpdate = true;
      pointCloud.geometry.attributes.position.needsUpdate = true;

      // Update React state roughly twice a second to keep UI smooth
      if (time - lastStatsUpdateTime > 500) {
        setStats({
          nodes: particleCount,
          links: numConnected,
          fps: currentFps
        });
        lastStatsUpdateTime = time;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("mousemove", onDocumentMouseMove);
      renderer.dispose();
      
      geometry.dispose();
      material.dispose();
      particles.dispose();
      pMaterial.dispose();
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-auto z-0"
        aria-hidden="true"
      />
      
      {/* Bottom Left Stats */}
      <div className="absolute bottom-8 left-8 z-10 flex flex-col gap-1 text-[11px] font-mono tracking-widest text-neutral-400">
        <div className="flex gap-4">
          <span className="uppercase opacity-50 w-12">Nodes</span>
          <span className="text-white">{stats.nodes}</span>
        </div>
        <div className="flex gap-4">
          <span className="uppercase opacity-50 w-12">Links</span>
          <span className="text-white">{stats.links}</span>
        </div>
        <div className="flex gap-4">
          <span className="uppercase opacity-50 w-12">Fps</span>
          <span className="text-white">{stats.fps}</span>
        </div>
      </div>
    </>
  );
}
