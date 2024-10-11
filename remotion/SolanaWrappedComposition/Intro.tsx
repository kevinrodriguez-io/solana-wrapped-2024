import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  spring,
} from "remotion";

export const Intro = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  const sunProgress = spring({
    frame: frame * 0.5,
    fps: 60,
    config: {
      damping: 20,
      stiffness: 100,
      mass: 1,
    },
  });

  const sunY = interpolate(sunProgress, [0, 1], [height, height * 0.2]);

  // Interpolate sky colors based on sun position
  const skyTopR = interpolate(sunProgress, [0, 1], [173, 135]);
  const skyTopG = interpolate(sunProgress, [0, 1], [216, 206]);
  const skyTopB = interpolate(sunProgress, [0, 1], [230, 235]);

  const skyBottomR = interpolate(sunProgress, [0, 1], [0, 0]);
  const skyBottomG = interpolate(sunProgress, [0, 1], [206, 206]);
  const skyBottomB = interpolate(sunProgress, [0, 1], [209, 209]);

  // Interpolate mountain colors based on sun position
  const mountainR = interpolate(sunProgress, [0, 1], [32, 60]);
  const mountainG = interpolate(sunProgress, [0, 1], [178, 179]);
  const mountainB = interpolate(sunProgress, [0, 1], [170, 113]);

  const titleOpacity = spring({
    frame: frame - 60,
    fps: 60,
    config: { mass: 0.5, damping: 15 },
  });

  const yearOpacity = spring({
    frame: frame - 90,
    fps: 60,
    config: { mass: 0.5, damping: 15 },
  });

  // Cloud animations with varied speeds
  const cloudProgress1 = interpolate(frame, [0, 200], [0, 1.5], {
    extrapolateRight: "clamp",
  });
  const cloudProgress2 = interpolate(frame, [0, 220], [0, 1.5], {
    extrapolateRight: "clamp",
  });
  const cloudProgress3 = interpolate(frame, [0, 180], [0, 1.5], {
    extrapolateRight: "clamp",
  });
  const cloudProgress4 = interpolate(frame, [0, 190], [0, 1.5], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill className="flex flex-col items-center justify-center text-white">
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
              stopColor={`rgb(${mountainR}, ${mountainG}, ${mountainB})`}
            />
            <stop
              offset="100%"
              stopColor={`rgb(${mountainR * 0.8}, ${mountainG * 0.8}, ${mountainB * 0.8})`}
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
              stopColor={`rgb(${mountainR * 1.1}, ${mountainG * 1.1}, ${mountainB * 1.1})`}
            />
            <stop
              offset="100%"
              stopColor={`rgb(${mountainR * 0.9}, ${mountainG * 0.9}, ${mountainB * 0.9})`}
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
              stopColor={`rgb(${mountainR * 1.2}, ${mountainG * 1.2}, ${mountainB * 1.2})`}
            />
            <stop
              offset="100%"
              stopColor={`rgb(${mountainR}, ${mountainG}, ${mountainB})`}
            />
          </linearGradient>
        </defs>
        <rect width={width} height={height} fill="url(#skyGradient)" />
        <circle cx={width / 2} cy={sunY} r={70} fill="#FFD700" />
        <g
          transform={`translate(${interpolate(cloudProgress1, [0, 1], [-width * 0.6, width * 0.3])}, ${height * 0.2}) scale(1)`}
        >
          <circle cx={0} cy={0} r={25} fill="white" />
          <circle cx={25} cy={-10} r={20} fill="white" />
          <circle cx={50} cy={0} r={25} fill="white" />
          <circle cx={25} cy={10} r={20} fill="white" />
        </g>
        <g
          transform={`translate(${interpolate(cloudProgress2, [0, 1], [-width * 0.4, width * 0.5])}, ${height * 0.15}) scale(1.2)`}
        >
          <circle cx={0} cy={0} r={30} fill="white" />
          <circle cx={30} cy={-15} r={25} fill="white" />
          <circle cx={60} cy={0} r={30} fill="white" />
          <circle cx={30} cy={15} r={25} fill="white" />
        </g>
        <g
          transform={`translate(${interpolate(cloudProgress3, [0, 1], [-width * 0.2, width * 0.7])}, ${height * 0.25}) scale(0.8)`}
        >
          <circle cx={0} cy={0} r={20} fill="white" />
          <circle cx={20} cy={-8} r={15} fill="white" />
          <circle cx={40} cy={0} r={20} fill="white" />
          <circle cx={20} cy={8} r={15} fill="white" />
        </g>
        <g
          transform={`translate(${interpolate(cloudProgress4, [0, 1], [0, width * 0.9])}, ${height * 0.1}) scale(1.1)`}
        >
          <circle cx={0} cy={0} r={28} fill="white" />
          <circle cx={28} cy={-12} r={22} fill="white" />
          <circle cx={56} cy={0} r={28} fill="white" />
          <circle cx={28} cy={12} r={22} fill="white" />
        </g>
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

      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <h1
          className="text-6xl font-bold mb-4"
          style={{
            opacity: titleOpacity,
            transform: `translateY(${interpolate(titleOpacity, [0, 1], [20, 0])}px)`,
          }}
        >
          Your Solana Year
        </h1>
        <p
          className="text-8xl font-extrabold"
          style={{
            opacity: yearOpacity,
            transform: `scale(${interpolate(yearOpacity, [0, 1], [0.5, 1])})`,
          }}
        >
          Wrapped
        </p>
      </div>
    </AbsoluteFill>
  );
};
