import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';

const SignInAnimation = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onComplete) onComplete();
    }, 3800);
    return () => clearTimeout(timer);
  }, [onComplete]);

  const rings = [340, 290, 240, 190, 140, 90, 48];

  const styles = `
    @keyframes gyroX {
      0% { transform: rotateX(60deg) rotateY(0deg) rotateZ(0deg); }
      50% { transform: rotateX(75deg) rotateY(180deg) rotateZ(45deg); }
      100% { transform: rotateX(60deg) rotateY(360deg) rotateZ(0deg); }
    }

    @keyframes gyroY {
      0% { transform: rotateX(25deg) rotateY(0deg) rotateZ(45deg); }
      50% { transform: rotateX(45deg) rotateY(180deg) rotateZ(135deg); }
      100% { transform: rotateX(25deg) rotateY(360deg) rotateZ(45deg); }
    }

    @keyframes gyroZ {
      0% { transform: rotateX(0deg) rotateY(60deg) rotateZ(0deg); }
      50% { transform: rotateX(45deg) rotateY(45deg) rotateZ(180deg); }
      100% { transform: rotateX(0deg) rotateY(60deg) rotateZ(360deg); }
    }

    @keyframes corePulse3D {
      0% { 
        transform: scale3d(1, 1, 1);
        box-shadow: 0 0 16px 4px rgba(59, 130, 246, 0.8), 0 0 32px 8px rgba(37, 99, 235, 0.5);
      }
      100% { 
        transform: scale3d(1.35, 1.35, 1.35);
        box-shadow: 0 0 28px 8px rgba(96, 165, 250, 1), 0 0 60px 18px rgba(37, 99, 235, 0.8);
      }
    }

    @keyframes particleOrbit {
      from { transform: rotate(0deg) translateX(130px) rotate(0deg); }
      to { transform: rotate(360deg) translateX(130px) rotate(-360deg); }
    }

    @keyframes labelSpinner {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }

    .animation-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(12, 13, 15, 0.98);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      z-index: 9999;
      overflow: hidden;
      perspective: 1200px;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    }

    .gyro-container {
      position: relative;
      width: 380px;
      height: 380px;
      display: flex;
      align-items: center;
      justify-content: center;
      transform-style: preserve-3d;
    }

    .ring-3d {
      position: absolute;
      border: 2px solid transparent;
      border-radius: 50%;
      box-sizing: border-box;
      transform-style: preserve-3d;
    }

    .ring-3d-1 {
      animation: gyroX 7s ease-in-out infinite;
    }

    .ring-3d-2 {
      animation: gyroY 9s ease-in-out infinite reverse;
    }

    .ring-3d-3 {
      animation: gyroZ 8s ease-in-out infinite;
    }

    .orb-core {
      position: absolute;
      width: 24px;
      height: 24px;
      background: radial-gradient(circle, #ffffff 10%, #93c5fd 50%, #2563eb 100%);
      border-radius: 50%;
      z-index: 100;
      animation: corePulse3D 1.5s ease-in-out alternate infinite;
    }

    .particle {
      position: absolute;
      width: 6px;
      height: 6px;
      background: #60a5fa;
      border-radius: 50%;
      box-shadow: 0 0 10px #60a5fa;
      animation: particleOrbit 4s linear infinite;
    }

    .label-container {
      margin-top: 40px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
      z-index: 20;
    }

    .spinner {
      width: 18px;
      height: 18px;
      border: 2px solid rgba(59, 130, 246, 0.25);
      border-top-color: #3b82f6;
      border-radius: 50%;
      animation: labelSpinner 0.8s linear infinite;
    }

    .signing-text {
      color: #f2f0ea;
      font-size: 13px;
      font-weight: 600;
      letter-spacing: 0.05em;
    }

    .signing-subtext {
      color: #7e7c77;
      font-size: 11px;
      font-family: 'JetBrains Mono', monospace;
    }
  `;

  return createPortal(
    <div className="animation-overlay">
      <style>{styles}</style>

      <div className="gyro-container">
        {rings.map((size, i) => {
          const rotationOffset = i * 45;
          const gyroClass = i % 3 === 0 ? 'ring-3d-1' : i % 2 === 0 ? 'ring-3d-2' : 'ring-3d-3';

          return (
            <div
              key={i}
              className={`ring-3d ${gyroClass}`}
              style={{
                width: size,
                height: size,
                backgroundImage: `linear-gradient(rgba(12, 13, 15, 0.97), rgba(12, 13, 15, 0.97)), conic-gradient(from ${rotationOffset}deg, #1d4ed8, #93c5fd, #3b82f6, #2563eb, #1d4ed8)`,
                backgroundOrigin: 'border-box',
                backgroundClip: 'content-box, border-box',
                boxShadow: `0 0 16px 2px rgba(59, 130, 246, ${0.45 - i * 0.04})`,
              }}
            />
          );
        })}

        {/* 3D Orbit Particles */}
        <div className="particle" style={{ animationDelay: '0s' }} />
        <div className="particle" style={{ animationDelay: '-1.3s', transformOrigin: '-60px' }} />
        <div className="particle" style={{ animationDelay: '-2.6s', transformOrigin: '80px' }} />

        {/* Pulsing Core */}
        <div className="orb-core" />
      </div>

      <div className="label-container">
        <div className="spinner" />
        <span className="signing-text">Authenticating session…</span>
        <span className="signing-subtext">Initializing Kahn Topological Engine</span>
      </div>
    </div>,
    document.body
  );
};

export default SignInAnimation;
