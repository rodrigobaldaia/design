import { useEffect, useState } from "react";
import * as webllm from "@mlc-ai/web-llm";

export function useWebLLM() {
  const [engine, setEngine] = useState<webllm.MLCEngine | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      const eng = await webllm.CreateMLCEngine("Qwen3-0.6B-q4f16_1-MLC", {
        initProgressCallback: (report) => setProgress(report.progress),
      });
      if (!cancelled) setEngine(eng);
    };

    load();
    return () => { cancelled = true; };
  }, []);

  return { engine, progress };
}

