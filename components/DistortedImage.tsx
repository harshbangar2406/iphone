import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface DistortedImageProps {
  src: string;
  alt: string;
  className?: string;
}

const DistortedImage: React.FC<DistortedImageProps> = ({ src, alt, className = "" }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const meshRef = useRef<THREE.Mesh | null>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5, v: 0 });
  const targetMouseRef = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-0.5, 0.5, 0.5, -0.5, 0.1, 10);
    camera.position.z = 1;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    const loader = new THREE.TextureLoader();
    const texture = loader.load(src);
    texture.minFilter = THREE.LinearFilter;

    const geometry = new THREE.PlaneGeometry(1, 1, 32, 32);
    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTexture: { value: texture },
        uMouse: { value: new THREE.Vector2(0.5, 0.5) },
        uVelo: { value: 0.0 },
        uTime: { value: 0.0 }
      },
      vertexShader: `
        varying vec2 vUv;
        uniform float uTime;
        uniform vec2 uMouse;
        uniform float uVelo;

        void main() {
          vUv = uv;
          vec3 pos = position;
          
          float dist = distance(uv, uMouse);
          float strength = 0.05 * uVelo;
          float ripple = sin(dist * 20.0 - uTime * 2.0) * exp(-dist * 5.0);
          
          pos.z += ripple * strength;
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        uniform sampler2D uTexture;
        uniform vec2 uMouse;
        uniform float uVelo;
        uniform float uTime;

        void main() {
          vec2 uv = vUv;
          
          float dist = distance(uv, uMouse);
          float offset = sin(dist * 15.0 - uTime * 3.0) * 0.02 * uVelo * exp(-dist * 8.0);
          
          vec2 distortedUv = uv + (uv - uMouse) * offset;
          vec4 color = texture2D(uTexture, distortedUv);
          
          // Subtle glow near mouse
          float glow = exp(-dist * 10.0) * uVelo * 0.1;
          color.rgb += vec3(0.5, 0.4, 1.0) * glow;

          gl_FragColor = color;
        }
      `,
      transparent: true
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    meshRef.current = mesh;

    const handleResize = () => {
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = 1.0 - (e.clientY - rect.top) / rect.height;
      
      const dx = x - targetMouseRef.current.x;
      const dy = y - targetMouseRef.current.y;
      const velocity = Math.sqrt(dx*dx + dy*dy);
      
      targetMouseRef.current = { x, y };
      mouseRef.current.v = Math.min(velocity * 50.0, 1.5);
    };

    container.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    const clock = new THREE.Clock();
    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      
      // Smooth mouse movement
      mouseRef.current.x += (targetMouseRef.current.x - mouseRef.current.x) * 0.1;
      mouseRef.current.y += (targetMouseRef.current.y - mouseRef.current.y) * 0.1;
      mouseRef.current.v *= 0.95; // Velocity decay

      if (material.uniforms) {
        material.uniforms.uTime.value = elapsedTime;
        material.uniforms.uMouse.value.set(mouseRef.current.x, mouseRef.current.y);
        material.uniforms.uVelo.value = mouseRef.current.v;
      }

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      container.removeChild(renderer.domElement);
      geometry.dispose();
      material.dispose();
      texture.dispose();
      renderer.dispose();
    };
  }, [src]);

  return <div ref={containerRef} className={`w-full h-full relative overflow-hidden cursor-pointer ${className}`} />;
};

export default DistortedImage;