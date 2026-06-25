import { useCallback, useEffect, useRef, useState } from "react";
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
import { generateProofHash } from "../lib/proofHash";
import { Panel } from "./ui/Panel";
const ID_PROCESS_STEPS = [
  "Reading local credential state",
  "Generating witness variables",
  "Computing client-side zk-SNARK",
] as const;

type SimPhase = "idle" | "local" | "transmit" | "cloud" | "verify" | "complete";

const SIM_DURATION_MS = 7000;
const PHASE_AT_MS: { phase: SimPhase; at: number }[] = [
  { phase: "local", at: 0 },
  { phase: "transmit", at: 2200 },
  { phase: "cloud", at: 3800 },
  { phase: "verify", at: 5200 },
  { phase: "complete", at: SIM_DURATION_MS },
];

function phaseAtElapsed(elapsed: number): SimPhase {
  let current: SimPhase = "local";
  for (const { phase, at } of PHASE_AT_MS) {
    if (elapsed >= at) current = phase;
  }
  return current;
}

function processStepAtElapsed(elapsed: number): number {
  if (elapsed >= 1100) return 2;
  if (elapsed >= 500) return 1;
  return 0;
}
function FlowSpinner({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-2 text-[10px] text-aegis-teal-bright">
      <Loader2 className="h-3.5 w-3.5 animate-spin" />
      {label}
    </span>
  );
}

function ProofHashBadge({
  hash,
  className,
  muted,
}: {
  hash: string;
  className?: string;
  muted?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-md border px-3 py-2 font-mono text-[10px] leading-snug",
        muted
          ? "border-white/[0.06] text-aegis-slate-lo/60"
          : "border-aegis-teal/30 bg-aegis-teal/10 text-aegis-teal-glow",
        className,
      )}
    >
      <p className="mb-0.5 text-[9px] font-sans text-aegis-slate-lo">Proof hash</p>
      <p className="break-all">{hash}</p>
    </div>
  );
}

function FlowConnectorVisual({
  phase,
  proofHash,
  direction = "horizontal",
  mode = "proof",
}: {
  phase: SimPhase;
  proofHash: string;
  direction?: "horizontal" | "vertical";
  mode?: "proof" | "query";
}) {
  const proofAnimating = mode === "proof" && phase === "transmit";
  const queryAnimating = mode === "query" && phase === "verify";
  const proofHighlighted =
    mode === "proof" &&
    ["transmit", "cloud", "verify", "complete"].includes(phase);
  const showNoPii =
    mode === "proof" &&
    ["transmit", "cloud", "verify", "complete"].includes(phase);

  if (direction === "vertical") {
    return (
      <div className="flex flex-col items-center py-2 lg:hidden">
        <div className="relative flex h-14 w-px flex-col items-center bg-white/10">
          {proofAnimating && (
            <span className="absolute top-0 h-2.5 w-2.5 animate-[flow-down_1.2s_ease-in-out_infinite] rounded-full bg-aegis-teal-bright shadow-[0_0_8px_rgba(59,191,173,0.6)]" />
          )}
          {queryAnimating && (
            <span className="absolute bottom-0 h-2.5 w-2.5 animate-[flow-down_1.2s_ease-in-out_infinite] rounded-full bg-aegis-navy-mid shadow-[0_0_8px_rgba(37,78,143,0.5)]" />
          )}
        </div>
        {showNoPii && mode === "proof" && (          <span className="mt-1 flex items-center gap-1 text-[10px] text-aegis-teal-bright">
            <Shield className="h-3 w-3" />
            No PII shared
          </span>
        )}
      </div>
    );
  }

  return (
    <div className="relative hidden w-full max-w-[80px] flex-col items-center justify-center gap-2 lg:flex">
      <div className="relative h-px w-full bg-white/10">
        {proofAnimating && (
          <span className="absolute top-1/2 left-0 h-2.5 w-2.5 -translate-y-1/2 animate-[flow-right_1.4s_ease-in-out_infinite] rounded-full bg-aegis-teal-bright shadow-[0_0_8px_rgba(59,191,173,0.6)]" />
        )}
        {queryAnimating && (
          <span className="absolute top-1/2 right-0 h-2.5 w-2.5 -translate-y-1/2 animate-[flow-left_1.2s_ease-in-out_infinite] rounded-full bg-aegis-navy-mid shadow-[0_0_8px_rgba(37,78,143,0.5)]" />
        )}
      </div>
      {proofAnimating && proofHash && (
        <ProofHashBadge hash={proofHash} className="w-full text-center" />
      )}
      <span
        className={cn(
          "text-center text-[10px] transition-opacity duration-300",
          proofHighlighted
            ? "text-aegis-teal-bright"
            : queryAnimating
              ? "text-aegis-slate-hi"
              : "text-aegis-slate-lo/50",
        )}
      >
        {queryAnimating ? "validates proof" : "proof only"}
      </span>
      {showNoPii && (
        <span className="flex items-center gap-1 text-[10px] text-aegis-teal-bright">
          <Shield className="h-3 w-3" />
          No PII shared
        </span>
      )}
    </div>
  );
}

export function ZKPSimulator() {
  const [phase, setPhase] = useState<SimPhase>("idle");
  const [processStep, setProcessStep] = useState(0);
  const [proofHash, setProofHash] = useState("");
  const startTimeRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);
  const hashIssuedRef = useRef(false);
  const runningRef = useRef(false);
  const lastPhaseRef = useRef<SimPhase>("idle");
  const lastStepRef = useRef(-1);

  const stopLoop = useCallback(() => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    startTimeRef.current = null;
    runningRef.current = false;
  }, []);

  const syncSimulation = useCallback(() => {
    if (startTimeRef.current === null) return;

    const elapsed = performance.now() - startTimeRef.current;
    const nextPhase = phaseAtElapsed(elapsed);
    const nextStep = processStepAtElapsed(elapsed);

    if (nextPhase !== lastPhaseRef.current) {
      lastPhaseRef.current = nextPhase;
      setPhase(nextPhase);
    }

    if (elapsed < 2200 && nextStep !== lastStepRef.current) {
      lastStepRef.current = nextStep;
      setProcessStep(nextStep);
    }

    if (elapsed >= 1900 && !hashIssuedRef.current) {
      hashIssuedRef.current = true;
      setProofHash(generateProofHash());
    }

    if (nextPhase === "complete" || elapsed >= SIM_DURATION_MS) {
      setPhase("complete");
      stopLoop();
      return;
    }

    rafRef.current = requestAnimationFrame(syncSimulation);
  }, [stopLoop]);

  const runSimulation = useCallback(() => {
    if (runningRef.current) return;

    stopLoop();
    hashIssuedRef.current = false;
    lastPhaseRef.current = "local";
    lastStepRef.current = 0;
    setProcessStep(0);
    setProofHash("");
    setPhase("local");
    startTimeRef.current = performance.now();
    runningRef.current = true;
    rafRef.current = requestAnimationFrame(syncSimulation);
  }, [stopLoop, syncSimulation]);

  useEffect(() => () => stopLoop(), [stopLoop]);

  // Catch up when iOS/Android resume the tab (rAF pauses in background).
  useEffect(() => {
    const onVisibility = () => {
      if (
        document.visibilityState === "visible" &&
        runningRef.current &&
        startTimeRef.current !== null
      ) {
        if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
        syncSimulation();
      }
    };

    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, [syncSimulation]);

  // Safety net if the loop stalls on a throttled device.
  useEffect(() => {
    if (phase === "idle" || phase === "complete") return;

    const safety = window.setTimeout(() => {
      if (runningRef.current) {
        setPhase("complete");
        if (!hashIssuedRef.current) {
          hashIssuedRef.current = true;
          setProofHash(generateProofHash());
        }
        stopLoop();
      }
    }, SIM_DURATION_MS + 2500);

    return () => clearTimeout(safety);
  }, [phase, stopLoop]);
  const isActive = phase !== "idle";
  const isProcessing = phase === "local";
  const isTransmitting = phase === "transmit";
  const isVerifying = phase === "verify";
  const deviceActive = ["local", "transmit"].includes(phase);
  const cloudActive = ["cloud", "verify", "complete"].includes(phase);
  const businessActive = ["verify", "complete"].includes(phase);
  const proofReady = proofHash !== "";
  const proofInCloud =
    proofReady && ["cloud", "verify", "complete"].includes(phase);
  const proofAtBusiness = phase === "complete";
  const isRunning = isActive && phase !== "complete";

  return (
    <div id="proof-flow" className="relative mt-20 scroll-mt-28">
      <div className="mb-8 max-w-xl">
        <h3 className="text-lg font-semibold text-aegis-white">
          Try the proof flow
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-aegis-slate">
          Watch the ID stay on the user&apos;s device while only the proof hash
          travels — then see your platform verify it with the AEGIS node.{" "}
          <a
            href="#technology"
            className="text-aegis-teal-bright underline-offset-2 hover:underline"
          >
            See the full pipeline below
          </a>{" "}
          for step-by-step detail.
        </p>
      </div>

      <div className="mb-6 flex justify-center">
        <button
          type="button"
          onClick={runSimulation}
          aria-busy={isRunning}
          aria-disabled={isRunning}
          className={cn(
            "min-h-11 touch-manipulation rounded-md px-5 py-2.5 text-sm font-medium text-white transition-colors",
            "bg-aegis-teal hover:bg-aegis-teal-bright",
            isRunning && "pointer-events-none cursor-wait opacity-60",
          )}
        >          {phase === "idle" && "Run proof flow"}
          {phase !== "idle" && phase !== "complete" && (
            <span className="inline-flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              Simulating…
            </span>
          )}
          {phase === "complete" && "Run again"}
        </button>
      </div>

      {/* Desktop: 3-column visual flow */}
      <div className="hidden items-stretch gap-2 lg:grid lg:grid-cols-[1fr_auto_1fr_auto_1fr]">
        {/* 1 — Local client device */}
        <Panel active={deviceActive}>
          <div className="flex h-full flex-col p-5">
            <div className="mb-4 flex items-center gap-2">
              <Smartphone className="h-4 w-4 text-aegis-teal-bright" />
              <div>
                <p className="text-[10px] uppercase tracking-wide text-aegis-slate-lo">
                  Step 1
                </p>
                <h4 className="text-sm font-semibold text-aegis-white">
                  Local client device
                </h4>
              </div>
            </div>

            <div className="relative flex flex-1 flex-col rounded-lg border border-white/[0.08] bg-aegis-bg/50 p-4">
              <div className="flex items-center justify-center py-3">
                <div
                  className={cn(
                    "relative flex h-20 w-[4.5rem] flex-col items-center justify-center rounded-lg border-2 bg-aegis-navy/30 transition-all duration-500",
                    deviceActive
                      ? "border-aegis-teal/50 shadow-[0_0_24px_rgba(42,157,143,0.2)]"
                      : "border-white/10",
                  )}
                >
                  <IdCard
                    className={cn(
                      "h-9 w-9 transition-all duration-500",
                      deviceActive ? "text-aegis-teal-bright" : "text-aegis-slate-lo",
                    )}
                  />
                  <span className="mt-1 text-[9px] font-medium text-aegis-slate-lo">
                    ID credential
                  </span>
                  <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full border border-aegis-teal/40 bg-aegis-bg">
                    <Lock className="h-3 w-3 text-aegis-teal-bright" />
                  </span>
                </div>
              </div>

              {/* ID processing steps */}
              <div className="mb-3 rounded-md border border-white/[0.06] bg-aegis-bg/80 p-3">
                <p className="mb-2 text-[9px] font-medium uppercase tracking-wide text-aegis-slate-lo">
                  On-device processing
                </p>
                <ul className="space-y-2">
                  {ID_PROCESS_STEPS.map((step, i) => {
                    const done = proofReady || (isProcessing && processStep > i);
                    const current = isProcessing && !proofReady && processStep === i;

                    return (
                      <li
                        key={step}
                        className={cn(
                          "flex items-start gap-2 text-[10px] leading-snug transition-opacity",
                          phase === "idle" && "opacity-40",
                          !done && !current && isProcessing && "opacity-35",
                        )}
                      >
                        {done ? (
                          <CheckCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-aegis-teal-bright" />
                        ) : current ? (
                          <Loader2 className="mt-0.5 h-3.5 w-3.5 shrink-0 animate-spin text-aegis-teal-bright" />
                        ) : (
                          <span className="mt-1 h-2 w-2 shrink-0 rounded-full border border-white/20" />
                        )}
                        <span
                          className={cn(
                            done || current ? "text-aegis-slate-hi" : "text-aegis-slate-lo",
                          )}
                        >
                          {step}
                        </span>
                      </li>
                    );
                  })}
                </ul>
                {isProcessing && !proofReady && (
                  <div className="mt-3 border-t border-white/[0.06] pt-2">
                    <FlowSpinner
                      label={
                        processStep === 2
                          ? "Finalising proof hash…"
                          : "Processing ID locally…"
                      }
                    />
                  </div>
                )}
              </div>

              {proofReady && (
                <ProofHashBadge hash={proofHash} muted={isTransmitting} />
              )}

              {isTransmitting && (
                <div className="mt-2">
                  <FlowSpinner label="Transmitting proof hash…" />
                </div>
              )}

              <p className="mt-3 text-center text-[10px] text-aegis-slate-lo">
                {isProcessing
                  ? proofReady
                    ? "Proof hash ready — preparing to send"
                    : "ID never leaves this device"
                  : proofReady
                    ? "Credential stays local — only proof sent"
                    : "Tap run to start"}
              </p>
            </div>
          </div>
        </Panel>

        <FlowConnectorVisual phase={phase} proofHash={proofHash} />

        {/* 2 — AEGIS cloud / database */}
        <Panel active={cloudActive} muted={!cloudActive && isActive}>
          <div className="flex h-full flex-col p-5">
            <div className="mb-4 flex items-center gap-2">
              <Database className="h-4 w-4 text-aegis-teal-bright" />
              <div>
                <p className="text-[10px] uppercase tracking-wide text-aegis-slate-lo">
                  Step 2
                </p>
                <h4 className="text-sm font-semibold text-aegis-white">
                  AEGIS cloud layer
                </h4>
              </div>
            </div>

            <div className="flex flex-1 flex-col rounded-lg border border-white/[0.08] bg-aegis-bg/50 p-4">
              <div className="flex flex-col items-center py-2">
                <div className="relative">
                  <Server
                    className={cn(
                      "h-12 w-12 transition-colors duration-500",
                      cloudActive ? "text-aegis-teal-bright" : "text-aegis-slate-lo/40",
                    )}
                  />
                  {isVerifying && (
                    <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full border border-aegis-teal/40 bg-aegis-bg">
                      <Loader2 className="h-3.5 w-3.5 animate-spin text-aegis-teal-bright" />
                    </span>
                  )}
                  {cloudActive && !isVerifying && (
                    <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-aegis-teal">
                      <Shield className="h-3 w-3 text-white" />
                    </span>
                  )}
                </div>
                <p className="mt-2 text-xs font-medium text-aegis-white">AEGIS node</p>
              </div>

              <div className="mt-3 space-y-2">
                <div
                  className={cn(
                    "rounded-md border px-3 py-2 text-[10px] transition-all duration-500",
                    proofInCloud
                      ? "border-aegis-teal/30 bg-aegis-teal/10"
                      : "border-white/[0.06] bg-aegis-bg/40",
                  )}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-aegis-slate-lo">Proof hash</span>
                    {proofInCloud ? (
                      <CheckCircle className="h-3.5 w-3.5 shrink-0 text-aegis-teal-bright" />
                    ) : (
                      <span className="font-mono text-aegis-slate-lo">—</span>
                    )}
                  </div>
                  {proofInCloud && proofHash && (
                    <p className="mt-1 break-all font-mono text-[9px] text-aegis-teal-glow">
                      {proofHash}
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between rounded-md border border-aegis-teal/20 bg-aegis-teal/5 px-3 py-2 text-[10px]">
                  <span className="flex items-center gap-1 text-aegis-slate-lo">
                    <Shield className="h-3 w-3 text-aegis-teal-bright" />
                    PII transmitted
                  </span>
                  <span className="font-medium text-aegis-teal-bright">No PII shared</span>
                </div>

                <div className="flex items-center justify-between rounded-md border border-white/[0.06] bg-aegis-bg/40 px-3 py-2 text-[10px]">
                  <span className="text-aegis-slate-lo">Identity data stored</span>
                  <span className="font-mono text-aegis-teal-bright">0 bytes</span>
                </div>
              </div>

              {isVerifying && (
                <div className="mt-3 border-t border-white/[0.06] pt-3">
                  <FlowSpinner label="Verifying proof on AEGIS node…" />
                </div>
              )}

              <p className="mt-3 text-center text-[10px] text-aegis-slate-lo">
                {phase === "cloud"
                  ? "Proof received — awaiting platform query"
                  : isVerifying
                    ? "Running stateless zk verification"
                    : proofInCloud
                      ? "Verification service ready"
                      : "Awaiting proof hash…"}
              </p>
            </div>
          </div>
        </Panel>

        <FlowConnectorVisual phase={phase} proofHash={proofHash} mode="query" />

        {/* 3 — Business platform */}
        <Panel active={businessActive} muted={!businessActive && isActive}>
          <div className="flex h-full flex-col p-5">
            <div className="mb-4 flex items-center gap-2">
              <Building2 className="h-4 w-4 text-aegis-teal-bright" />
              <div>
                <p className="text-[10px] uppercase tracking-wide text-aegis-slate-lo">
                  Step 3
                </p>
                <h4 className="text-sm font-semibold text-aegis-white">
                  Your platform
                </h4>
              </div>
            </div>

            <div className="flex flex-1 flex-col rounded-lg border border-white/[0.08] bg-aegis-bg/50 p-4">
              <div className="flex justify-center py-2">
                <Building2
                  className={cn(
                    "h-11 w-11 transition-colors duration-500",
                    businessActive ? "text-aegis-white" : "text-aegis-slate-lo/40",
                  )}
                />
              </div>

              {proofInCloud && proofHash && (
                <ProofHashBadge
                  hash={proofHash}
                  className="mb-3"
                  muted={!businessActive}
                />
              )}

              {isVerifying && (
                <div className="mb-3 rounded-md border border-white/[0.06] bg-aegis-bg/80 p-3">
                  <FlowSpinner label="Querying AEGIS node for validity…" />
                  <p className="mt-2 text-[10px] text-aegis-slate-lo">
                    Platform sends proof hash — never the user&apos;s ID
                  </p>
                </div>
              )}

              {proofAtBusiness && (
                <div className="flex items-start gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-3">
                  <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                  <div>
                    <p className="text-xs font-semibold text-emerald-200">
                      Valid — access granted
                    </p>
                    <p className="mt-1 text-[10px] text-emerald-300/80">
                      Proof verified · no PII exchanged
                    </p>
                    <p className="mt-2 break-all font-mono text-[9px] text-emerald-300/60">
                      {proofHash}
                    </p>
                  </div>
                </div>
              )}

              {!businessActive && phase === "idle" && (
                <p className="mt-2 text-center text-[10px] text-aegis-slate-lo">
                  Submits proof hash to AEGIS for validation
                </p>
              )}
            </div>
          </div>
        </Panel>
      </div>

      {/* Mobile: vertical flow */}
      <div className="space-y-0 lg:hidden">
        <Panel active={deviceActive}>
          <div className="p-5">
            <p className="mb-3 text-center text-xs font-semibold text-aegis-white">
              1 · Local client device
            </p>
            <div className="flex justify-center">
              <IdCard
                className={cn(
                  "h-10 w-10",
                  deviceActive ? "text-aegis-teal-bright" : "text-aegis-slate-lo",
                )}
              />
            </div>
            {(isProcessing || proofReady) && (
              <ul className="mt-4 space-y-2">
                {ID_PROCESS_STEPS.map((step, i) => {
                  const done = proofReady || (isProcessing && processStep > i);
                  const current = isProcessing && !proofReady && processStep === i;
                  return (
                    <li key={step} className="flex items-center gap-2 text-[10px]">
                      {done ? (
                        <CheckCircle className="h-3 w-3 text-aegis-teal-bright" />
                      ) : current ? (
                        <Loader2 className="h-3 w-3 animate-spin text-aegis-teal-bright" />
                      ) : (
                        <span className="h-2 w-2 rounded-full border border-white/20" />
                      )}
                      <span className="text-aegis-slate-hi">{step}</span>
                    </li>
                  );
                })}
              </ul>
            )}
            {isProcessing && !proofReady && (
              <div className="mt-3 flex justify-center">
                <FlowSpinner
                  label={
                    processStep === 2
                      ? "Finalising proof hash…"
                      : "Processing ID…"
                  }
                />
              </div>
            )}
            {proofReady && (
              <ProofHashBadge hash={proofHash} className="mt-3" muted={isTransmitting} />
            )}
          </div>
        </Panel>
        <FlowConnectorVisual phase={phase} proofHash={proofHash} direction="vertical" />
        <Panel active={cloudActive}>
          <div className="p-5 text-center">
            <p className="mb-3 text-xs font-semibold text-aegis-white">
              2 · AEGIS cloud
            </p>
            <Server className="mx-auto h-10 w-10 text-aegis-teal-bright" />
            {proofInCloud && proofHash && (
              <ProofHashBadge hash={proofHash} className="mt-3 text-left" />
            )}
            <p className="mt-2 text-[10px] text-aegis-teal-bright">No PII shared</p>
            {isVerifying && (
              <div className="mt-3 flex justify-center">
                <FlowSpinner label="Verifying…" />
              </div>
            )}
          </div>
        </Panel>
        <FlowConnectorVisual
          phase={phase}
          proofHash={proofHash}
          direction="vertical"
          mode="query"
        />
        <Panel active={businessActive}>
          <div className="p-5 text-center">
            <p className="mb-3 text-xs font-semibold text-aegis-white">
              3 · Your platform
            </p>
            <Building2 className="mx-auto h-10 w-10 text-aegis-white" />
            {isVerifying && (
              <div className="mt-3 flex justify-center">
                <FlowSpinner label="Querying AEGIS…" />
              </div>
            )}
            {proofAtBusiness && (
              <p className="mt-2 text-[10px] text-emerald-400">Valid — access granted</p>
            )}
          </div>
        </Panel>
      </div>

      {/* Phase indicator */}
      {isActive && (
        <div className="mt-6 flex flex-col items-center gap-2">
          <div className="flex justify-center gap-2">
            {(["local", "transmit", "cloud", "verify", "complete"] as SimPhase[]).map(
              (step, i) => {
                const steps: SimPhase[] = [
                  "local",
                  "transmit",
                  "cloud",
                  "verify",
                  "complete",
                ];
                const currentIdx = steps.indexOf(phase);
                const done = currentIdx > i || phase === "complete";
                const current = steps.indexOf(phase) === i;
                return (
                  <div
                    key={step}
                    className={cn(
                      "h-1.5 w-8 rounded-full transition-colors duration-300",
                      done || current ? "bg-aegis-teal" : "bg-white/10",
                      current && phase !== "complete" && "animate-pulse",
                    )}
                  />
                );
              },
            )}
          </div>
          <p className="text-[10px] text-aegis-slate-lo">
            {isProcessing && "Processing ID on device"}
            {isTransmitting && "Sending proof hash"}
            {phase === "cloud" && "Proof received by AEGIS"}
            {isVerifying && "Verifying with AEGIS node"}
            {proofAtBusiness && "Complete — compliance verified"}
          </p>
        </div>
      )}
    </div>
  );
}
