import { useState, useEffect, useCallback } from "react";
import * as webllm from "@mlc-ai/web-llm";

export function useWebLLM() {
  const [engine, setEngine] = useState<webllm.MLCEngine | null>(null);
  const [progress, setProgress] = useState(0);
  const [started, setStarted] = useState(false);

  const startLoading = useCallback(async () => {
    if (started) return; // prevent double start
    setStarted(true);

    const eng = await webllm.CreateMLCEngine("Qwen3-0.6B-q4f16_1-MLC", {
      initProgressCallback: (report) => setProgress(report.progress),
    });
    setEngine(eng);
  }, [started]);

  return { engine, progress, started, startLoading };
}
