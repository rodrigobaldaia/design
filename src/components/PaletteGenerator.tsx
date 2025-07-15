import {
  Box,
  Button,
  Center,
  Flex,
  Input,
  Text,
  VStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { useState } from "react";
import { useWebLLM } from "../hooks/useWebLLM";

export default function PaletteGenerator() {
  const { engine, progress } = useWebLLM();
  const [goal, setGoal] = useState("");
  const [palette, setPal] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);

  const genPalette = async () => {
    if (!engine || !goal.trim()) return;
    setBusy(true);

    const prompt =
      "You are a colour-palette assistant.\n" +
      "Return ONLY a JSON array of **exactly four different 6-digit hex codes** (e.g. \"#1E90FF\").\n" +
      "Do NOT include explanations or line breaks.\n" +
      `Goal: typical colors of ${goal}`;

    const hexRegex = /^#([0-9a-f]{6})$/i;
    let attempts = 0;
    let colours: string[] = [];

    while (attempts < 3 && colours.length !== 4) {
      try {
        const { choices } = await engine.chat.completions.create({
          messages: [{ role: "user", content: prompt }],
          temperature: 0.5,
          stream: false,
        });

        const content = choices[0]?.message?.content ?? "";
        const match = content.match(/\[[^\]]+\]/);
        if (!match) throw new Error("no JSON array found");

        const raw = JSON.parse(match[0]) as unknown[];
        colours = Array.from(
          new Set(
            raw
              .filter((c): c is string => typeof c === "string" && hexRegex.test(c))
              .map((c) => c.toUpperCase())
          )
        );
      } catch (e) {
        console.warn(`LLM attempt ${attempts + 1} failed:`, e);
      }
      attempts += 1;
    }

    if (colours.length !== 4) {
      console.info("Falling back to auto-generated palette");
      const golden = 0.61803398875;
      let h = (Math.random() * 360) | 0;
      colours = Array.from({ length: 4 }, (_, i) => {
        h = (h + golden * 360) % 360;
        const s = 65;
        const l = 55;
        return hslToHex(h, s, l);
      });
    }

    setPal(colours);
    setBusy(false);
  };

  function hslToHex(h: number, s: number, l: number): string {
    s /= 100;
    l /= 100;
    const k = (n: number) => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = (n: number) => {
      const col = l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
      return Math.round(255 * col)
        .toString(16)
        .padStart(2, "0");
    };
    return `#${f(0)}${f(8)}${f(4)}`.toUpperCase();
  }

  return (
  <Flex justify="center">  
    <VStack maxW="lg" w="100%">
      {!engine ? (
        <Text>Loading model… {(progress * 100).toFixed(0)}%</Text>
      ) : (
        <>
          <Input
            placeholder="e.g. Calm productivity app"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            disabled={busy}
          />

          <Button
            onClick={genPalette}
            w="100%"
            mt={4}
            disabled={!goal.trim() || busy}
            loading={busy}
            loadingText="Generating"
          >
            Generate palette
          </Button>
        </>
      )}

      {palette.length > 0 && (
        <Wrap mt={6} >
          {palette.map((c, i) => (
            <WrapItem key={`${c}-${i}`}>
              <Box
                bg={/^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(c) ? c : "#ccc"}
                w="60px"
                h="60px"
                borderRadius="md"
                border="1px solid #ccc"
                title={String(c)}
              />
            </WrapItem>
          ))}
        </Wrap>
      )}
    </VStack>
      
  </Flex>
  );
}
