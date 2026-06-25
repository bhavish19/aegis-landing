import fs from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const srcPath = join(root, "src/AegisLandingPage.tsx");
const lines = fs.readFileSync(srcPath, "utf8").split("\n");

function extract(start, end) {
  return lines.slice(start - 1, end).join("\n");
}

function writeComponent(path, imports, start, end, exportName) {
  let body = extract(start, end);
  body = body.replace(
    new RegExp(`^function ${exportName}`),
    `export function ${exportName}`,
  );
  fs.mkdirSync(dirname(path), { recursive: true });
  fs.writeFileSync(path, `${imports}\n\n${body}\n`);
}

const comp = join(root, "src/components");

writeComponent(
  join(comp, "ZKPSimulator.tsx"),
  `import { useCallback, useEffect, useRef, useState } from "react";
import {
  Building2,
  CheckCircle,
  Database,
  IdCard,
  Loader2,
  Lock,
  Server,
  Shield,
  Smartphone,
} from "lucide-react";
import { cn } from "../lib/cn";
import { Panel } from "./ui/Panel";`,
  205,
  838,
  "ZKPSimulator",
);

console.log("Extracted ZKPSimulator");
