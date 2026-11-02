import { readdirSync, readFileSync, statSync } from "fs";
import path from "path";
import { describe, expect, it } from "vitest";

// next/font/google downloads fonts at build time, and Google sometimes serves
// `/l/font?kit=` URLs that Turbopack can't resolve, which fails the build (#24).
// Fonts are self-hosted from app/fonts via next/font/local instead.

const ROOT = path.resolve(__dirname, "..");

function sourceFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const full = path.join(dir, name);
    if (statSync(full).isDirectory()) return sourceFiles(full);
    return /\.(ts|tsx)$/.test(name) ? [full] : [];
  });
}

describe("fonts", () => {
  it("are never loaded from Google at build time", () => {
    const offenders = ["app", "components"]
      .flatMap((dir) => sourceFiles(path.join(ROOT, dir)))
      .filter((file) => readFileSync(file, "utf8").includes("next/font/google"))
      .map((file) => path.relative(ROOT, file));

    expect(offenders).toEqual([]);
  });
});
