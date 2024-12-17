import { generateMnemonic as genMnemonic, mnemonicToSeed } from "bip39";

import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";

export function generateMnemonic() {
  return genMnemonic(128);
}

export async function mnemonicToKeypair(mnemonic: string, path: string) {
  const seed = await mnemonicToSeed(mnemonic);
  const derivedSeed = derivePath(path, seed.toString("hex")).key;
  return Keypair.fromSeed(derivedSeed);
}
