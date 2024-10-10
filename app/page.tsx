"use client";

import { Player } from "@remotion/player";
import type { NextPage } from "next";
import React, { useMemo } from "react";
import { Main } from "../remotion/SolanaWrappedComposition/Main";
import {
  CompositionProps,
  defaultMyCompProps,
  DURATION_IN_FRAMES,
  VIDEO_FPS,
  VIDEO_HEIGHT,
  VIDEO_WIDTH,
} from "../types/constants";
import { z } from "zod";
import { Tips } from "../components/Tips/Tips";
import { Spacing } from "../components/Spacing";

const Home: NextPage = () => {
  const inputProps: z.infer<typeof CompositionProps> = useMemo(() => {
    return {
      ...defaultMyCompProps,
    };
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <div className="flex-grow flex items-center justify-center px-4">
        <div className="w-full max-w-3xl">
          <div className="bg-white rounded-lg shadow-2xl overflow-hidden mb-10">
            <div className="aspect-w-16 aspect-h-9 max-h-screen">
              <Player
                component={Main}
                inputProps={inputProps}
                durationInFrames={DURATION_IN_FRAMES}
                fps={VIDEO_FPS}
                compositionHeight={VIDEO_HEIGHT}
                compositionWidth={VIDEO_WIDTH}
                style={{
                  width: "100%",
                  height: "100vh",
                }}
                controls
                autoPlay
                loop
              />
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="space-y-8">
          <Tips />
        </div>
      </div>
    </div>
  );
};

export default Home;
