import {
  AbsoluteFill,
  Sequence,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  spring,
} from "remotion";
import { CompositionProps, VIDEO_FPS } from "../../types/constants";
import * as Poppins from "@remotion/google-fonts/Poppins";
import React from "react";
import { z } from "zod";

Poppins.loadFont();

const sectionDuration = 10 * VIDEO_FPS; // 10 seconds per section
const introDuration = 6 * VIDEO_FPS; // 6 seconds for intro

const Background: React.FC<{ frame: number }> = ({ frame }) => {
  const { width, height } = useVideoConfig();

  const sunProgress = spring({
    frame: frame * 0.5,
    fps: VIDEO_FPS,
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
        <linearGradient id="mountainGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop
            offset="0%"
            stopColor={`rgb(${mountainR}, ${mountainG}, ${mountainB})`}
          />
          <stop
            offset="100%"
            stopColor={`rgb(${mountainR * 0.8}, ${mountainG * 0.8}, ${mountainB * 0.8})`}
          />
        </linearGradient>
      </defs>
      <rect width={width} height={height} fill="url(#skyGradient)" />
      <circle cx={width / 2} cy={sunY} r={70} fill="#FFD700" />
      <path
        d={`M0,${height} C${width * 0.2},${height * 0.7} ${width * 0.4},${height * 0.8} ${width * 0.5},${height}`}
        fill="url(#mountainGradient)"
      />
      <path
        d={`M${width * 0.3},${height} C${width * 0.5},${height * 0.75} ${width * 0.7},${height * 0.85} ${width * 0.8},${height}`}
        fill="url(#mountainGradient)"
      />
      <path
        d={`M${width * 0.6},${height} C${width * 0.8},${height * 0.8} ${width * 0.9},${height * 0.9} ${width},${height}`}
        fill="url(#mountainGradient)"
      />
    </svg>
  );
};

const AnimatedText: React.FC<{ text: string; className?: string }> = ({
  text,
  className,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const characters = text.split("");

  return (
    <div className={`${className} font-extrabold`}>
      {characters.map((char, index) => {
        const delay = index * 3;
        const opacity = interpolate(
          frame - delay,
          [0, 15, 30, fps * 10],
          [0, 1, 1, 1],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
        );
        const y = interpolate(frame - delay, [0, 15], [50, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const scale = interpolate(frame - delay, [0, 15], [0.5, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });

        return (
          <span
            key={index}
            style={{
              opacity,
              transform: `translateY(${y}px) scale(${scale})`,
              display: "inline-block",
            }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        );
      })}
    </div>
  );
};

const Intro: React.FC = () => {
  const frame = useCurrentFrame();

  const titleOpacity = spring({
    frame: frame - 60,
    fps: VIDEO_FPS,
    config: { mass: 0.5, damping: 15 },
  });

  const yearOpacity = spring({
    frame: frame - 90,
    fps: VIDEO_FPS,
    config: { mass: 0.5, damping: 15 },
  });

  return (
    <AbsoluteFill className="flex flex-col items-center justify-center text-white">
      <Background frame={frame} />

      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <h1
          className="text-7xl font-extrabold mb-4"
          style={{
            opacity: titleOpacity,
            transform: `translateY(${interpolate(titleOpacity, [0, 1], [20, 0])}px)`,
          }}
        >
          Your Solana Year
        </h1>
        <p
          className="text-9xl font-black"
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

const Summary: React.FC<{
  totalTransactions: number;
  walletOverview: number;
  totalSolSpent: number;
}> = ({ totalTransactions, walletOverview, totalSolSpent }) => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill className="flex flex-col items-center justify-center text-white">
      <Background frame={frame} />

      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <AnimatedText text="Summary" className="text-6xl font-black mb-8" />
        <div className="bg-white/20 rounded-lg p-6 backdrop-blur-sm">
          <AnimatedText
            text={`Total Transactions: ${totalTransactions}`}
            className="text-3xl mb-4"
          />
          <AnimatedText
            text={`Wallet Overview: $${walletOverview}`}
            className="text-3xl mb-4"
          />
          <AnimatedText
            text={`Total SOL Spent on Fees: ${totalSolSpent} SOL`}
            className="text-3xl"
          />
        </div>
      </div>
    </AbsoluteFill>
  );
};

const NFTHighlights: React.FC<{
  mostInteractedNFTs: string;
  mostValuableNFT: string;
}> = ({ mostInteractedNFTs, mostValuableNFT }) => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill className="flex flex-col items-center justify-center text-white">
      <Background frame={frame} />

      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <AnimatedText
          text="NFT Highlights"
          className="text-6xl font-black mb-8"
        />
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
            <AnimatedText text="Top Collections:" className="text-2xl" />
            <AnimatedText
              text={mostInteractedNFTs}
              className="text-xl font-bold"
            />
          </div>
          <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
            <AnimatedText text="Most Valuable NFT:" className="text-2xl" />
            <AnimatedText
              text={mostValuableNFT}
              className="text-xl font-bold"
            />
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const TokenActivity: React.FC<{
  mostInteractedTokens: string;
  solPriceChange: string;
}> = ({ mostInteractedTokens, solPriceChange }) => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill className="flex flex-col items-center justify-center text-white">
      <Background frame={frame} />

      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <AnimatedText
          text="Token Activity"
          className="text-6xl font-black mb-8"
        />
        <div className="bg-white/20 rounded-lg p-6 backdrop-blur-sm">
          <AnimatedText
            text="Most Interacted Tokens:"
            className="text-3xl mb-4"
          />
          <AnimatedText
            text={mostInteractedTokens}
            className="text-2xl font-bold"
          />
        </div>
        <div className="mt-6 bg-white/20 rounded-lg p-6 backdrop-blur-sm">
          <AnimatedText
            text="SOL Price Change vs Jan 1st:"
            className="text-3xl"
          />
          <AnimatedText text={solPriceChange} className="text-5xl font-black" />
        </div>
      </div>
    </AbsoluteFill>
  );
};

const DeFiInsights: React.FC<{
  totalSolStaked: number;
  mostInteractedPrograms: string;
}> = ({ totalSolStaked, mostInteractedPrograms }) => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill className="flex flex-col items-center justify-center text-white">
      <Background frame={frame} />

      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <AnimatedText
          text="DeFi Insights"
          className="text-6xl font-black mb-8"
        />
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
            <AnimatedText text="Total SOL Staked:" className="text-2xl" />
            <AnimatedText
              text={`${totalSolStaked} SOL`}
              className="text-4xl font-black"
            />
          </div>
          <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
            <AnimatedText text="Top Programs:" className="text-2xl" />
            <AnimatedText
              text={mostInteractedPrograms}
              className="text-xl font-bold"
            />
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const NewConnections: React.FC<{
  newAddressesInteracted: number;
}> = ({ newAddressesInteracted }) => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill className="flex flex-col items-center justify-center text-white">
      <Background frame={frame} />

      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <AnimatedText
          text="New Connections"
          className="text-6xl font-black mb-8"
        />
        <div className="bg-white/20 rounded-lg p-6 backdrop-blur-sm">
          <AnimatedText text="New Addresses Interacted:" className="text-3xl" />
          <AnimatedText
            text={`${newAddressesInteracted}`}
            className="text-7xl font-black"
          />
        </div>
        <AnimatedText
          text="Your network is growing!"
          className="mt-8 text-2xl font-bold italic"
        />
      </div>
    </AbsoluteFill>
  );
};

export const Main = ({
  totalTransactions,
  walletOverview,
  totalSolSpent,
  mostInteractedTokens,
  mostInteractedNFTs,
  mostInteractedPrograms,
  mostValuableNFT,
  totalSolStaked,
  newAddressesInteracted,
  solPriceChange,
}: z.infer<typeof CompositionProps>) => {
  return (
    <AbsoluteFill className="font-[Poppins]">
      <Sequence durationInFrames={introDuration}>
        <Intro />
      </Sequence>

      <Sequence from={introDuration} durationInFrames={sectionDuration}>
        <Summary
          totalTransactions={totalTransactions}
          walletOverview={walletOverview}
          totalSolSpent={totalSolSpent}
        />
      </Sequence>

      <Sequence
        from={introDuration + sectionDuration}
        durationInFrames={sectionDuration}
      >
        <NFTHighlights
          mostInteractedNFTs={mostInteractedNFTs}
          mostValuableNFT={mostValuableNFT}
        />
      </Sequence>

      <Sequence
        from={introDuration + 2 * sectionDuration}
        durationInFrames={sectionDuration}
      >
        <TokenActivity
          mostInteractedTokens={mostInteractedTokens}
          solPriceChange={solPriceChange}
        />
      </Sequence>

      <Sequence
        from={introDuration + 3 * sectionDuration}
        durationInFrames={sectionDuration}
      >
        <DeFiInsights
          totalSolStaked={totalSolStaked}
          mostInteractedPrograms={mostInteractedPrograms}
        />
      </Sequence>

      <Sequence
        from={introDuration + 4 * sectionDuration}
        durationInFrames={sectionDuration}
      >
        <NewConnections newAddressesInteracted={newAddressesInteracted} />
      </Sequence>
    </AbsoluteFill>
  );
};
