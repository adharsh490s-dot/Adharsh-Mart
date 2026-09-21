import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeCanvas() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x131921, 0.035);

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 8);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    // -------------------------------------------------------------
    // LIGHTING
    // -------------------------------------------------------------
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xfebd69, 2.5); // Amazon yellow light
    dirLight1.position.set(5, 8, 5);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xe47911, 1.8); // Amazon orange rim light
    dirLight2.position.set(-5, -4, -2);
    scene.add(dirLight2);

    const pointLight = new THREE.PointLight(0xfebd69, 3, 10);
    pointLight.position.set(0, 0, 2);
    scene.add(pointLight);

    // -------------------------------------------------------------
    // PROCEDURAL 3D MESHES
    // -------------------------------------------------------------

    // 1. Luxury Over-Ear Headphones Group
    const headphonesGroup = new THREE.Group();

    // Headband
    const headbandGeo = new THREE.TorusGeometry(1.6, 0.12, 16, 100, Math.PI);
    const darkMetalMat = new THREE.MeshStandardMaterial({
      color: 0x232f3e,
      metalness: 0.8,
      roughness: 0.2
    });
    const headband = new THREE.Mesh(headbandGeo, darkMetalMat);
    headband.rotation.x = Math.PI / 2;
    headphonesGroup.add(headband);

    // Earcups (Left & Right)
    const earcupGeo = new THREE.CylinderGeometry(0.7, 0.7, 0.4, 32);
    const cushionGeo = new THREE.TorusGeometry(0.65, 0.12, 16, 32);
    const goldMetalMat = new THREE.MeshStandardMaterial({
      color: 0xfebd69,
      metalness: 0.9,
      roughness: 0.1
    });
    const cushionMat = new THREE.MeshStandardMaterial({
      color: 0x131921,
      roughness: 0.9
    });

    const leftCup = new THREE.Mesh(earcupGeo, goldMetalMat);
    leftCup.position.set(-1.6, -0.2, 0);
    leftCup.rotation.z = Math.PI / 2;
    const leftCushion = new THREE.Mesh(cushionGeo, cushionMat);
    leftCushion.position.set(-1.4, -0.2, 0);
    leftCushion.rotation.y = Math.PI / 2;

    const rightCup = new THREE.Mesh(earcupGeo, goldMetalMat);
    rightCup.position.set(1.6, -0.2, 0);
    rightCup.rotation.z = Math.PI / 2;
    const rightCushion = new THREE.Mesh(cushionGeo, cushionMat);
    rightCushion.position.set(1.4, -0.2, 0);
    rightCushion.rotation.y = Math.PI / 2;

    headphonesGroup.add(leftCup, leftCushion, rightCup, rightCushion);
    scene.add(headphonesGroup);

    // 2. Sleek Titanium Smartphone Body
    const phoneGroup = new THREE.Group();
    const phoneBodyGeo = new THREE.BoxGeometry(1.8, 3.6, 0.18);
    const titaniumMat = new THREE.MeshStandardMaterial({
      color: 0x8a929a,
      metalness: 0.95,
      roughness: 0.15
    });
    const phoneBody = new THREE.Mesh(phoneBodyGeo, titaniumMat);

    // Screen Glass
    const screenGeo = new THREE.PlaneGeometry(1.7, 3.4);
    const screenMat = new THREE.MeshStandardMaterial({
      color: 0x050b14,
      metalness: 0.1,
      roughness: 0.05
    });
    const screen = new THREE.Mesh(screenGeo, screenMat);
    screen.position.z = 0.095;
    phoneGroup.add(phoneBody, screen);

    // Camera Module (Back)
    const cameraBumpGeo = new THREE.BoxGeometry(0.7, 0.7, 0.08);
    const cameraBump = new THREE.Mesh(cameraBumpGeo, darkMetalMat);
    cameraBump.position.set(-0.4, 1.2, -0.1);
    
    const lensGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.1, 16);
    const lensMat = new THREE.MeshStandardMaterial({ color: 0x111111, metalness: 0.9, roughness: 0.1 });
    const lens1 = new THREE.Mesh(lensGeo, lensMat);
    lens1.rotation.x = Math.PI / 2;
    lens1.position.set(-0.4, 1.35, -0.15);
    const lens2 = new THREE.Mesh(lensGeo, lensMat);
    lens2.rotation.x = Math.PI / 2;
    lens2.position.set(-0.4, 1.05, -0.15);
    
    phoneGroup.add(cameraBump, lens1, lens2);
    phoneGroup.position.set(4, -3, -2);
    scene.add(phoneGroup);

    // 3. AdharshMart Golden Delivery Orb
    const orbGroup = new THREE.Group();
    const orbGeo = new THREE.SphereGeometry(1.1, 32, 32);
    const orbMat = new THREE.MeshStandardMaterial({
      color: 0xfebd69,
      emissive: 0xe47911,
      emissiveIntensity: 0.4,
      metalness: 0.9,
      roughness: 0.1
    });
    const orb = new THREE.Mesh(orbGeo, orbMat);

    // Saturn Ring around Orb
    const ringGeo = new THREE.RingGeometry(1.4, 1.8, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xfebd69,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.7
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 3;

    orbGroup.add(orb, ring);
    orbGroup.position.set(-4, -6, -4);
    scene.add(orbGroup);

    // 4. Floating Ambient Particle Galaxy
    const particleCount = 450;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const goldColor = new THREE.Color(0xfebd69);
    const whiteColor = new THREE.Color(0xffffff);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 25;
      positions[i + 1] = (Math.random() - 0.5) * 25;
      positions[i + 2] = (Math.random() - 0.5) * 25;

      const mixedColor = Math.random() > 0.5 ? goldColor : whiteColor;
      colors[i] = mixedColor.r;
      colors[i + 1] = mixedColor.g;
      colors[i + 2] = mixedColor.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.08,
      vertexColors: true,
      transparent: true,
      opacity: 0.8
    });
    const particleGalaxy = new THREE.Points(particleGeo, particleMat);
    scene.add(particleGalaxy);

    // -------------------------------------------------------------
    // SCROLL-LINKED ANIMATION LISTENER
    // -------------------------------------------------------------
    let scrollY = 0;
    let targetScrollY = 0;

    const handleScroll = () => {
      targetScrollY = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Handle Window Resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // -------------------------------------------------------------
    // ANIMATION LOOP
    // -------------------------------------------------------------
    let clock = new THREE.Clock();
    let animationFrameId;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth scroll interpolation
      scrollY += (targetScrollY - scrollY) * 0.08;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight || 1;
      const scrollProgress = Math.min(1, Math.max(0, scrollY / maxScroll));

      // Continuous Idle Rotations
      headphonesGroup.rotation.y = elapsedTime * 0.3;
      headphonesGroup.rotation.x = Math.sin(elapsedTime * 0.5) * 0.15;

      phoneGroup.rotation.y = elapsedTime * 0.4;
      phoneGroup.rotation.z = Math.cos(elapsedTime * 0.3) * 0.1;

      orbGroup.rotation.y = elapsedTime * 0.6;
      ring.rotation.z = elapsedTime * 0.5;

      particleGalaxy.rotation.y = elapsedTime * 0.05;

      // Scroll-driven Stage Choreography
      // 0.0 - 0.33: Headphones center stage
      // 0.33 - 0.66: Phone sweeps into focus
      // 0.66 - 1.00: Golden Orb & Galaxy convergence
      
      headphonesGroup.position.x = -scrollProgress * 6;
      headphonesGroup.position.z = -scrollProgress * 4;

      phoneGroup.position.x = 4 - scrollProgress * 5;
      phoneGroup.position.y = -3 + scrollProgress * 3.5;
      phoneGroup.position.z = -2 + scrollProgress * 2;

      orbGroup.position.x = -4 + scrollProgress * 5;
      orbGroup.position.y = -6 + scrollProgress * 6;
      orbGroup.position.z = -4 + scrollProgress * 5;

      camera.position.z = 8 - Math.sin(scrollProgress * Math.PI) * 2;
      camera.position.y = -scrollProgress * 1.5;

      pointLight.position.x = Math.sin(elapsedTime) * 3;
      pointLight.position.y = Math.cos(elapsedTime * 0.7) * 3;

      renderer.render(scene, camera);
    };

    animate();

    // Clean up
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    />
  );
}

