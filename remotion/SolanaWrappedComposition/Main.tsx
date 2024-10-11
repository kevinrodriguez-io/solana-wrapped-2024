import { AbsoluteFill, Sequence, interpolate, useCurrentFrame } from "remotion";
import { CompositionProps, VIDEO_FPS } from "../../types/constants";
import * as Poppins from "@remotion/google-fonts/Poppins";
import React from "react";
import { z } from "zod";
import { Intro } from "./Intro";

Poppins.loadFont();

const sectionDuration = 10 * VIDEO_FPS; // 10 seconds per section
const introDuration = 6 * VIDEO_FPS; // 6 seconds for intro

const Summary: React.FC<{
  totalTransactions: number;
  walletOverview: number;
  totalSolSpent: number;
}> = ({ totalTransactions, walletOverview, totalSolSpent }) => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill className="flex flex-col items-center justify-center text-white">
      <h2 className="text-4xl font-semibold mb-8">Summary</h2>
      <div className="bg-white/20 rounded-lg p-6 backdrop-blur-sm">
        <p className="text-2xl mb-4">
          Total Transactions:{" "}
          <span
            className="font-bold"
            style={{
              transform: `translateY(${interpolate(frame, [0, 30], [20, 0])}px)`,
              display: "inline-block",
            }}
          >
            {totalTransactions}
          </span>
        </p>
        <p className="text-2xl mb-4">
          Wallet Overview: $
          <span
            className="font-bold"
            style={{
              transform: `translateY(${interpolate(frame, [10, 40], [20, 0])}px)`,
              display: "inline-block",
            }}
          >
            {walletOverview}
          </span>
        </p>
        <p className="text-2xl">
          Total SOL Spent on Fees:{" "}
          <span
            className="font-bold"
            style={{
              transform: `translateY(${interpolate(frame, [20, 50], [20, 0])}px)`,
              display: "inline-block",
            }}
          >
            {totalSolSpent}
          </span>{" "}
          SOL
        </p>
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
      <h2
        className="text-4xl font-semibold mb-8"
        style={{
          opacity: interpolate(frame - 2 * sectionDuration, [0, 30], [0, 1]),
          transform: `translateY(${interpolate(
            frame - 2 * sectionDuration,
            [0, 30],
            [-50, 0],
          )}px)`,
        }}
      >
        NFT Highlights
      </h2>
      <div className="grid grid-cols-2 gap-6">
        <div
          className="bg-white/20 rounded-lg p-4 backdrop-blur-sm"
          style={{
            opacity: interpolate(frame - 2 * sectionDuration, [30, 60], [0, 1]),
            transform: `translateX(${interpolate(
              frame - 2 * sectionDuration,
              [30, 60],
              [-100, 0],
            )}px)`,
          }}
        >
          <p className="text-xl">Top Collections:</p>
          <p className="text-lg font-light">{mostInteractedNFTs}</p>
        </div>
        <div
          className="bg-white/20 rounded-lg p-4 backdrop-blur-sm"
          style={{
            opacity: interpolate(frame - 2 * sectionDuration, [30, 60], [0, 1]),
            transform: `translateX(${interpolate(
              frame - 2 * sectionDuration,
              [30, 60],
              [100, 0],
            )}px)`,
          }}
        >
          <p className="text-xl">Most Valuable NFT:</p>
          <p className="text-lg font-light">{mostValuableNFT}</p>
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
      <h2
        className="text-4xl font-semibold mb-8"
        style={{
          opacity: interpolate(frame - 3 * sectionDuration, [0, 30], [0, 1]),
          transform: `translateY(${interpolate(
            frame - 3 * sectionDuration,
            [0, 30],
            [-50, 0],
          )}px)`,
        }}
      >
        Token Activity
      </h2>
      <div
        className="bg-white/20 rounded-lg p-6 backdrop-blur-sm"
        style={{
          opacity: interpolate(frame - 3 * sectionDuration, [30, 60], [0, 1]),
          transform: `translateY(${interpolate(
            frame - 3 * sectionDuration,
            [30, 60],
            [50, 0],
          )}px)`,
        }}
      >
        <p className="text-2xl mb-4">Most Interacted Tokens:</p>
        <p className="text-xl font-light">{mostInteractedTokens}</p>
      </div>
      <div
        className="mt-6 bg-white/20 rounded-lg p-6 backdrop-blur-sm"
        style={{
          opacity: interpolate(frame - 3 * sectionDuration, [60, 90], [0, 1]),
          transform: `scale(${interpolate(
            frame - 3 * sectionDuration,
            [60, 90],
            [0.8, 1],
          )})`,
        }}
      >
        <p className="text-2xl">SOL Price Change vs Jan 1st:</p>
        <p className="text-4xl font-bold">{solPriceChange}</p>
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
      <h2
        className="text-4xl font-semibold mb-8"
        style={{
          opacity: interpolate(frame - 4 * sectionDuration, [0, 30], [0, 1]),
          transform: `translateY(${interpolate(
            frame - 4 * sectionDuration,
            [0, 30],
            [-50, 0],
          )}px)`,
        }}
      >
        DeFi Insights
      </h2>
      <div className="grid grid-cols-2 gap-6">
        <div
          className="bg-white/20 rounded-lg p-4 backdrop-blur-sm"
          style={{
            opacity: interpolate(frame - 4 * sectionDuration, [30, 60], [0, 1]),
            transform: `rotate(${interpolate(
              frame - 4 * sectionDuration,
              [30, 60],
              [-90, 0],
            )}deg)`,
          }}
        >
          <p className="text-xl">Total SOL Staked:</p>
          <p className="text-3xl font-bold">{totalSolStaked} SOL</p>
        </div>
        <div
          className="bg-white/20 rounded-lg p-4 backdrop-blur-sm"
          style={{
            opacity: interpolate(frame - 4 * sectionDuration, [30, 60], [0, 1]),
            transform: `rotate(${interpolate(
              frame - 4 * sectionDuration,
              [30, 60],
              [90, 0],
            )}deg)`,
          }}
        >
          <p className="text-xl">Top Programs:</p>
          <p className="text-lg font-light">{mostInteractedPrograms}</p>
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
      <h2
        className="text-4xl font-semibold mb-8"
        style={{
          opacity: interpolate(frame - 5 * sectionDuration, [0, 30], [0, 1]),
          transform: `translateY(${interpolate(
            frame - 5 * sectionDuration,
            [0, 30],
            [-50, 0],
          )}px)`,
        }}
      >
        New Connections
      </h2>
      <div
        className="bg-white/20 rounded-lg p-6 backdrop-blur-sm"
        style={{
          opacity: interpolate(frame - 5 * sectionDuration, [30, 60], [0, 1]),
          transform: `scale(${interpolate(
            frame - 5 * sectionDuration,
            [30, 60],
            [0.5, 1],
          )})`,
        }}
      >
        <p className="text-2xl">New Addresses Interacted:</p>
        <p
          className="text-6xl font-bold"
          style={{
            transform: `translateY(${interpolate(
              frame - 5 * sectionDuration,
              [60, 90, 120, 150],
              [0, -20, 0, -20],
            )}px)`,
          }}
        >
          {newAddressesInteracted}
        </p>
      </div>
      <p
        className="mt-8 text-xl italic"
        style={{
          opacity: interpolate(frame - 5 * sectionDuration, [90, 120], [0, 1]),
        }}
      >
        Your network is growing!
      </p>
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
    <AbsoluteFill className="bg-gradient-to-br from-purple-600 to-blue-500 font-[Poppins]">
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

      <Sequence from={introDuration + sectionDuration} durationInFrames={sectionDuration}>
        <NFTHighlights
          mostInteractedNFTs={mostInteractedNFTs}
          mostValuableNFT={mostValuableNFT}
        />
      </Sequence>

      <Sequence from={introDuration + 2 * sectionDuration} durationInFrames={sectionDuration}>
        <TokenActivity
          mostInteractedTokens={mostInteractedTokens}
          solPriceChange={solPriceChange}
        />
      </Sequence>

      <Sequence from={introDuration + 3 * sectionDuration} durationInFrames={sectionDuration}>
        <DeFiInsights
          totalSolStaked={totalSolStaked}
          mostInteractedPrograms={mostInteractedPrograms}
        />
      </Sequence>

      <Sequence from={introDuration + 4 * sectionDuration} durationInFrames={sectionDuration}>
        <NewConnections newAddressesInteracted={newAddressesInteracted} />
      </Sequence>
    </AbsoluteFill>
  );
};
