import { interpolate, spring, random } from "remotion";
import { useVideoConfig } from "remotion";
import { VIDEO_FPS } from "../../types/constants";

// Define color constants for easy adjustment
const DAWN_SKY_TOP = { r: 0, g: 0, b: 100 };
const DAWN_SKY_BOTTOM = { r: 128, g: 100, b: 100 };
const NOON_SKY_TOP = { r: 135, g: 206, b: 235 };
const NOON_SKY_BOTTOM = { r: 0, g: 206, b: 209 };

const DAWN_MOUNTAIN_1 = { r: 50, g: 0, b: 50 };
const DAWN_MOUNTAIN_2 = { r: 70, g: 10, b: 70 };
const DAWN_MOUNTAIN_3 = { r: 90, g: 20, b: 90 };
const NOON_MOUNTAIN_1 = { r: 60, g: 179, b: 113 };
const NOON_MOUNTAIN_2 = { r: 80, g: 200, b: 120 };
const NOON_MOUNTAIN_3 = { r: 100, g: 220, b: 130 };

const DAWN_SUN = { r: 255, g: 50, b: 0 }; // More red sun at dawn
const NOON_SUN = { r: 255, g: 215, b: 0 }; // Yellow sun at noon

const STAR_COUNT = 100; // Number of stars to render
const CLOUD_COUNT = 10; // Increased number of clouds

export const DawnToNoonBackground: React.FC<{ frame: number }> = ({ frame }) => {
  const { width, height } = useVideoConfig();

  const sunProgress = spring({
    frame: frame * 0.25, // Slowed down the animation
    fps: VIDEO_FPS,
    config: {
      damping: 30,
      stiffness: 50,
      mass: 1,
    },
  });

  const sunY = interpolate(sunProgress, [0, 1], [height, height * 0.2]);

  // Interpolate sky colors based on sun position
  const [skyTopR, skyTopG, skyTopB] = [
    interpolate(sunProgress, [0, 1], [DAWN_SKY_TOP.r, NOON_SKY_TOP.r]),
    interpolate(sunProgress, [0, 1], [DAWN_SKY_TOP.g, NOON_SKY_TOP.g]),
    interpolate(sunProgress, [0, 1], [DAWN_SKY_TOP.b, NOON_SKY_TOP.b]),
  ];

  const [skyBottomR, skyBottomG, skyBottomB] = [
    interpolate(sunProgress, [0, 1], [DAWN_SKY_BOTTOM.r, NOON_SKY_BOTTOM.r]),
    interpolate(sunProgress, [0, 1], [DAWN_SKY_BOTTOM.g, NOON_SKY_BOTTOM.g]),
    interpolate(sunProgress, [0, 1], [DAWN_SKY_BOTTOM.b, NOON_SKY_BOTTOM.b]),
  ];

  // Interpolate mountain colors based on sun position
  const [mountain1R, mountain1G, mountain1B] = [
    interpolate(sunProgress, [0, 1], [DAWN_MOUNTAIN_1.r, NOON_MOUNTAIN_1.r]),
    interpolate(sunProgress, [0, 1], [DAWN_MOUNTAIN_1.g, NOON_MOUNTAIN_1.g]),
    interpolate(sunProgress, [0, 1], [DAWN_MOUNTAIN_1.b, NOON_MOUNTAIN_1.b]),
  ];

  const [mountain2R, mountain2G, mountain2B] = [
    interpolate(sunProgress, [0, 1], [DAWN_MOUNTAIN_2.r, NOON_MOUNTAIN_2.r]),
    interpolate(sunProgress, [0, 1], [DAWN_MOUNTAIN_2.g, NOON_MOUNTAIN_2.g]),
    interpolate(sunProgress, [0, 1], [DAWN_MOUNTAIN_2.b, NOON_MOUNTAIN_2.b]),
  ];

  const [mountain3R, mountain3G, mountain3B] = [
    interpolate(sunProgress, [0, 1], [DAWN_MOUNTAIN_3.r, NOON_MOUNTAIN_3.r]),
    interpolate(sunProgress, [0, 1], [DAWN_MOUNTAIN_3.g, NOON_MOUNTAIN_3.g]),
    interpolate(sunProgress, [0, 1], [DAWN_MOUNTAIN_3.b, NOON_MOUNTAIN_3.b]),
  ];

  // Interpolate sun colors based on sun position
  const [sunR, sunG, sunB] = [
    interpolate(sunProgress, [0, 1], [DAWN_SUN.r, NOON_SUN.r]),
    interpolate(sunProgress, [0, 1], [DAWN_SUN.g, NOON_SUN.g]),
    interpolate(sunProgress, [0, 1], [DAWN_SUN.b, NOON_SUN.b]),
  ];

  // Generate stars
  const stars = new Array(STAR_COUNT).fill(0).map((_, i) => ({
    x: random(`star-${i}-x`) * width,
    y: random(`star-${i}-y`) * height * 0.6, // Stars only in the top 60% of the sky
    size: random(`star-${i}-size`) * 2 + 1,
    opacity: interpolate(sunProgress, [0, 0.3], [1, 0]), // Stars fade out as dawn progresses
  }));

  // Generate clouds with slower animation, starting from off-screen
  const clouds = new Array(CLOUD_COUNT).fill(0).map((_, i) => {
    const baseX = (i - CLOUD_COUNT / 2) * (width / CLOUD_COUNT) - width * 0.5; // Start clouds from further off-screen left
    const cloudMovement = interpolate(frame, [0, 1200], [0, width * 1.5]); // Move clouds 150% of screen width over 1200 frames (slower animation)
    return {
      x: baseX + cloudMovement,
      y: (0.2 * random(`cloud-${i}-y`) + 0.2) * height,
      scale: random(`cloud-${i}-scale`) * 0.5 + 0.5,
      opacity: interpolate(sunProgress, [0, 0.5], [0.2, 0.8]),
    };
  });

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <defs>
        <linearGradient id="skyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop
            offset="0%"
            stopColor={`rgb(${skyTopR}, ${skyTopG}, ${skyTopB})`}
          />
          <stop
            offset="100%"
            stopColor={`rgb(${skyBottomR}, ${skyBottomG}, ${skyBottomB})`}
          />
        </linearGradient>
        <linearGradient
          id="mountainGradient1"
          x1="0%"
          y1="0%"
          x2="0%"
          y2="100%"
        >
          <stop
            offset="0%"
            stopColor={`rgb(${mountain1R}, ${mountain1G}, ${mountain1B})`}
          />
          <stop
            offset="100%"
            stopColor={`rgb(${mountain1R * 0.8}, ${mountain1G * 0.8}, ${mountain1B * 0.8})`}
          />
        </linearGradient>
        <linearGradient
          id="mountainGradient2"
          x1="0%"
          y1="0%"
          x2="0%"
          y2="100%"
        >
          <stop
            offset="0%"
            stopColor={`rgb(${mountain2R}, ${mountain2G}, ${mountain2B})`}
          />
          <stop
            offset="100%"
            stopColor={`rgb(${mountain2R * 0.8}, ${mountain2G * 0.8}, ${mountain2B * 0.8})`}
          />
        </linearGradient>
        <linearGradient
          id="mountainGradient3"
          x1="0%"
          y1="0%"
          x2="0%"
          y2="100%"
        >
          <stop
            offset="0%"
            stopColor={`rgb(${mountain3R}, ${mountain3G}, ${mountain3B})`}
          />
          <stop
            offset="100%"
            stopColor={`rgb(${mountain3R * 0.8}, ${mountain3G * 0.8}, ${mountain3B * 0.8})`}
          />
        </linearGradient>
      </defs>
      <rect width={width} height={height} fill="url(#skyGradient)" />
      {stars.map((star, index) => (
        <circle
          key={`star-${index}`}
          cx={star.x}
          cy={star.y}
          r={star.size}
          fill="white"
          opacity={star.opacity}
        />
      ))}
      <circle
        cx={width / 2}
        cy={sunY}
        r={70}
        fill={`rgb(${sunR}, ${sunG}, ${sunB})`}
      />
      {clouds.map((cloud, index) => (
        <g
          key={`cloud-${index}`}
          transform={`translate(${cloud.x}, ${cloud.y}) scale(${cloud.scale})`}
          opacity={cloud.opacity}
        >
          <path
            d="M25,60 a20,20 0 0,1 0,-40 h50 a20,20 0 0,1 0,40 z"
            fill="white"
          />
        </g>
      ))}
      <path
        d={`M0,${height} C${width * 0.2},${height * 0.7} ${width * 0.4},${height * 0.8} ${width * 0.5},${height}`}
        fill="url(#mountainGradient1)"
      />
      <path
        d={`M${width * 0.3},${height} C${width * 0.5},${height * 0.75} ${width * 0.7},${height * 0.85} ${width * 0.8},${height}`}
        fill="url(#mountainGradient2)"
      />
      <path
        d={`M${width * 0.6},${height} C${width * 0.8},${height * 0.8} ${width * 0.9},${height * 0.9} ${width},${height}`}
        fill="url(#mountainGradient3)"
      />
    </svg>
  );
};
