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
import { DawnToNoonBackground } from "./DawnToNoonBackground";

Poppins.loadFont();

const sectionDuration = 10 * VIDEO_FPS; // 10 seconds per section
const introDuration = 6 * VIDEO_FPS; // 6 seconds for intro

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
          [0, fps / 2, fps, fps * 10],
          [0, 1, 1, 1],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
        );
        const y = interpolate(frame - delay, [0, fps / 2], [50, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const scale = interpolate(frame - delay, [0, fps / 2], [0.5, 1], {
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

const ContentWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill className="flex flex-col items-center justify-center text-white">
      <DawnToNoonBackground frame={frame} />
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {children}
      </div>
    </AbsoluteFill>
  );
};

const Intro: React.FC = () => {
  const frame = useCurrentFrame();

  const titleOpacity = spring({
    frame: frame - VIDEO_FPS * 2,
    fps: VIDEO_FPS,
    config: { mass: 0.5, damping: 15 },
  });

  const yearOpacity = spring({
    frame: frame - VIDEO_FPS * 3,
    fps: VIDEO_FPS,
    config: { mass: 0.5, damping: 15 },
  });

  return (
    <ContentWrapper>
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
    </ContentWrapper>
  );
};

const Summary: React.FC<{
  totalTransactions: number;
  walletOverview: number;
  totalSolSpent: number;
}> = ({ totalTransactions, walletOverview, totalSolSpent }) => {
  return (
    <ContentWrapper>
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
    </ContentWrapper>
  );
};

const NFTHighlights: React.FC<{
  mostInteractedNFTs: string;
  mostValuableNFT: string;
}> = ({ mostInteractedNFTs, mostValuableNFT }) => {
  return (
    <ContentWrapper>
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
          <AnimatedText text={mostValuableNFT} className="text-xl font-bold" />
        </div>
      </div>
    </ContentWrapper>
  );
};

const TokenActivity: React.FC<{
  mostInteractedTokens: string;
  solPriceChange: string;
}> = ({ mostInteractedTokens, solPriceChange }) => {
  return (
    <ContentWrapper>
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
    </ContentWrapper>
  );
};

const DeFiInsights: React.FC<{
  totalSolStaked: number;
  mostInteractedPrograms: string;
}> = ({ totalSolStaked, mostInteractedPrograms }) => {
  return (
    <ContentWrapper>
      <AnimatedText text="DeFi Insights" className="text-6xl font-black mb-8" />
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
    </ContentWrapper>
  );
};

const NewConnections: React.FC<{
  newAddressesInteracted: number;
}> = ({ newAddressesInteracted }) => {
  return (
    <ContentWrapper>
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
    </ContentWrapper>
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
