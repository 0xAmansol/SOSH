"use client";

import { ThemeSwitch } from "@/components/theme-switch/theme-switch";
import WalletGenerator from "@/components/wallet-generator/wallet-generator";
import React, { useState } from "react";

type Props = {};

const Dashboard = (props: Props) => {
  const [mnemonic, setMnemonic] = useState("");
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="font-bold text-xl">Kosh</div>
            <span className="text-xs bg-muted px-2 py-1 rounded">v1.3</span>
          </div>
          <ThemeSwitch />
        </div>
      </header>
      <main className="container mx-auto py-8">
        <WalletGenerator />
      </main>
    </div>
  );
};

export default Dashboard;
