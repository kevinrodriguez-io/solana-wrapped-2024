import { z } from "zod";

export const CompositionProps = z.object({
  totalTransactions: z.number(),
  walletOverview: z.number(),
  totalSolSpent: z.number(),
  mostInteractedTokens: z.string(),
  mostInteractedNFTs: z.string(),
  mostInteractedPrograms: z.string(),
  mostValuableNFT: z.string(),
  totalSolStaked: z.number(),
  newAddressesInteracted: z.number(),
  solPriceChange: z.string(),
});

export const defaultMyCompProps: z.infer<typeof CompositionProps> = {
  totalTransactions: 1000,
  walletOverview: 50,
  totalSolSpent: 10,
  mostInteractedTokens: "USDC, USDT, SOL",
  mostInteractedNFTs: "DeGods, y00ts, ABC",
  mostInteractedPrograms: "Orca, Raydium, Marinade",
  mostValuableNFT: "DeGod #1234",
  totalSolStaked: 1000,
  newAddressesInteracted: 100,
  solPriceChange: "+50%",
};

export const COMP_NAME = "wrapped";
export const VIDEO_WIDTH = 1080;
export const VIDEO_HEIGHT = 1920;
export const VIDEO_FPS = 120;
export const DURATION_IN_MINUTES = 1;
export const DURATION_IN_FRAMES = DURATION_IN_MINUTES * 60 * VIDEO_FPS;
