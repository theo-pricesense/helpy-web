#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");

const apiClientPath = path.join(
  __dirname,
  "../src/lib/api/generated/ApiClient.ts",
);

try {
  let content = fs.readFileSync(apiClientPath, "utf-8");

  // Fix missing property name for Service
  content = content.replace(
    /public readonly : Service;/g,
    "public readonly service: Service;",
  );

  content = content.replace(
    /this\. = new Service\(this\.request\);/g,
    "this.service = new Service(this.request);",
  );

  fs.writeFileSync(apiClientPath, content, "utf-8");
  console.log("✓ ApiClient.ts fixed successfully");
} catch (error) {
  console.error("✗ Failed to fix ApiClient.ts:", error.message);
  process.exit(1);
}
