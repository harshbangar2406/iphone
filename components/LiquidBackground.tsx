import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const LiquidBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Custom Shader Material for Silk Effect
    const silkShader = {
      uniforms: {
        uTime: { value: 0.0 },
        uColor1: { value: new THREE.Color('#030014') }, // Midnight Blue
        uColor2: { value: new THREE.Color('#7c3aed') }, // Violet
        uColor3: { value: new THREE.Color('#2dd4bf') }, // Teal
      },
      vertexShader: `
        varying vec2 vUv;
        varying float vElevation;
        uniform float uTime;

        void main() {
          vUv = uv;
          vec4 modelPosition = modelMatrix * vec4(position, 1.0);

          float elevation = sin(modelPosition.x * 0.5 + uTime * 0.5) * 
                            cos(modelPosition.z * 0.5 + uTime * 0.3) * 0.8;
          
          elevation += sin(modelPosition.x * 1.5 + uTime * 0.2) * 0.2;

          modelPosition.y += elevation;
          vElevation = elevation;

          vec4 viewPosition = viewMatrix * modelPosition;
          vec4 projectedPosition = projectionMatrix * viewPosition;

          gl_Position = projectedPosition;
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        varying float vElevation;
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        uniform vec3 uColor3;

        void main() {
          float mixStrength = (vElevation + 1.0) * 0.5;
          vec3 color = mix(uColor1, uColor2, mixStrength);
          color = mix(color, uColor3, clamp(sin(vUv.x * 3.14 + vElevation), 0.0, 1.0) * 0.3);
          
          // Add some "rim lighting" effect based on elevation
          float rim = pow(1.0 - abs(vElevation), 4.0);
          color += rim * 0.15;

          gl_FragColor = vec4(color, 0.9);
        }
      `
    };

    const geometry = new THREE.PlaneGeometry(25, 25, 128, 128);
    const material = new THREE.ShaderMaterial({
      vertexShader: silkShader.vertexShader,
      fragmentShader: silkShader.fragmentShader,
      uniforms: silkShader.uniforms,
      side: THREE.DoubleSide,
      transparent: true,
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.x = -Math.PI * 0.35;
    scene.add(mesh);

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    const clock = new THREE.Clock();
    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      material.uniforms.uTime.value = elapsedTime;
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      container.removeChild(renderer.domElement);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 z-0 pointer-events-none opacity-60" 
      style={{ filter: 'blur(30px)' }}
    />
  );
};

export default LiquidBackground;