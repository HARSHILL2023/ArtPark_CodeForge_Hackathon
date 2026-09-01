import React, { useEffect, useRef } from 'react';

export default function Hero3DVisual({ className = '' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = (canvas.width = canvas.offsetWidth * window.devicePixelRatio || 600);
    let height = (canvas.height = canvas.offsetHeight * window.devicePixelRatio || 500);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth * window.devicePixelRatio || 600;
      height = canvas.height = canvas.offsetHeight * window.devicePixelRatio || 500;
    };
    window.addEventListener('resize', handleResize);

    // Mouse coordinates for interactive rotation
    let mouseX = 0;
    let mouseY = 0;
    let targetRotX = 0;
    let targetRotY = 0;
    let rotX = 0.2;
    let rotY = 0.3;
    let rotZ = 0;

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      targetRotY = x * 1.2;
      targetRotX = -y * 1.2;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // 3D Nodes generation (Fibonacci sphere algorithm for even topological distribution)
    const numNodes = 42;
    const radius = Math.min(width, height) * 0.28;
    const nodes = [];
    const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle

    for (let i = 0; i < numNodes; i++) {
      const y = 1 - (i / (numNodes - 1)) * 2; // y goes from 1 to -1
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = phi * i;
      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;

      nodes.push({
        x: x * radius,
        y: y * radius,
        z: z * radius,
        baseX: x * radius,
        baseY: y * radius,
        baseZ: z * radius,
        radius: Math.random() * 2.5 + 2.5,
        pulseOffset: Math.random() * Math.PI * 2,
        colorType: i % 4 === 0 ? '#60A5FA' : i % 3 === 0 ? '#3B82F6' : '#2563EB',
        label: i % 6 === 0 ? ['Kahn DAG', 'Vector Sim', 'Prereq', 'ATS 98%', 'LLM Engine', 'Graph Flow'][Math.floor(i / 6)] : null
      });
    }

    // Connect nodes within distance threshold
    const edges = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].baseX - nodes[j].baseX;
        const dy = nodes[i].baseY - nodes[j].baseY;
        const dz = nodes[i].baseZ - nodes[j].baseZ;
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist < radius * 0.72) {
          edges.push({ i, j, dist });
        }
      }
    }

    // Render loop
    let time = 0;
    const render = () => {
      time += 0.015;

      // Smooth camera interpolation
      rotX += (targetRotX + Math.sin(time * 0.5) * 0.15 - rotX) * 0.05;
      rotY += (targetRotY + time * 0.25 - rotY) * 0.05;
      rotZ = Math.sin(time * 0.3) * 0.1;

      ctx.clearRect(0, 0, width, height);

      const fov = 400;
      const cx = width / 2;
      const cy = height / 2;

      // Projected nodes array
      const projectedNodes = [];

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        // Subtle pulsation
        const pulse = Math.sin(time * 2 + n.pulseOffset) * 6;
        const currentRadius = 1 + pulse / radius;

        let x = n.baseX * currentRadius;
        let y = n.baseY * currentRadius;
        let z = n.baseZ * currentRadius;

        // 3D Matrix Rotation (Y axis)
        let x1 = x * Math.cos(rotY) + z * Math.sin(rotY);
        let z1 = -x * Math.sin(rotY) + z * Math.cos(rotY);

        // Rotation (X axis)
        let y2 = y * Math.cos(rotX) - z1 * Math.sin(rotX);
        let z2 = y * Math.sin(rotX) + z1 * Math.cos(rotX);

        // Rotation (Z axis)
        let x3 = x1 * Math.cos(rotZ) - y2 * Math.sin(rotZ);
        let y3 = x1 * Math.sin(rotZ) + y2 * Math.cos(rotZ);

        // Perspective projection
        const scale = fov / (fov + z2 + radius * 1.5);
        const px = cx + x3 * scale;
        const py = cy + y3 * scale;
        const depthAlpha = Math.max(0.12, Math.min(1, (z2 + radius) / (radius * 2)));

        projectedNodes.push({
          px,
          py,
          scale,
          z: z2,
          depthAlpha,
          radius: n.radius * scale,
          colorType: n.colorType,
          label: n.label
        });
      }

      // Draw 3D Orbit Rings
      const isDark = document.documentElement.classList.contains('dark');
      const ringColor = isDark ? 'rgba(59, 130, 246, ' : 'rgba(37, 99, 235, ';

      // Render Edges
      for (let e = 0; e < edges.length; e++) {
        const { i, j } = edges[e];
        const p1 = projectedNodes[i];
        const p2 = projectedNodes[j];
        const avgAlpha = (p1.depthAlpha + p2.depthAlpha) / 2;

        ctx.beginPath();
        ctx.moveTo(p1.px, p1.py);
        ctx.lineTo(p2.px, p2.py);
        ctx.strokeStyle = `${ringColor}${avgAlpha * (isDark ? 0.35 : 0.25)})`;
        ctx.lineWidth = Math.max(0.6, 1.2 * ((p1.scale + p2.scale) / 2));
        ctx.stroke();
      }

      // Sort nodes by Z for correct depth rendering (painter's algorithm)
      const sortedIndices = projectedNodes
        .map((p, idx) => ({ z: p.z, idx }))
        .sort((a, b) => a.z - b.z);

      for (let k = 0; k < sortedIndices.length; k++) {
        const p = projectedNodes[sortedIndices[k].idx];

        // Glow halo
        const gradient = ctx.createRadialGradient(p.px, p.py, 0, p.px, p.py, p.radius * 3.5);
        gradient.addColorStop(0, `${p.colorType}${Math.floor(p.depthAlpha * 255).toString(16).padStart(2, '0')}`);
        gradient.addColorStop(1, 'transparent');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.px, p.py, p.radius * 3.5, 0, Math.PI * 2);
        ctx.fill();

        // Node core
        ctx.fillStyle = isDark ? '#FFFFFF' : '#1D4ED8';
        ctx.beginPath();
        ctx.arc(p.px, p.py, Math.max(1.5, p.radius * 0.9), 0, Math.PI * 2);
        ctx.fill();

        // Floating labels for key 3D milestones
        if (p.label && p.depthAlpha > 0.6) {
          ctx.font = `bold ${Math.round(9 * p.scale * 1.5)}px 'JetBrains Mono', monospace`;
          ctx.fillStyle = isDark ? `rgba(242, 240, 234, ${p.depthAlpha * 0.9})` : `rgba(27, 27, 25, ${p.depthAlpha * 0.85})`;
          ctx.fillText(p.label, p.px + p.radius * 2, p.py + 3);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className={`relative w-full h-full flex items-center justify-center pointer-events-none ${className}`}>
      <canvas
        ref={canvasRef}
        className="w-full h-full max-w-[620px] max-h-[500px]"
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
}
