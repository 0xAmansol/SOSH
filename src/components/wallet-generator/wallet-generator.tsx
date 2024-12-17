"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Keypair } from "@solana/web3.js";
import { generateMnemonic, mnemonicToKeypair } from "@/lib/wallet";
import { toast } from "@/hooks/use-toast";
import { Copy } from "lucide-react";

type Props = {};

const WalletGenerator = (props: Props) => {
  const [mnemonic, setMnemonic] = useState("");
  const [keypair, setKeypair] = useState<Keypair | null>(null);
  const [index, setIndex] = useState(0);
  const [publicKeys, setPublicKeys] = useState([]);

  const path = `m/44'/501'/${index}'/0'`;

  const generateWallet = async () => {
    try {
      const newMnemonic = await generateMnemonic();
      setMnemonic(newMnemonic);
      const newKeypair = await mnemonicToKeypair(newMnemonic, path);
      setKeypair(newKeypair);
    } catch (error) {
      console.error("Failed to generate wallet:", error);
      toast({
        title: "Error",
        description: "Failed to generate wallet. Please try again.",
        variant: "destructive",
      });
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      duration: 2000,
    });
  };

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Secret Recovery Phrase</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input placeholder="Enter your secret phrase (or leave blank to generate)" />
          <Button onClick={generateWallet} className="w-full">
            Generate Wallet
          </Button>
        </CardContent>
      </Card>
      {mnemonic && (
        <Card>
          <CardHeader>
            <CardTitle>Your Secret Phrase</CardTitle>
          </CardHeader>
          <CardContent>
            <div
              className="grid grid-cols-3 md:grid-cols-4 gap-2 p-4 bg-muted rounded-lg cursor-pointer"
              onClick={() => copyToClipboard(mnemonic)}
            >
              {mnemonic.split(" ").map((word, index) => (
                <div
                  key={index}
                  className="bg-background p-2 rounded flex items-center justify-between"
                >
                  {word}
                </div>
              ))}
            </div>
            <p className="text-sm text-muted-foreground mt-2 flex items-center gap-2">
              <Copy className="h-4 w-4" />
              Click Anywhere To Copy
            </p>
          </CardContent>
        </Card>
      )}

      {keypair && (
        <Card>
          <CardHeader>
            <CardTitle>Solana Wallet</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-medium mb-1">Public Key</h3>
              <div className="bg-muted p-2 rounded break-all">
                {keypair.publicKey.toString()}
              </div>
            </div>
            <div>
              <h3 className="font-medium mb-1">Private Key</h3>
              <div className="bg-muted p-2 rounded break-all font-mono">
                {"•".repeat(64)}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default WalletGenerator;
