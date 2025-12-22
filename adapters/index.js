// src/adapters/index.js
import { localAdapter } from "./localStorageAdapter";
import { supabaseAdapter } from "./supabaseAdapter";

const useBackend =
  process.env.NEXT_PUBLIC_USE_BACKEND === "true";

export const adapter = useBackend
  ? supabaseAdapter
  : localAdapter;
