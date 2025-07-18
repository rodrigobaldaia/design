import React, { useState } from "react";
import { MdLockOutline } from "react-icons/md";
import {
  Box,
  Button,
  Input,
  Spinner,
  Text,
  HStack,
  VStack,
  Flex,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import * as webllm from "@mlc-ai/web-llm";

export default function PaletteGenerator() {
  const [started, setStarted] = useState(false);
  const [engine, setEngine] = useState<webllm.MLCEngine | null>(null);
  const [progress, setProgress] = useState(0);
  const [busy, setBusy] = useState(false);
  const [goal, setGoal] = useState("");
  const [palette, setPalette] = useState<string[]>([]);
  const [locked, setLocked] = useState<boolean[]>([]);
  const [paletteName, setPaletteName] = useState("");

  // Load model when button clicked
  const startLoadingModel = async () => {
    setStarted(true);
    const eng = await webllm.CreateMLCEngine("Qwen3-1.7B-q4f16_1-MLC", {
      initProgressCallback: (report) => setProgress(report.progress),
    });
    setEngine(eng);
  };

  // Random hex color
  const randomHexColor = (): string => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };


  // Toggle locked
  const toggleFavorite = (index: number) => {
    setLocked((prev) => {
      const newFav = [...prev];
      newFav[index] = !newFav[index];
      return newFav;
    });
  };

  // Regenerate palette - kepp locked, randomize rest

  const regenerateNonLocked = () => {
    if (!palette.length) return;

    const newColors = palette.map((color, i) =>
      locked[i] ? randomHexColor() : color
    );

    setPalette(newColors);
  };


  // Reset the generator state
  const handleReset = () => {
    setPalette([]);
    setGoal("");
    setLocked([]);
  };


  // Generate palette + name
  const genPalette = async () => {
    if (!engine || !goal.trim()) return;
    setBusy(true);


    const prompt = `You are a colour-palette assistant.
Return ONLY a JSON object with exactly 5 different 6-digit hex codes AND a short creative name.
Do NOT include explanations or line breaks.
Do NOT reuse any example values or placeholders.

Format:
{
  "name": "Creative Name",
  "colors": ["#HEX1", "#HEX2", "#HEX3", "#HEX4", "#HEX5"]
}

Goal: typical colors of ${goal}`;

    const hexRegex = /^#([0-9a-f]{6})$/i;
    let attempts = 0;
    let colors: string[] = [];
    let name = "";

    while (attempts < 3 && (colors.length !== 5 || !name)) {
      try {
        const { choices } = await engine.chat.completions.create({
          messages: [{ role: "user", content: prompt }],
          temperature: 0.5,
          stream: false,
        });

        const content = choices[0]?.message?.content ?? "";
        const match = content.match(/\{[\s\S]*?\}/);
        if (!match) throw new Error("no JSON object found");

        const data = JSON.parse(match[0]);
        name = typeof data.name === "string" ? data.name : "";
        colors = Array.from(
          new Set(
            (data.colors ?? [])
              .filter((c: any) => typeof c === "string" && hexRegex.test(c))
              .map((c: string) => c.toUpperCase())
          )
        );
      } catch (e) {
        console.warn(`LLM attempt ${attempts + 1} failed:`, e);
      }
      attempts++;
    }

    // Fallback if LLM fails or invalid output
    if (colors.length !== 5 || !name) {
      console.info("Falling back to auto-generated palette");
      const golden = 0.61803398875;
      let h = (Math.random() * 360) | 0;
      colors = Array.from({ length: 5 }, () => {
        h = (h + golden * 360) % 360;
        const s = 65;
        const l = 55;
        return hslToHex(h, s, l);
      });
      name = "Golden Ratio Palette";
    }

    setPaletteName(name);
    setPalette(colors);
    setLocked(new Array(colors.length).fill(true));
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

  // Convert hex to rgb string
  const hexToRgb = (hex: string) => {
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `rgb(${r}, ${g}, ${b})`;
  };

  return (
    <VStack maxW="100%" w="100%" pt={6} align={"left"}>
      <Text fontSize="2xl" fontWeight={600}>
        Color Palette Generator
      </Text>
      <Text fontSize="2xl" fontWeight={400} mb={4} mt={-2} color={"gray.500"}>
        Generate a unique color palette
      </Text>

      <VStack p={12} borderRadius="lg" bg={"gray.100"} w="100%">
        {!started ? (
          <>
            <Text fontSize="xl" textAlign="center" mb={6}>
              Welcome to the AI Color Palette Generator! <br />
              This tool uses a small open-source AI model running in your browser. <br />
              Download size is approx. 500MB. No data leaves your device.
            </Text>
            <Button colorScheme="teal" size="lg" onClick={startLoadingModel} maxW={"400px"}>
              Start Generator
            </Button>
          </>
        ) : !engine ? (
          <VStack>
            <Spinner size="xl" />
            <Text>Loading model... {(progress * 100).toFixed(0)}%</Text>
          </VStack>
        ) : (
          <>
            {palette.length === 0 && (
              <>
                <Input
                  placeholder="e.g. Calm productivity app"
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  disabled={busy}
                  mb={4}
                  maxW="400px"
                />
                <Button
                  onClick={genPalette}
                  w="100%"
                  disabled={!goal.trim() || busy}
                  loading={busy} // changed `loading` to `isLoading`
                  loadingText="Generating"
                  maxW="400px"
                >
                  Generate palette
                </Button>
              </>
            )}


            {palette.length > 0 && (
              <VStack w="100%" align="start">
                <Text fontWeight="bold" fontSize="2xl">
                  {paletteName}
                </Text>

                {/* Color rectangles */}
                <Flex w="100%" overflow="hidden" borderRadius="md" h="360px" mt={4} mb={8}>
                  {palette.map((color, i) => (
                    <Box
                      key={`${color}-${i}`}
                      flex="1"
                      bg={color}
                      cursor="pointer"
                      position="relative"
                      onClick={() => toggleFavorite(i)}
                    >
                      {!locked[i] && (
                        <Box
                          position="absolute"
                          bottom={8}
                          left="50%"
                          transform="translateX(-50%)"
                          bg="none"
                          p={2}
                          borderRadius="full"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                        >
                          <MdLockOutline
                            color="gray.400"
                            size={24}
                          />
                        </Box>
                      )}
                    </Box>
                  ))}
                </Flex>

                {/* List of color values */}
                <VStack align="start" w="100%">
                  {palette.map((color, i) => (
                    <HStack>
                      <Box
                        key={i}
                        w="24px"
                        h="24px"
                        borderRadius="full"
                        bg={color}
                        border="1px solid #ccc"
                      >
                      </Box>
                      <VStack align={"start"} gap={0}>
                        <Text fontSize="sm" fontFamily="monospace">{color}</Text>
                        <Text fontSize="sm" fontFamily="monospace">{hexToRgb(color)}</Text>
                      </VStack>
                    </HStack>
                  ))}
                </VStack>
              </VStack>
            )}


            {palette.length > 0 && (
              <Flex w="100%" justifyContent="left" gap={4} mt={12}>

                <Button
                  onClick={regenerateNonLocked}
                  colorScheme="gray"
                  variant="solid"
                >
                  Shuffle
                </Button>

                <Button
                  onClick={handleReset}
                  colorScheme="gray"
                  variant="ghost"
                >
                  Reset
                </Button>

              </Flex>
            )}


          </>
        )}
      </VStack>
    </VStack>
  );
}
