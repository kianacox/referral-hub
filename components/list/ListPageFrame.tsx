import type { ReactNode } from "react";
import { Fraunces } from "next/font/google";

const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces" });

type ListPageFrameProps = {
  children: ReactNode;
};

export function ListPageFrame({ children }: ListPageFrameProps) {
  return (
    <div
      className={`${fraunces.variable} mx-auto w-full max-w-[1100px] px-4 py-12 sm:py-20`}
    >
      {children}
    </div>
  );
}
