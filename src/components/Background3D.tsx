import { useState, useRef, useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Float } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';
import * as THREE from 'three';

function AmbientStarDust() {
  const ref = useRef<THREE.Points>(null);
  const sphere = useMemo(() => random.inSphere(new Float32Array(1800 * 3), { radius: 18 }), []);

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x -= delta * 0.015;
    ref.current.rotation.y -= delta * 0.01;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial 
          transparent 
          color="#B8B5AD"
          opacity={0.35}
          size={0.03} 
          sizeAttenuation={true} 
          depthWrite={false} 
        />
      </Points>
    </group>
  );
}

function BronzeParticles() {
  const ref = useRef<THREE.Points>(null);
  const sphere = useMemo(() => random.inSphere(new Float32Array(800 * 3), { radius: 14 }), []);

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x += delta * 0.01;
    ref.current.rotation.y += delta * 0.02;
  });

  return (
    <group rotation={[Math.PI / 3, 0, 0]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial 
          transparent 
          color="#A88B62"
          opacity={0.25}
          size={0.025} 
          sizeAttenuation={true} 
          depthWrite={false} 
        />
      </Points>
    </group>
  );
}

function Floating3DGeometries() {
  const mesh1Ref = useRef<THREE.Mesh>(null);
  const mesh2Ref = useRef<THREE.Mesh>(null);
  const mesh3Ref = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    
    if (mesh1Ref.current) {
      mesh1Ref.current.rotation.x += delta * 0.15;
      mesh1Ref.current.rotation.y += delta * 0.2;
      mesh1Ref.current.position.y = Math.sin(t * 0.5) * 0.3 + 2.5;
    }
    if (mesh2Ref.current) {
      mesh2Ref.current.rotation.x -= delta * 0.12;
      mesh2Ref.current.rotation.z += delta * 0.18;
      mesh2Ref.current.position.y = Math.cos(t * 0.45) * 0.25 - 2.8;
    }
    if (mesh3Ref.current) {
      mesh3Ref.current.rotation.y += delta * 0.1;
      mesh3Ref.current.rotation.z -= delta * 0.15;
    }
    if (ringRef.current) {
      ringRef.current.rotation.x = Math.PI / 2.5 + Math.sin(t * 0.3) * 0.08;
      ringRef.current.rotation.y += delta * 0.08;
    }
  });

  return (
    <group>
      {/* Floating 3D Octahedron - Brushed Titanium / Bronze accents */}
      <Float speed={1.2} rotationIntensity={0.6} floatIntensity={0.8}>
        <mesh ref={mesh1Ref} position={[-5.5, 2.5, -3]}>
          <octahedronGeometry args={[1.2, 0]} />
          <meshStandardMaterial 
            wireframe 
            color="#A88B62" 
            roughness={0.4}
            metalness={0.85}
          />
        </mesh>
      </Float>

      {/* Floating 3D Icosahedron - Black Chrome */}
      <Float speed={1.4} rotationIntensity={0.7} floatIntensity={1.0}>
        <mesh ref={mesh2Ref} position={[6.2, -2.8, -4]}>
          <icosahedronGeometry args={[1.4, 0]} />
          <meshStandardMaterial 
            wireframe 
            color="#3B3C3A" 
            roughness={0.2}
            metalness={0.95}
          />
        </mesh>
      </Float>

      {/* Floating 3D Dodecahedron - Smoked Glass / Titanium */}
      <Float speed={1.0} rotationIntensity={0.5} floatIntensity={0.7}>
        <mesh ref={mesh3Ref} position={[5.8, 3.2, -6]}>
          <dodecahedronGeometry args={[1.0, 0]} />
          <meshStandardMaterial 
            wireframe 
            color="#765D3E" 
            roughness={0.3}
            metalness={0.7}
          />
        </mesh>
      </Float>

      {/* Architectural Orbit Ring - Brushed Bronze */}
      <mesh ref={ringRef} position={[0, 0, -8]}>
        <torusGeometry args={[8.5, 0.02, 16, 100]} />
        <meshBasicMaterial color="#2B2D31" transparent opacity={0.6} />
      </mesh>
    </group>
  );
}

function SceneController() {
  const mousePosition = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mousePosition.current.targetX = (event.clientX / window.innerWidth) * 2 - 1;
      mousePosition.current.targetY = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame(({ camera }) => {
    // Smooth lerp mouse tracking
    mousePosition.current.x += (mousePosition.current.targetX - mousePosition.current.x) * 0.03;
    mousePosition.current.y += (mousePosition.current.targetY - mousePosition.current.y) * 0.03;

    camera.position.x = mousePosition.current.x * 0.6;
    camera.position.y = mousePosition.current.y * 0.4;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

export default function Background3D() {
  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10 bg-[#0B0C0E] pointer-events-none">
      {/* Subtle architectural depth gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(168,139,98,0.06),transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_80%_60%,rgba(32,35,40,0.5),transparent)]" />
      
      <Canvas 
        camera={{ position: [0, 0, 7.5], fov: 55 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1.2} color="#F2EFE8" />
        <directionalLight position={[-10, -10, -5]} intensity={0.6} color="#765D3E" />
        <pointLight position={[0, 0, 3]} intensity={1.0} color="#A88B62" distance={12} />
        
        <SceneController />
        <AmbientStarDust />
        <BronzeParticles />
        <Floating3DGeometries />
      </Canvas>
    </div>
  );
}
