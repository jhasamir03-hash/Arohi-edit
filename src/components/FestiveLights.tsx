import React from 'react';

export const FestiveLights: React.FC = () => {
  // 18 hanging fairy light bulbs with varied colors, positions, and twinkle timings
  const bulbs = [
    { x: '4%', y: 18, color: '#FCD34D', delay: '0s', duration: '2.4s', size: 10 },
    { x: '9%', y: 32, color: '#F59E0B', delay: '0.8s', duration: '2.1s', size: 8 },
    { x: '15%', y: 44, color: '#FBBF24', delay: '1.5s', duration: '2.8s', size: 11 },
    { x: '21%', y: 34, color: '#F87171', delay: '0.3s', duration: '2.2s', size: 9 },
    { x: '27%', y: 20, color: '#FCD34D', delay: '1.1s', duration: '2.5s', size: 10 },
    { x: '33%', y: 38, color: '#34D399', delay: '0.6s', duration: '2.9s', size: 8 },
    { x: '40%', y: 48, color: '#FBBF24', delay: '1.8s', duration: '2.3s', size: 11 },
    { x: '46%', y: 35, color: '#F59E0B', delay: '0.2s', duration: '2.6s', size: 9 },
    { x: '53%', y: 22, color: '#FCD34D', delay: '1.4s', duration: '2.2s', size: 10 },
    { x: '59%', y: 38, color: '#F87171', delay: '0.9s', duration: '2.7s', size: 9 },
    { x: '66%', y: 48, color: '#FBBF24', delay: '1.7s', duration: '2.4s', size: 12 },
    { x: '72%', y: 36, color: '#34D399', delay: '0.4s', duration: '2.5s', size: 8 },
    { x: '78%', y: 22, color: '#F59E0B', delay: '1.2s', duration: '2.8s', size: 10 },
    { x: '84%', y: 38, color: '#FCD34D', delay: '0.7s', duration: '2.1s', size: 9 },
    { x: '90%', y: 46, color: '#F87171', delay: '1.6s', duration: '2.6s', size: 11 },
    { x: '96%', y: 25, color: '#FBBF24', delay: '0.5s', duration: '2.3s', size: 10 },
  ];

  // Floating ambient light particles / golden embers
  const floatingOrbs = [
    { top: '25%', left: '12%', size: 'w-24 h-24', delay: '0s', dur: '5s' },
    { top: '45%', left: '82%', size: 'w-32 h-32', delay: '1.5s', dur: '6s' },
    { top: '65%', left: '20%', size: 'w-28 h-28', delay: '2.5s', dur: '5.5s' },
    { top: '30%', left: '70%', size: 'w-20 h-20', delay: '3.2s', dur: '4.8s' },
    { top: '75%', left: '60%', size: 'w-36 h-36', delay: '0.8s', dur: '6.5s' },
  ];

  // Shimmering starburst sparkles
  const sparkles = [
    { top: '20%', left: '25%', delay: '0.2s' },
    { top: '35%', left: '78%', delay: '1.4s' },
    { top: '55%', left: '15%', delay: '2.1s' },
    { top: '70%', left: '85%', delay: '0.9s' },
    { top: '40%', left: '32%', delay: '1.8s' },
    { top: '60%', left: '68%', delay: '2.6s' },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-1">
      {/* Decorative Hanging Fairy Light Wire across top */}
      <svg
        className="absolute top-0 inset-x-0 w-full h-16 sm:h-20 opacity-70"
        viewBox="0 0 1200 80"
        preserveAspectRatio="none"
        fill="none"
      >
        <path
          d="M0,10 Q150,55 300,10 Q450,60 600,10 Q750,60 900,10 Q1050,55 1200,10"
          stroke="#C59A45"
          strokeWidth="1.5"
          strokeDasharray="4 2"
          opacity="0.6"
        />
        <path
          d="M0,20 Q120,65 250,20 Q380,70 510,20 Q640,70 770,20 Q900,70 1030,20 Q1120,65 1200,20"
          stroke="#D4AF37"
          strokeWidth="1"
          opacity="0.4"
        />
      </svg>

      {/* Hanging Glowing Fairy Light Bulbs */}
      <div className="absolute top-0 inset-x-0 h-20">
        {bulbs.map((bulb, i) => (
          <div
            key={i}
            className="absolute transform -translate-x-1/2 flex flex-col items-center"
            style={{ left: bulb.x, top: `${bulb.y}px` }}
          >
            {/* Tiny wire drop */}
            <div className="w-[1px] h-2 bg-[#D4AF37]/50" />
            {/* Bulb cap */}
            <div className="w-1.5 h-1 bg-[#8C6D2B] rounded-xs" />
            {/* Twinkling bulb with halo glow */}
            <div
              className="rounded-full shadow-lg transition-transform"
              style={{
                width: `${bulb.size}px`,
                height: `${bulb.size * 1.3}px`,
                backgroundColor: bulb.color,
                boxShadow: `0 0 12px 3px ${bulb.color}, 0 0 24px 6px ${bulb.color}80`,
                animation: `twinkle ${bulb.duration} ease-in-out infinite`,
                animationDelay: bulb.delay,
              }}
            />
          </div>
        ))}
      </div>

      {/* Floating Warm Golden Festive Bokeh Orbs */}
      {floatingOrbs.map((orb, i) => (
        <div
          key={i}
          className={`absolute rounded-full filter blur-2xl opacity-20 mix-blend-screen ${orb.size}`}
          style={{
            top: orb.top,
            left: orb.left,
            background: 'radial-gradient(circle, #FBBF24 0%, #D97706 60%, transparent 80%)',
            animation: `float-festive ${orb.dur} ease-in-out infinite alternate`,
            animationDelay: orb.delay,
          }}
        />
      ))}

      {/* Twinkling Golden Starbursts */}
      {sparkles.map((sp, i) => (
        <div
          key={i}
          className="absolute text-[#FCD34D] text-xs sm:text-sm font-serif select-none"
          style={{
            top: sp.top,
            left: sp.left,
            animation: 'sparkle-pulse 2.8s ease-in-out infinite',
            animationDelay: sp.delay,
            textShadow: '0 0 8px #FCD34D',
          }}
        >
          ✦
        </div>
      ))}

      {/* Custom Keyframe Styles */}
      <style>{`
        @keyframes twinkle {
          0%, 100% {
            opacity: 0.35;
            transform: scale(0.85);
            filter: brightness(0.9);
          }
          50% {
            opacity: 1;
            transform: scale(1.15);
            filter: brightness(1.4);
          }
        }

        @keyframes float-festive {
          0% {
            transform: translate(0, 0) scale(0.9);
            opacity: 0.15;
          }
          50% {
            opacity: 0.35;
          }
          100% {
            transform: translate(12px, -18px) scale(1.15);
            opacity: 0.25;
          }
        }

        @keyframes sparkle-pulse {
          0%, 100% {
            opacity: 0.1;
            transform: scale(0.6) rotate(0deg);
          }
          50% {
            opacity: 0.95;
            transform: scale(1.3) rotate(45deg);
          }
        }
      `}</style>
    </div>
  );
};
