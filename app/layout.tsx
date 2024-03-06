import { DesignerContextProvider } from "@/components/context/DesignerContext";
import { Toaster } from "@/components/ui/toaster";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import "./globals.css";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Formify",
  description:
    "Simplifying form creation with an intuitive interface and powerful customization options.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={montserrat.className}>
          <NextTopLoader color={"#7a4fed"} />
          <DesignerContextProvider>
            {children}
            <Toaster />
          </DesignerContextProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
