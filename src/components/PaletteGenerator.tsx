import React, { useState, useEffect, useRef } from "react";
import { MdLock, MdLockOpen } from "react-icons/md";
import { LuCopy } from "react-icons/lu";
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
  Center,
  IconButton,
  Image,
} from "@chakra-ui/react";
import { Toaster, toaster } from "../components/ui/toaster"
import * as webllm from "@mlc-ai/web-llm";
import Lottie from 'lottie-react';
import GradientBackground from '../assets/GradientBackground.json';


type GPU = any;
declare global {
  interface Navigator {
    gpu?: GPU;
  }
}

function addSpacesToName(name: string): string {
  return name.replace(/([a-z])([A-Z])/g, '$1 $2').trim();
}

export default function PaletteGenerator() {
  const [started, setStarted] = useState(false);
  const [engine, setEngine] = useState<webllm.MLCEngine | null>(null);
  const [progress, setProgress] = useState(0);
  const [busy, setBusy] = useState(false);
  const [goal, setGoal] = useState("");
  const [palette, setPalette] = useState<string[]>([]);
  const [locked, setLocked] = useState<boolean[]>([]);
  const [paletteName, setPaletteName] = useState("");
  const [welcomeHeight, setWelcomeHeight] = useState<number | null>(null);
  const welcomeRef = useRef<HTMLDivElement>(null);
  const lockedRef = useRef<boolean[]>([]);
  const supported = isSupportedBrowserOrDevice();



  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toaster.create({
        title: `Color ${text} copied to clipboard.`,
        duration: 2000,
        closable: false,
        type: "success",
      });
    } catch (err) {
      toaster.create({
        title: 'Copy failed!',
        description: 'Could not copy to clipboard.',
        duration: 2000,
        closable: true,
      });
      console.error("Failed to copy!", err);
    }
  };

  // Load model when button clicked
  const startLoadingModel = async () => {
    setStarted(true);
    const eng = await webllm.CreateMLCEngine("TinyLlama-1.1B-Chat-v1.0-q4f16_1-MLC", {
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
      const newLocked = [...prev];
      newLocked[index] = !newLocked[index];
      lockedRef.current = newLocked; // sync ref
      return newLocked;
    });

  };

  // Regenerate palette - keep locked, randomize rest

  const regenerateNonLocked = () => {
    if (!palette.length) return;

    const newColors = palette.map((color, i) =>
      lockedRef.current[i] ? color : randomHexColor()
    );

    setPalette(newColors);
  };



  // Reset the generator state
  const handleReset = () => {
    setPalette([]);
    setGoal("");
    setLocked([]);
  };

  // Better name using second prompt
  function getBetterPaletteNameLocally(goal: string): string {
    const adjectives = [
      // Energetic & Bold
  "Vibrant", "Bold", "Radiant", "Dynamic", "Electric",
  "Fiery", "Striking", "Lively", "Dazzling", "Intense",
  "Vivid", "Brilliant", "Punchy", "Spirited", "Dramatic",

  // Calm & Tranquil
  "Tranquil", "Peaceful", "Serene", "Gentle", "Soothing",
  "Mellow", "Balanced", "Delicate", "Light", "Tender",
  "Airy", "Subtle", "Graceful", "Quiet", "Pastel",

  // Nature-Inspired
  "Lush", "Earthy", "Fresh", "Botanical", "Woody",
  "Floral", "Rustic", "Natural", "Breezy", "Wild",
  "Misty", "Oceanic", "Forest", "Meadow", "Desert",

  // Warm & Cozy
  "Warm", "Golden", "Sunny", "Glowing", "Fiery",
  "Toasty", "Amber", "Honeyed", "Rusty", "Crimson",
  "Cozy", "Candlelit", "Autumnal", "Hearty", "Inviting",

  // Cool & Icy
  "Cool", "Icy", "Chilly", "Frosted", "Crystal",
  "Arctic", "Snowy", "Silvery", "Glacial", "Azure",
  "Wintry", "Polar", "Frozen", "Shimmery", "Moonlit",

  // Dark & Moody
  "Moody", "Dusky", "Stormy", "Shadowy", "Mystic",
  "Velvety", "Smoky", "Obsidian", "Twilight", "Deep",
  "Nocturnal", "Midnight", "Dusk", "Enigmatic", "Gothic",

  // Playful & Dreamy
  "Dreamy", "Whimsical", "Playful", "Cheerful", "Sparkling",
  "Candy", "Magical", "Ethereal", "Soft", "Sweet",
  "Fairy", "Cloudy", "Iridescent", "Fantasy", "Charming",

  // Modern & Sleek
  "Muted", "Dusty", "Minimal", "Neutral", "Refined",
  "Polished", "Clean", "Elegant", "Smooth", "Sophisticated",
  "Classic", "Timeless", "Modern", "Chic", "Balanced"
    ];

    // Clean and extract valid words from goal
    const words = goal
      .split(/\s+/)
      .map(word =>
        word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      )
      .filter(word =>
        /^[A-Za-z]+$/.test(word) &&
        !["Color", "Palette", "The", "And", "Of", "With", "A"].includes(word)
      );

    const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];

    // Use a word from the goal or a fallback noun
    const noun = words.length > 0
      ? words[Math.floor(Math.random() * words.length)]
      : ["Sunset", "Ocean", "Forest", "Lagoon", "Sky", "Twilight"][Math.floor(Math.random() * 6)];

    return `${adjective} ${noun}`;
  }


  // Generate palette + name
  const genPalette = async () => {
    if (!engine || !goal.trim()) return;
    setBusy(true);


    const prompt = `
Respond ONLY with a valid JSON object in exactly this format:

{
  "name": "<palette name based on the theme '${goal}'>",
  "colors": ["#RRGGBB", "#RRGGBB", "#RRGGBB", "#RRGGBB", "#RRGGBB"]
}

Requirements:
- "name" must be a short, creative palette name related to "${goal}".
- "colors" must contain exactly 5 unique hex color codes in 6-digit uppercase format (#RRGGBB).
- Do not repeat any hex value.
- Do not use pure black (#000000), pure white (#FFFFFF), or pure red (#FF0000).
- Avoid common "default" values (like #808080, #C0C0C0, #00FF00, #0000FF).
- Colors must clearly reflect the theme "${goal}".
- Select colors using ONE color theory: complementary, split-complementary, triadic, tetradic, analogous, or monochromatic.
- Do not output color names, explanations, or comments.
- Output must be valid JSON with no extra text before or after.
`;

    const hexRegex = /^#([0-9a-f]{6})$/i;
    let attempts = 0;
    let colors: string[] = [];
    let name = "";

    while (attempts < 2 && (colors.length !== 5 || !name)) {
      try {
        console.time("Palette generation");
        const { choices } = await engine.chat.completions.create({
          messages: [{ role: "user", content: prompt }],
          temperature: 0.2,
          stream: false,
        });

        console.timeEnd("Palette generation");
        const content = choices[0]?.message?.content ?? "";
        console.log("Model output:", content); // Add this line
        const match = content.match(/\{[\s\S]*?\}/);
        if (!match) throw new Error("no JSON object found");

        const data = JSON.parse(match[0]);
        name = typeof data.name === "string" ? addSpacesToName(data.name) : "";
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
      name = addSpacesToName("GoldenRatioPalette");
    }

    // Ask for better name using second prompt
    const finalName = getBetterPaletteNameLocally(goal);


    console.log("Final palette:", colors, "Name:", finalName);
    setPaletteName(addSpacesToName(finalName));
    // Replace #FFFFFF with light grey (e.g., #DDDDDD)
    // and #000000 with dark grey (e.g., #222222)
    const sanitizedColors = colors.map((c) => {
      const color = c.toUpperCase();
      if (color === "#FFFFFF") return "#F4FCFB";
      if (color === "#000000") return "#273B56";
      return color;
    });

    setPalette(sanitizedColors);


    setLocked(new Array(colors.length).fill(false));
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

  function isSupportedBrowserOrDevice(): boolean {
    const isMobile = /Mobi|Android/i.test(navigator.userAgent);
    const hasWebGPU = typeof navigator.gpu !== "undefined";

    return !isMobile && hasWebGPU;
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.code === "Space") {
      e.preventDefault();
      regenerateNonLocked();
    }
  };

  useEffect(() => {
    if (palette.length === 0) return;

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [palette]);

  useEffect(() => {
    if (welcomeRef.current && welcomeHeight === null) {
      const rect = welcomeRef.current.getBoundingClientRect();
      setWelcomeHeight(rect.height);
    }
  }, [welcomeRef.current]);



  return (
    <VStack maxW="100%" w="100%" align={"left"}>
      <Box
        position="relative"
        w="100%"
        borderRadius="lg"
        overflow="hidden"
      >
        {/* Background animation */}
        {(palette.length === 0 || busy) && supported && (
          <Box
            position="absolute"
            top={0}
            left={0}
            w="100%"
            h="100%"
            zIndex={0}
            pointerEvents="none"
            overflow="hidden"
          >
            <Box
              position="relative"
              top="50%"
              left="50%"
              transform="translate(-50%, -50%)"
              w="350%"
              h="350%"
              opacity={"60%"}
            >
              <Lottie
                animationData={GradientBackground}
                loop
                autoplay
                renderer="svg"
                style={{ width: "100%", height: "100%" }}
              />
            </Box>
          </Box>
        )}

        {/* Foreground content */}
        <VStack align="start" justify="center" w="100%" position="relative" zIndex={1}>
          {/* UNSUPPORTED DEVICE */}
          {!started && !supported && (
            <Box w="100%">
              <VStack textAlign="center" w="100%" gap={{ base: 4, md: 8 }}>
                <Box borderRadius="lg" overflow="hidden" w={"100%"} borderWidth="1px" borderColor="gray.200">
                  <video width="100%" autoPlay loop muted>
                    <source src="./assets/ToolPreview.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </Box>
                <Text fontSize={{ base: "md", md: "lg" }} color="gray.600" textAlign="left" w={"100%"}>
                  Oops! This tool is available only in supported desktop browsers. Please use Chrome, Edge, or Firefox to try it.
                </Text>
              </VStack>
            </Box>
          )}

          {/* SUPPORTED DEVICE */}
          {supported && (
            <Box w="100%"
              p={8}
              borderRadius="lg"
              borderWidth="2px"
              borderColor="gray.300"
            >

              {!started ? (
                <VStack
                  ref={welcomeRef}
                  align="start"
                  width="100%"
                  gap={8}
                  aspectRatio={1.5}
                  justify="center"
                >
                  <Box
                    bg="gray.100"
                    borderWidth="1px"
                    borderColor="gray.300"
                    borderRadius="lg"
                    p={{ base: 8, md: 12 }}
                    boxShadow="sm"
                    mx="auto"
                    w={{ base: "100%", sm: "auto" }}
                    maxW={{ base: "none", md: "30rem" }}
                    alignItems="center"
                  >
                    <VStack gap={6}>
                      <Text fontSize="lg" fontWeight="bold" textAlign={"center"}>
                        Design starts with the right colors
                      </Text>
                      <Text fontSize="md" mb={2} textAlign={"center"}>
                        Welcome! This tool creates color palettes right in your browser.
                        To get started, you’ll just need a one-time model download.
                      </Text>
                      <Button variant="solid" onClick={startLoadingModel}>
                        Start Creating
                      </Button>
                    </VStack>
                  </Box>
                </VStack>
              ) : !engine ? (
                <VStack
                  w="100%"
                  justify="center"
                  align="center"
                  gap={8}
                  style={{ height: welcomeHeight ? `${welcomeHeight}px` : "auto" }}
                >
                  <Box
                    bg="gray.100"
                    borderWidth="1px"
                    borderColor="gray.300"
                    borderRadius="lg"
                    p={{ base: 8, md: 12 }}
                    boxShadow="sm"
                    mx="auto"
                    w={{ base: "100%", sm: "full" }}
                    maxW={{ base: "none", md: "30rem" }}
                    alignItems={"center"}
                  >
                    <Center pb={8} pt={4}>
                      <Spinner size="xl" />
                    </Center>
                    <VStack gap={2}>
                      {progress > 0 ? (
                        <Text fontSize="md" fontWeight="bold">
                          Initializing model... {(progress * 100).toFixed(0)}%
                        </Text>
                      ) : (
                        <Text fontSize="md" fontWeight="bold">
                          Initializing model...
                        </Text>
                      )}
                      <Text fontSize="sm" color="gray.500" textAlign={"center"}>
                        Just a moment while we get everything ready.
                      </Text>
                    </VStack>
                  </Box>
                </VStack>
              ) : (
                <>
                  {palette.length === 0 && (
                    <>
                      <VStack
                        w="100%"
                        justify="center"
                        align="center"
                        gap={8}
                        style={{
                          height: welcomeHeight ? `${welcomeHeight}px` : "auto",
                          overflow: "hidden",
                        }}
                      >
                        <Box
                          bg="gray.100"          // grey background
                          borderWidth="1px"
                          borderColor="gray.300"
                          borderRadius="lg"
                          p={{ base: 8, md: 12 }} // padding
                          boxShadow="sm"
                          mx="auto"              // center horizontally if width < 100%
                          w={{ base: "100%", sm: "auto" }}
                          maxW={{ base: "20rem", md: "30rem" }}
                        >
                          <VStack gap={8} align="start">
                            <VStack gap={4} align="center" w={"100%"}>
                              <Text fontSize={{ base: "md", md: "lg" }} fontWeight="bold" textAlign="center">
                                Describe the vibe you’re going for
                              </Text>

                              <Text fontSize={{ base: "sm", md: "md" }} textAlign={{ base: "center", md: "center" }}>
                                Enter a name or keywords to set the mood
                              </Text>
                            </VStack>

                            <VStack gap={2} align="center" w="100%">
                              <Input
                                placeholder="Vibrant Beach Vibe"
                                value={goal}
                                onChange={(e) => setGoal(e.target.value)}
                                disabled={busy}
                              // Let the container control width; remove maxW here
                              />

                              <Button
                                onClick={genPalette}
                                disabled={!goal.trim() || busy}
                                loading={busy}
                                loadingText="Generating"
                                w="full"
                              >
                                Generate Palette
                              </Button>
                            </VStack>

                            {busy && palette.length === 0 && (
                              <Text fontSize="sm" color="gray.500" mt={2} textAlign="center">
                                Generating your palette… this may take a few seconds.
                              </Text>
                            )}
                          </VStack>
                        </Box>
                      </VStack>

                    </>
                  )}


                  {palette.length > 0 && (
                    <VStack w="100%" align="start">
                      <Text fontWeight="bold" fontSize="2xl">
                        {paletteName}
                      </Text>

                      <Box mt={4} w="100%">
                        <Text
                          fontSize="lg"
                          color="fg.subtle"
                        >
                          Press the spacebar to shuffle unlocked colors.
                        </Text>
                      </Box>

                      {/* Color rectangles */}
                      <Flex
                        w="100%"
                        direction={{ base: "column", md: "row" }}
                        overflow="hidden"
                        borderRadius="md"
                        h="40vh"
                        mt={4}
                        rounded="md"
                        gap={4}
                        flexWrap="nowrap"
                        align="stretch"
                      >

                        {palette.map((color, i) => (
                          <VStack
                            key={`swatch-${i}`}
                            w="100%"
                            h="100%"
                            flex="1 1 0"
                            minH={0}
                            gap={{ base: "2", md: "4" }}
                            align="stretch"
                          >
                            <Box
                              flex="1"
                              bg={color}
                              cursor="pointer"
                              position="relative"
                              className="group"
                              display="flex"
                              flexDirection="column"
                              justifyContent="flex-end"
                              alignItems="center"
                              rounded="md"
                              w="100%"
                              minH={"8rem"}
                            >
                              {/* Buttons container */}
                              <VStack
                                position="absolute"
                                top={4}
                                right={4}
                                gap={2}
                              >
                                <IconButton
                                  size="xs"
                                  variant="subtle"
                                  aria-label={locked[i] ? "Unlock color" : "Lock color"}
                                  opacity={locked[i] ? 1 : 0}
                                  _groupHover={locked[i] ? undefined : { opacity: 1 }}
                                  transition="opacity 0.2s"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleFavorite(i);
                                  }}
                                  pointerEvents={locked[i] ? "auto" : "auto"}
                                >
                                  {locked[i] ? <MdLock /> : <MdLockOpen />}
                                </IconButton>

                                <IconButton
                                  size="xs"
                                  variant="subtle"
                                  aria-label="Copy color"
                                  opacity={0}
                                  _groupHover={{ opacity: 1 }}
                                  transition="opacity 0.2s"
                                  onClick={() => copyToClipboard(color)}
                                >
                                  <LuCopy />
                                </IconButton>

                              </VStack>

                              {/* Color display box */}
                              <Box
                                bg={color}
                                borderRadius="md"
                                w="100%"
                                h="100px"
                              />
                            </Box>
                            <Text
                              w={"100%"}
                              fontSize="lg"
                              color="fg"
                              px={2}
                              flexShrink={0}
                            >
                              {color}
                            </Text>
                          </VStack>


                        ))}
                      </Flex>
                    </VStack>
                  )}

                  {palette.length > 0 && (
                    <Flex w="100%" justifyContent="left" gap={4} mt={8}>

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
                        Start Over
                      </Button>

                    </Flex>
                  )}


                </>
              )}
            </Box>
          )}
        </VStack>
      </Box>
    </VStack>
  );
}
