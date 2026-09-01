import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';

const SignInAnimation = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onComplete) onComplete();
    }, 4000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  const rings = [340, 290, 240, 190, 140, 90, 42];

  const styles = `
    @keyframes outerRotate {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }

    @keyframes morph {
      0% { border-radius: 50%; }
      33% { border-radius: 30%; }
      66% { border-radius: 10% 40% 10% 40%; }
      100% { border-radius: 40% 10% 40% 10%; }
    }

    @keyframes ringSpin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }

    @keyframes orbPulse {
      0% { 
        transform: scale(1);
        box-shadow: 0 0 12px 3px rgba(212, 167, 44, 0.6), 0 0 24px 6px rgba(184, 137, 22, 0.4);
      }
      100% { 
        transform: scale(1.4);
        box-shadow: 0 0 20px 6px rgba(212, 167, 44, 0.9), 0 0 40px 14px rgba(184, 137, 22, 0.6);
      }
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
      background: rgba(12, 13, 15, 0.97);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      z-index: 9999;
      overflow: hidden;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    }

    .wrapper {
      position: relative;
      width: 400px;
      height: 400px;
      display: flex;
      align-items: center;
      justify-content: center;
      animation: outerRotate 6s linear infinite;
    }

    .ring {
      position: absolute;
      border: 2.5px solid transparent;
      box-sizing: border-box;
      animation: morph 2.2s ease-in-out alternate infinite;
    }

    .ring-inner-spin {
      width: 100%;
      height: 100%;
      border-radius: inherit;
      animation: ringSpin linear infinite;
    }

    .orb {
      position: absolute;
      width: 20px;
      height: 20px;
      background: radial-gradient(circle, #ffffff, #fce4a6, #d4a72c);
      border-radius: 50%;
      z-index: 100;
      animation: orbPulse 1.4s ease-in-out alternate infinite;
    }

    .label-container {
      margin-top: 36px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
    }

    .spinner {
      width: 18px;
      height: 18px;
      border: 2px solid rgba(212, 167, 44, 0.2);
      border-top-color: #d4a72c;
      border-radius: 50%;
      animation: labelSpinner 0.8s linear infinite;
    }

    .signing-text {
      color: #f2f0ea;
      font-size: 13px;
      font-weight: 600;
      letter-spacing: 0.04em;
    }
  `;

  return createPortal(
    <div className="animation-overlay">
      <style>{styles}</style>

      <div className="wrapper">
        {rings.map((size, i) => {
          const rotationOffset = i * 51;
          const delay = i * 0.18;
          const spinDuration = 3 + i * 0.5;

          return (
            <div
              key={i}
              className="ring"
              style={{
                width: size,
                height: size,
                animationDelay: `${delay}s`,
                animationDuration: `2.2s, ${spinDuration}s`,
                animationName: 'morph, ringSpin',
                backgroundImage: `linear-gradient(rgba(12, 13, 15, 0.97), rgba(12, 13, 15, 0.97)), conic-gradient(from ${rotationOffset}deg, #9a6b00, #fce4a6, #d4a72c, #b88916, #9a6b00)`,
                backgroundOrigin: 'border-box',
                backgroundClip: 'content-box, border-box',
                boxShadow: `0 0 14px 2px rgba(212, 167, 44, ${0.4 - i * 0.04})`,
              }}
            />
          );
        })}

        <div className="orb" />
      </div>

      <div className="label-container">
        <div className="spinner" />
        <span className="signing-text">Authenticating session…</span>
      </div>
    </div>,
    document.body
  );
};

export default SignInAnimation;
