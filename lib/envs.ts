import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const envs = createEnv({
  server: {},
  client: {
    NEXT_PUBLIC_TENDERLY_VIRTUAL_MAINNET_RPC: z.string().min(1),
    NEXT_PUBLIC_RAINBOWKIT_PROJECT_ID: z.string().min(1),
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_TENDERLY_VIRTUAL_MAINNET_RPC:
      process.env.NEXT_PUBLIC_TENDERLY_VIRTUAL_MAINNET_RPC,
    NEXT_PUBLIC_RAINBOWKIT_PROJECT_ID:
      process.env.NEXT_PUBLIC_RAINBOWKIT_PROJECT_ID,
  },
});
