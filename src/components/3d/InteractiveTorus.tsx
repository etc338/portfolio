"use client";
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const InteractiveTorus = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.z = 18;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    if (mountRef.current) {
      const { clientWidth, clientHeight } = mountRef.current;
      renderer.setSize(clientWidth, clientHeight);
      camera.aspect = clientWidth / clientHeight;
      camera.updateProjectionMatrix();
      mountRef.current.appendChild(renderer.domElement);
    }

    const geometry = new THREE.TorusKnotGeometry(4.2, 1.2, 100, 16);
    const material = new THREE.MeshBasicMaterial({
      color: 0x0ea5e9,
      wireframe: true,
      transparent: true,
      opacity: 0.5
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const onMouseDown = () => isDragging = true;
    const onMouseUp = () => isDragging = false;
    const onMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const deltaMove = {
          x: e.offsetX - previousMousePosition.x,
          y: e.offsetY - previousMousePosition.y
        };
        mesh.rotation.y += deltaMove.x * 0.01;
        mesh.rotation.x += deltaMove.y * 0.01;
      }
      previousMousePosition = { x: e.offsetX, y: e.offsetY };
    };

    const canvasDom = renderer.domElement;
    canvasDom.addEventListener('mousedown', onMouseDown);
    canvasDom.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    const onResize = () => {
        if (mountRef.current) {
            const { clientWidth, clientHeight } = mountRef.current;
            renderer.setSize(clientWidth, clientHeight);
            camera.aspect = clientWidth / clientHeight;
            camera.updateProjectionMatrix();
        }
    };
    window.addEventListener('resize', onResize);

    const clock = new THREE.Clock();
    let animationFrameId: number;

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      if (!isDragging) {
        mesh.rotation.y += 0.008;
        mesh.rotation.x += 0.004;
      }
      const scaleFactor = 1 + Math.sin(elapsedTime * 2) * 0.06;
      mesh.scale.set(scaleFactor, scaleFactor, scaleFactor);
      
      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      canvasDom.removeEventListener('mousedown', onMouseDown);
      canvasDom.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('resize', onResize);
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="w-full h-64 md:h-80 flex flex-col items-center justify-center relative">
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing z-10" />
    </div>
  );
};