'use client';

import { useEffect } from 'react';

export default function ContextMediaLoader() {
    useEffect(() => {
        // Create particles
        const particlesContainer = document.querySelector('.particles');
        if (particlesContainer) {
            for (let i = 0; i < 30; i++) {
                createParticle(particlesContainer);
            }
        }
    }, []);

    function createParticle(container: Element) {
        const particle = document.createElement('div');
        particle.classList.add('particle');

        // Random position
        const posX = Math.random() * 300;
        const posY = Math.random() * 300;

        // Random size
        const size = Math.random() * 4 + 2;

        // Random animation delay
        const delay = Math.random() * 3;

        // Random color variation
        const colors = ['rgba(59, 130, 246, 0.8)', 'rgba(16, 185, 129, 0.8)', 'rgba(249, 115, 22, 0.8)'];
        const color = colors[Math.floor(Math.random() * colors.length)];

        particle.style.left = `${posX}px`;
        particle.style.top = `${posY}px`;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.background = color;
        particle.style.animationDelay = `${delay}s`;

        container.appendChild(particle);
    }

    return (
        <div className="loader-container">
            <div className="gradient-bg"></div>
            <div className="particles"></div>

            <div className="ring ring1"></div>
            <div className="ring ring2"></div>
            <div className="ring ring3"></div>

            <div className="cube cube1">
                <div className="cube-face front"></div>
                <div className="cube-face back"></div>
                <div className="cube-face right"></div>
                <div className="cube-face left"></div>
                <div className="cube-face top"></div>
                <div className="cube-face bottom"></div>
            </div>

            <div className="cube cube2">
                <div className="cube-face front"></div>
                <div className="cube-face back"></div>
                <div className="cube-face right"></div>
                <div className="cube-face left"></div>
                <div className="cube-face top"></div>
                <div className="cube-face bottom"></div>
            </div>

            <div className="logo-container">
                <div className="logo">
                    <span className="context">Context</span><span className="media">Media</span>
                </div>

                <div className="progress-container">
                    <div className="progress-bar"></div>
                </div>

                <div className="tagline">Delivering context in every frame</div>
            </div>

            <style jsx>{`
        .loader-container {
          position: relative;
          width: 300px;
          height: 300px;
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 0 auto;
        }
        
        .gradient-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle, rgba(15,23,42,1) 0%, rgba(0,0,0,1) 100%);
          z-index: -1;
        }
        
        .particles {
          position: absolute;
          width: 100%;
          height: 100%;
        }
        
        .particle {
          position: absolute;
          background: white;
          border-radius: 50%;
          opacity: 0;
          animation: float 3s infinite ease-in-out;
        }
        
        @keyframes float {
          0% { transform: translateY(0) scale(0); opacity: 0; }
          50% { opacity: 0.7; }
          100% { transform: translateY(-100px) scale(0); opacity: 0; }
        }
        
        .logo-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          transform-style: preserve-3d;
          perspective: 1000px;
        }
        
        .logo {
          font-size: 36px;
          font-weight: 700;
          color: white;
          position: relative;
          margin-bottom: 20px;
          text-shadow: 0 0 10px rgba(59,130,246,0.5);
        }
        
        .context {
          background: linear-gradient(90deg, #3b82f6, #06b6d4);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          transform: translateZ(10px);
          animation: pulse 3s ease-in-out infinite;
        }
        
        .media {
          background: linear-gradient(90deg, #10b981, #84cc16);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          margin-left: 8px;
          transform: translateZ(20px);
          animation: pulse 3s ease-in-out infinite 0.5s;
        }
        
        @keyframes pulse {
          0%, 100% { filter: brightness(1); }
          50% { filter: brightness(1.3); }
        }
        
        .ring {
          position: absolute;
          border-radius: 50%;
          border: 2px solid transparent;
        }
        
        .ring1 {
          width: 200px;
          height: 200px;
          border-top: 4px solid #3b82f6;
          border-right: 4px solid transparent;
          animation: spin 2s linear infinite;
        }
        
        .ring2 {
          width: 240px;
          height: 240px;
          border-right: 4px solid #10b981;
          border-left: 4px solid transparent;
          animation: spin 3s linear infinite reverse;
        }
        
        .ring3 {
          width: 280px;
          height: 280px;
          border-bottom: 4px solid #f97316;
          animation: spin 4s linear infinite;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        .progress-container {
          width: 220px;
          height: 6px;
          background: rgba(255,255,255,0.1);
          border-radius: 3px;
          overflow: hidden;
          position: relative;
        }
        
        .progress-bar {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          width: 0%;
          background: linear-gradient(90deg, #3b82f6, #10b981);
          animation: progress 3s ease-in-out infinite;
          border-radius: 3px;
          box-shadow: 0 0 10px rgba(59,130,246,0.7);
        }
        
        @keyframes progress {
          0% { width: 0%; }
          50% { width: 100%; }
          50.1% { width: 100%; }
          100% { width: 0%; }
        }
        
        .tagline {
          color: rgba(255, 255, 255, 0.6);
          font-size: 14px;
          margin-top: 20px;
          opacity: 0;
          animation: fadeIn 0.5s ease-out forwards 1s;
        }
        
        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        .cube {
          position: absolute;
          width: 20px;
          height: 20px;
          transform-style: preserve-3d;
          animation: rotateCube 4s infinite linear;
        }
        
        .cube1 { top: 50px; left: 50px; }
        .cube2 { bottom: 50px; right: 50px; }
        
        .cube-face {
          position: absolute;
          width: 100%;
          height: 100%;
          opacity: 0.7;
        }
        
        .front { transform: translateZ(10px); background: rgba(59, 130, 246, 0.5); }
        .back { transform: rotateY(180deg) translateZ(10px); background: rgba(16, 185, 129, 0.5); }
        .right { transform: rotateY(90deg) translateZ(10px); background: rgba(249, 115, 22, 0.5); }
        .left { transform: rotateY(-90deg) translateZ(10px); background: rgba(139, 92, 246, 0.5); }
        .top { transform: rotateX(90deg) translateZ(10px); background: rgba(236, 72, 153, 0.5); }
        .bottom { transform: rotateX(-90deg) translateZ(10px); background: rgba(14, 165, 233, 0.5); }
        
        @keyframes rotateCube {
          0% { transform: rotateX(0deg) rotateY(0deg); }
          100% { transform: rotateX(360deg) rotateY(360deg); }
        }
      `}</style>
        </div>
    );
}