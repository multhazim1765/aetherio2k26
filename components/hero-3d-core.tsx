'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function Hero3DCore() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasWebGL, setHasWebGL] = useState(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setHasWebGL(false);
        return;
      }
    } catch {
      setHasWebGL(false);
      return;
    }

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || 500;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 7;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    container.appendChild(renderer.domElement);

    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    // 1. Dragon Aether Core (Crimson Geometric Core)
    const innerGeo = new THREE.IcosahedronGeometry(1.6, 2);
    const innerMat = new THREE.MeshStandardMaterial({
      color: 0xe6001a,
      emissive: 0x66000b,
      emissiveIntensity: 0.8,
      roughness: 0.15,
      metalness: 0.95,
      wireframe: true,
    });
    const innerCore = new THREE.Mesh(innerGeo, innerMat);
    coreGroup.add(innerCore);

    // 2. High-intensity Dragonfire Ember Core
    const centerSphereGeo = new THREE.SphereGeometry(1.15, 32, 32);
    const centerSphereMat = new THREE.MeshBasicMaterial({
      color: 0xf97316,
      transparent: true,
      opacity: 0.4,
      wireframe: false,
    });
    const centerSphere = new THREE.Mesh(centerSphereGeo, centerSphereMat);
    coreGroup.add(centerSphere);

    // 3. Dragon Orbital Rings (Crimson & Molten Gold)
    const ring1Geo = new THREE.TorusGeometry(2.3, 0.025, 16, 100);
    const ring1Mat = new THREE.MeshBasicMaterial({ color: 0xff1e38, transparent: true, opacity: 0.8 });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 3;
    coreGroup.add(ring1);

    const ring2Geo = new THREE.TorusGeometry(2.6, 0.018, 16, 100);
    const ring2Mat = new THREE.MeshBasicMaterial({ color: 0xf97316, transparent: true, opacity: 0.7 });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.y = Math.PI / 4;
    ring2.rotation.x = -Math.PI / 6;
    coreGroup.add(ring2);

    const ring3Geo = new THREE.TorusGeometry(2.9, 0.012, 16, 100);
    const ring3Mat = new THREE.MeshBasicMaterial({ color: 0x990012, transparent: true, opacity: 0.5 });
    const ring3 = new THREE.Mesh(ring3Geo, ring3Mat);
    ring3.rotation.z = Math.PI / 3;
    coreGroup.add(ring3);

    // 4. Molten Ember Particle System
    const particleCount = window.innerWidth < 768 ? 400 : 900;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
      const r = 2.2 + Math.random() * 3.0;

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xff3344,
      size: 0.04,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    coreGroup.add(particles);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const pointLightRed = new THREE.PointLight(0xe6001a, 3.5, 12);
    pointLightRed.position.set(3, 3, 3);
    scene.add(pointLightRed);

    const pointLightOrange = new THREE.PointLight(0xf97316, 3, 10);
    pointLightOrange.position.set(-3, -3, 3);
    scene.add(pointLightOrange);

    // Mouse tracking
    let targetRotationX = 0;
    let targetRotationY = 0;
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseX = x;
      mouseY = y;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight || 500;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    let animationId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      innerCore.rotation.y += 0.007;
      innerCore.rotation.x += 0.004;

      ring1.rotation.z += 0.009;
      ring2.rotation.x += 0.007;
      ring3.rotation.y += 0.006;

      particles.rotation.y = elapsedTime * 0.05;
      particles.rotation.x = elapsedTime * 0.03;

      const scale = 1 + Math.sin(elapsedTime * 1.8) * 0.05;
      centerSphere.scale.set(scale, scale, scale);

      targetRotationY += (mouseX * 0.4 - targetRotationY) * 0.05;
      targetRotationX += (-mouseY * 0.4 - targetRotationX) * 0.05;

      coreGroup.rotation.y = targetRotationY;
      coreGroup.rotation.x = targetRotationX;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="relative w-full h-full min-h-[380px] md:min-h-[500px] flex items-center justify-center pointer-events-none select-none">
      {/* Dragonfire Ambient Glow */}
      <div className="absolute w-72 h-72 md:w-96 md:h-96 rounded-full bg-red-600/20 blur-[110px] pointer-events-none" />
      <div className="absolute w-64 h-64 md:w-80 md:h-80 rounded-full bg-orange-600/20 blur-[90px] translate-x-12 translate-y-12 pointer-events-none" />

      {hasWebGL ? (
        <div ref={containerRef} className="w-full h-full absolute inset-0 z-10" />
      ) : (
        <div className="relative w-64 h-64 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border border-red-500/40 animate-spin-slow" />
          <div className="absolute inset-4 rounded-full border border-dashed border-orange-500/50 animate-spin" />
          <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-red-600/40 to-orange-600/50 backdrop-blur-md flex items-center justify-center border border-red-500/30 animate-pulse">
            <span className="text-xs font-mono text-red-400 uppercase tracking-widest">DRAGON CORE</span>
          </div>
        </div>
      )}
    </div>
  );
}
