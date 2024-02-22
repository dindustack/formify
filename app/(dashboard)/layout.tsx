import { Logo } from "@/components/Logo";
import { UserButton } from "@clerk/nextjs";
import React, { ReactNode } from "react";

function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen min-w-full bg-background max-h-screen">
      <Logo />
      <UserButton />
    </div>
  );
}

export default Layout;
