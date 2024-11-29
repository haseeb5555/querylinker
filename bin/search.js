#!/usr/bin/env node

const { execSync } = require("child_process");
const path = require("path");
const fs = require("fs");

function findRustBinary() {
  // Try multiple possible locations for the binary
  const possiblePaths = [
    // Local development path
    path.resolve(process.cwd(), "target/release/rust-cli-search"),
    // Global npm installation path
    path.resolve(__dirname, "../target/release/rust-cli-search"),
    // For Windows
    path.resolve(process.cwd(), "target/release/rust-cli-search.exe"),
    path.resolve(__dirname, "../target/release/rust-cli-search.exe")
  ];

  for (const binPath of possiblePaths) {
    if (fs.existsSync(binPath)) {
      return binPath;
    }
  }

  throw new Error(
    "Rust binary not found. Please ensure the package is properly installed and built."
  );
}

try {
  const rustBinaryPath = findRustBinary();
  console.log("Using Rust binary at:", rustBinaryPath);
  
  const args = process.argv.slice(2);
  if (args.length === 0) {
    console.log("Usage: search <engine> <query>");
    process.exit(1);
  }

  execSync(`"${rustBinaryPath}" ${args.join(" ")}`, { 
    stdio: "inherit",
    shell: true 
  });
} catch (error) {
  console.error("Error executing the Rust CLI:", error.message);
  process.exit(1);
}