import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const Hero3DScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const scene = new THREE.Scene();
    
    // Original dark purple/midnight theme background
    scene.background = new THREE.Color('#030014'); 

    const isMobile = window.innerWidth < 768;
    const camera = new THREE.PerspectiveCamera(
      isMobile ? 70 : 50, 
      window.innerWidth / window.innerHeight, 
      0.1, 
      1000
    );
    camera.position.z = isMobile ? 12 : 10;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5)); // Capped for mobile perf
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    renderer.shadowMap.enabled = !isMobile; // Disable shadows on mobile for performance
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // --- Soft Studio Lighting ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const topLight = new THREE.DirectionalLight(0xffffff, 1.5);
    topLight.position.set(2, 10, 5);
    if (!isMobile) topLight.castShadow = true;
    scene.add(topLight);

    const rimLight = new THREE.PointLight(0x7c3aed, 1.2);
    rimLight.position.set(-8, 5, -2);
    scene.add(rimLight);

    const warmFill = new THREE.PointLight(0x2dd4bf, 0.6);
    warmFill.position.set(8, -5, 4);
    scene.add(warmFill);

    // --- High-End Materials ---
    const frostedGlass = new THREE.MeshPhysicalMaterial({
      thickness: isMobile ? 0.5 : 1.5,
      roughness: 0.15,
      transmission: 0.95,
      ior: 1.5,
      dispersion: isMobile ? 2 : 8,
      color: 0xffffff,
      metalness: 0,
    });

    const glossyChrome = new THREE.MeshStandardMaterial({
      color: 0x7c3aed,
      metalness: 1.0,
      roughness: 0.05,
    });

    const softPastels = [
      new THREE.MeshStandardMaterial({ color: 0x4c1d95, roughness: 0.4, metalness: 0.1 }),
      new THREE.MeshStandardMaterial({ color: 0x7e22ce, roughness: 0.4, metalness: 0.1 }),
      new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.4, metalness: 0.1 }),
    ];

    const objects: Array<{ mesh: THREE.Mesh; initialPos: THREE.Vector3; floatSpeed: number; rotationSpeed: THREE.Vector3 }> = [];

    // Organic Floating Spheres - Reduced count on mobile
    const sphereCount = isMobile ? 4 : 8;
    for (let i = 0; i < sphereCount; i++) {
      const size = (0.5 + Math.random() * 1.2) * (isMobile ? 0.8 : 1);
      const geometry = new THREE.SphereGeometry(size, isMobile ? 32 : 64, isMobile ? 32 : 64);
      const isGlass = i % 2 === 0;
      const mesh = new THREE.Mesh(geometry, isGlass ? frostedGlass : softPastels[i % softPastels.length]);
      
      const pos = new THREE.Vector3(
        (Math.random() - 0.5) * (isMobile ? 10 : 15),
        (Math.random() - 0.5) * (isMobile ? 12 : 10),
        (Math.random() - 0.5) * 5
      );
      mesh.position.copy(pos);
      if (!isMobile) {
        mesh.castShadow = true;
        mesh.receiveShadow = true;
      }
      mainGroup.add(mesh);
      
      objects.push({
        mesh,
        initialPos: pos.clone(),
        floatSpeed: 0.1 + Math.random() * 0.3,
        rotationSpeed: new THREE.Vector3(Math.random() * 0.005, Math.random() * 0.005, Math.random() * 0.005)
      });
    }

    // Metallic Soft-Edged Ribbons - Reduced count on mobile
    const ribbonCount = isMobile ? 2 : 4;
    for (let i = 0; i < ribbonCount; i++) {
      const geometry = new THREE.TorusKnotGeometry(isMobile ? 1.0 : 1.5, 0.08, isMobile ? 80 : 150, 20, 2, 5);
      const mesh = new THREE.Mesh(geometry, glossyChrome);
      
      const pos = new THREE.Vector3(
        (Math.random() - 0.5) * (isMobile ? 8 : 12),
        (Math.random() - 0.5) * (isMobile ? 10 : 8),
        (Math.random() - 0.5) * 3
      );
      mesh.position.copy(pos);
      mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
      if (!isMobile) mesh.castShadow = true;
      mainGroup.add(mesh);
      
      objects.push({
        mesh,
        initialPos: pos.clone(),
        floatSpeed: 0.05 + Math.random() * 0.2,
        rotationSpeed: new THREE.Vector3(Math.random() * 0.003, Math.random() * 0.003, 0.001)
      });
    }

    const handleMouseMove = (event: MouseEvent) => {
      mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (event.touches.length > 0) {
        mouse.current.x = (event.touches[0].clientX / window.innerWidth) * 2 - 1;
        mouse.current.y = -(event.touches[0].clientY / window.innerHeight) * 2 + 1;
      }
    };

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('resize', handleResize);

    const clock = new THREE.Clock();
    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      
      // Mouse/Touch Parallax
      const targetX = mouse.current.x * 0.5;
      const targetY = mouse.current.y * 0.5;
      mainGroup.position.x += (targetX - mainGroup.position.x) * 0.02;
      mainGroup.position.y += (targetY - mainGroup.position.y) * 0.02;
      
      mainGroup.rotation.y += (mouse.current.x * 0.05 - mainGroup.rotation.y) * 0.01;
      mainGroup.rotation.x += (-mouse.current.y * 0.05 - mainGroup.rotation.x) * 0.01;

      // Constant underwater floating effect
      objects.forEach((obj) => {
        const { mesh, initialPos, floatSpeed, rotationSpeed } = obj;
        
        mesh.position.x = initialPos.x + Math.sin(elapsedTime * floatSpeed * 0.8 + initialPos.x) * 0.4;
        mesh.position.y = initialPos.y + Math.cos(elapsedTime * floatSpeed + initialPos.y) * 0.5;
        mesh.position.z = initialPos.z + Math.sin(elapsedTime * floatSpeed * 1.5) * 0.2;

        mesh.rotation.x += rotationSpeed.x;
        mesh.rotation.y += rotationSpeed.y;
        mesh.rotation.z += rotationSpeed.z;
      });

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('resize', handleResize);
      container.removeChild(renderer.domElement);
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry.dispose();
          if (Array.isArray(obj.material)) obj.material.forEach(m => m.dispose());
          else obj.material.dispose();
        }
      });
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-80" 
    />
  );
};

export default Hero3DScene;