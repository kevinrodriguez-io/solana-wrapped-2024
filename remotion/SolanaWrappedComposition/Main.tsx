import {
  AbsoluteFill,
  Sequence,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { CompositionProps, VIDEO_FPS } from "../../types/constants";
import * as Poppins from "@remotion/google-fonts/Poppins";
import React from "react";
import { z } from "zod";

Poppins.loadFont();

const sectionDuration = 10 * VIDEO_FPS; // 10 seconds per section

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
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const opacity = interpolate(frame, [0, 30], [0, 1]);

  return (
    <AbsoluteFill className="bg-gradient-to-br from-purple-600 to-blue-500 font-[Poppins]">
      <Sequence durationInFrames={sectionDuration}>
        <AbsoluteFill className="flex flex-col items-center justify-center text-white">
          <h1 className="text-6xl font-bold mb-8 animate-pulse">
            Your Solana Year Wrapped 2024
          </h1>
          <p className="text-2xl italic">
            Let&apos;s dive into your crypto journey!
          </p>
        </AbsoluteFill>
      </Sequence>

      <Sequence from={sectionDuration} durationInFrames={sectionDuration}>
        <AbsoluteFill className="flex flex-col items-center justify-center text-white">
          <h2 className="text-4xl font-semibold mb-8">Summary</h2>
          <div className="bg-white/20 rounded-lg p-6 backdrop-blur-sm">
            <p className="text-2xl mb-4">
              Total Transactions:{" "}
              <span className="font-bold">{totalTransactions}</span>
            </p>
            <p className="text-2xl mb-4">
              Wallet Overview:{" "}
              <span className="font-bold">${walletOverview}</span>
            </p>
            <p className="text-2xl">
              Total SOL Spent on Fees:{" "}
              <span className="font-bold">{totalSolSpent} SOL</span>
            </p>
          </div>
        </AbsoluteFill>
      </Sequence>

      <Sequence from={2 * sectionDuration} durationInFrames={sectionDuration}>
        <AbsoluteFill className="flex flex-col items-center justify-center text-white">
          <h2 className="text-4xl font-semibold mb-8">NFT Highlights</h2>
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
              <p className="text-xl">Top Collections:</p>
              <p className="text-lg font-light">{mostInteractedNFTs}</p>
            </div>
            <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
              <p className="text-xl">Most Valuable NFT:</p>
              <p className="text-lg font-light">{mostValuableNFT}</p>
            </div>
          </div>
        </AbsoluteFill>
      </Sequence>

      <Sequence from={3 * sectionDuration} durationInFrames={sectionDuration}>
        <AbsoluteFill className="flex flex-col items-center justify-center text-white">
          <h2 className="text-4xl font-semibold mb-8">Token Activity</h2>
          <div className="bg-white/20 rounded-lg p-6 backdrop-blur-sm">
            <p className="text-2xl mb-4">Most Interacted Tokens:</p>
            <p className="text-xl font-light">{mostInteractedTokens}</p>
          </div>
          <div className="mt-6 bg-white/20 rounded-lg p-6 backdrop-blur-sm">
            <p className="text-2xl">SOL Price Change vs Jan 1st:</p>
            <p className="text-4xl font-bold">{solPriceChange}</p>
          </div>
        </AbsoluteFill>
      </Sequence>

      <Sequence from={4 * sectionDuration} durationInFrames={sectionDuration}>
        <AbsoluteFill className="flex flex-col items-center justify-center text-white">
          <h2 className="text-4xl font-semibold mb-8">DeFi Insights</h2>
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
              <p className="text-xl">Total SOL Staked:</p>
              <p className="text-3xl font-bold">{totalSolStaked} SOL</p>
            </div>
            <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
              <p className="text-xl">Top Programs:</p>
              <p className="text-lg font-light">{mostInteractedPrograms}</p>
            </div>
          </div>
        </AbsoluteFill>
      </Sequence>

      <Sequence from={5 * sectionDuration} durationInFrames={sectionDuration}>
        <AbsoluteFill className="flex flex-col items-center justify-center text-white">
          <h2 className="text-4xl font-semibold mb-8">New Connections</h2>
          <div className="bg-white/20 rounded-lg p-6 backdrop-blur-sm">
            <p className="text-2xl">New Addresses Interacted:</p>
            <p className="text-6xl font-bold animate-bounce">
              {newAddressesInteracted}
            </p>
          </div>
          <p className="mt-8 text-xl italic">Your network is growing!</p>
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};
