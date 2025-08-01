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
} from "@chakra-ui/react";
import { Toaster, toaster } from "../components/ui/toaster"
import * as webllm from "@mlc-ai/web-llm";
import tinycolor from "tinycolor2";
import { base } from "framer-motion/client";
import Lottie from 'lottie-react';
import paletteAnimation from '../assets/paletteAnimation.json';
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
    const eng = await webllm.CreateMLCEngine("Qwen3-0.6B-q4f16_1-MLC", {
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


  // Generate palette + name
  const genPalette = async () => {
    if (!engine || !goal.trim()) return;
    setBusy(true);


    const prompt = `You are a colour-palette assistant.
Return ONLY a JSON object with exactly 5 different 6-digit hex codes using **principles of color theory** AND a short creative name.
Choose ONE color theory that best fits the goal: complementary, split‑complementary, triadic, tetradic, analogous, or monochromatic.
Do NOT include explanations or line breaks.
Do NOT reuse any example values or placeholders
Do NOT include any duplicate colors in the list, #000000 or #FFFFFF.

**Color‑theory constraints**
- Pick a clear harmony and keep hue relationships consistent with it.
- Avoid near‑duplicates. Space hues or L values so each color has a distinct role.

Format:
{
  "name": " ",
  "colors": ["#HEX1", "#HEX2", "#HEX3", "#HEX4", "#HEX5"]
}

Goal: ${goal}`;

    const hexRegex = /^#([0-9a-f]{6})$/i;
    let attempts = 0;
    let colors: string[] = [];
    let name = "";

    while (attempts < 3 && (colors.length !== 5 || !name)) {
      try {
        const { choices } = await engine.chat.completions.create({
          messages: [{ role: "user", content: prompt }],
          temperature: 0.3,
          stream: false,
        });

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

    console.log("Final palette:", colors, "Name:", name);
    setPaletteName(name);
    setPalette(colors);
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
    <VStack maxW="100%" w="100%" pt={6} px={{ base: 8, xl: 0 }} align={"left"}>
      <Text fontSize="2xl" fontWeight={600}>
        Design smarter palettes
      </Text>
      <Text fontSize="2xl" fontWeight={400} mb={8} mt={-2} color={"gray.500"}>
        Create color palettes using a local AI model that runs directly in your browser
      </Text>

      <Box
        position="relative"
        w="100%"
        borderRadius="lg"
        borderWidth="2px"
        borderColor="gray.300"
        overflow="hidden"
        p={0}
        mb={12}
      >
        {/* Background Lottie */}
        {(palette.length === 0 || busy) && (
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
              position="absolute"
              top="50%"
              left="50%"
              transform="translate(-50%, -50%)"
              w="350%"
              h="350%"
            >
              <Lottie
                animationData={GradientBackground}
                loop
                autoplay
                style={{
                  width: '100%',
                  height: '100%',
                }}
              />
            </Box>
          </Box>
        )}

        {/* Foreground content */}
        <VStack
          align="start"
          justify="center"
          p={{ base: 8, xl: 12 }}
          w="100%"
          position="relative"
          zIndex={1}
        >
          {!started ? (
            isSupportedBrowserOrDevice() ? (
              <>
                <VStack ref={welcomeRef} align="start" width="100%" gap={8} aspectRatio={1.5} justify="center">

                  <Box
                    bg="gray.100"          // grey background
                    borderWidth="1px"
                    borderColor="gray.300"
                    borderRadius="lg"
                    p={{ base: 8, md: 12 }} // padding
                    boxShadow="sm"
                    mx="auto"           // center horizontally if width < 100%
                    w={{ base: "100%", sm: "auto" }}
                    maxW={{ base: "none", md: "30rem" }}         // match your content width constraint
                    alignItems={"center"}
                  >
                    <VStack gap={8}>
                      <Text fontSize="lg" fontWeight="bold" gap={2}>
                      Welcome to the Color Palette Generator
                    </Text>
                      <Text fontSize="md" mb={2}>
                    This tool runs entirely in your browser.
                    A one-time 500MB model download is required to get started.
                  </Text>

                  <Button
                    variant="solid"
                    onClick={startLoadingModel}>
                    Start Generating
                  </Button>
                    </VStack>
                  </Box>

                  {/*<Lottie animationData={paletteAnimation} loop autoplay
                    style={{ width: "100%" }} />*/}

                </VStack>

              </>
            ) : (
              <VStack px={{ base: 4, md: 8 }} textAlign="center">
                <Box w="full" maxW="300px" borderRadius="lg" overflow="hidden">
                  <img src="/fallback-preview.png" alt="Preview of color palette tool" width="100%" />
                </Box>
                <Text fontSize={{ base: "md", md: "lg" }} color="gray.600">
                  This tool only works on desktop browsers like Chrome or Edge.<br />
                  Please try again from a supported device.
                </Text>
              </VStack>

            )
          ) : !engine ? (
            <VStack
              w="100%"
              justify="center"
              align="center"
              gap={8}
              style={{ height: welcomeHeight ? `${welcomeHeight}px` : "auto" }}
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
                maxW={{ base: "none", md: "30rem" }}         // match your content width constraint
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
                    <Text fontSize="md" fontWeight="bold" gap={2}>
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
                        <VStack gap={4} align="start">
                          <Text fontSize={{ base: "md", md: "lg" }} fontWeight="bold" textAlign="start">
                            Describe the vibe you’re going for
                          </Text>

                          <Text fontSize={{ base: "sm", md: "md" }} textAlign={{ base: "center", md: "left" }}>
                            Enter a name, keywords or a HEX code to set the mood.
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
                            Generating your palette… this may take 1–2 minutes depending on your prompt.
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
                    h="48vh"
                    mt={4}
                    rounded="md"
                    gap={4}
                  >

                    {palette.map((color, i) => (
                      <VStack key={`swatch-${i}`} w="100%" h="100%" gap={4}>
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
                          height="100%"
                          w={"100%"}
                          rounded={"md"}
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
        </VStack>
      </Box>
    </VStack>
  );
}
