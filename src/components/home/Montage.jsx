import { useEffect, useRef, useState } from "react";
import { Box, Flex } from "@chakra-ui/react";
import { MONTAGE } from "../../data/projects";
import SmartVideo from "./SmartVideo";
import { useReducedMotion } from "../../hooks/useReducedMotion";

/**
 * Montage — full-width, auto-playing visual overview of the portfolio.
 *
 * Cycles through project images and short UI recordings with a crossfade
 * and a slow zoom. Only a small window of items around the active slide is
 * mounted (lazy loading), and the timer runs only while the section is in
 * view. Videos play muted/looped; only the active layer decodes.
 *
 * With `prefers-reduced-motion`, renders a static collage instead.
 */

const IMAGE_MS = 1900;
const VIDEO_MS = 2800;

const StaticCollage = () => {
  const images = MONTAGE.filter((m) => m.type === "image").slice(0, 4);
  return (
    <Box as="section" aria-label="Overview of portfolio projects" px={{ base: 6, md: 8 }} py={{ base: 10, md: 16 }}>
      <Flex maxW="1240px" mx="auto" direction={{ base: "column", md: "row" }} gap={4}>
        <Flex direction="column" gap={4} flex="1">
          {[images[0], images[2]].filter(Boolean).map((m) => (
            <img
              key={m.src}
              src={m.src}
              alt={m.alt}
              loading="lazy"
              decoding="async"
              style={{ width: "100%", aspectRatio: "4 / 3", objectFit: "cover", borderRadius: "16px", display: "block" }}
            />
          ))}
        </Flex>
        <Flex direction="column" gap={4} flex="1" mt={{ base: 0, md: 12 }}>
          {[images[1], images[3]].filter(Boolean).map((m) => (
            <img
              key={m.src}
              src={m.src}
              alt={m.alt}
              loading="lazy"
              decoding="async"
              style={{ width: "100%", aspectRatio: "4 / 3", objectFit: "cover", borderRadius: "16px", display: "block" }}
            />
          ))}
        </Flex>
      </Flex>
    </Box>
  );
};

const Montage = () => {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef(null);
  const [inView, setInView] = useState(false);
  const [index, setIndex] = useState(0);

  // Timer only advances while the montage is actually on screen.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.35 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const item = MONTAGE[index];

  useEffect(() => {
    if (!inView || prefersReducedMotion) return undefined;
    const ms = item.type === "video" ? VIDEO_MS : IMAGE_MS;
    const t = setTimeout(() => setIndex((i) => (i + 1) % MONTAGE.length), ms);
    return () => clearTimeout(t);
  }, [index, inView, prefersReducedMotion, item.type]);

  if (prefersReducedMotion) return <StaticCollage />;

  // Mount a small window of layers around the active one so crossfades
  // work without keeping every asset in the DOM.
  const layers = new Set();
  for (let k = index - 1; k <= index + 2; k++) {
    layers.add((k + MONTAGE.length) % MONTAGE.length);
  }

  return (
    <Box
      as="section"
      ref={sectionRef}
      aria-label="Rapid visual overview of portfolio projects"
      position="relative"
      height={{ base: "64vh", md: "min(86vh, 56rem)" }}
      overflow="hidden"
      bg="bg.muted"
    >
      {MONTAGE.map((m, i) => {
        if (!layers.has(i)) return null;
        const active = i === index;
        return (
          <Box key={m.src} className={`montage-layer${active ? " active" : ""}`} aria-hidden={!active}>
            {m.type === "image" ? (
              <img
                src={m.src}
                alt={active ? m.alt : ""}
                className="montage-zoom"
                loading={i === 0 ? "eager" : "lazy"}
                decoding="async"
              />
            ) : (
              <SmartVideo
                src={m.src}
                paused={!active}
                preload={active || i === (index + 1) % MONTAGE.length ? "auto" : "metadata"}
                aria-label={m.alt}
              />
            )}
          </Box>
        );
      })}

      {/* Caption + progress */}
      <Box
        position="absolute"
        inset="auto 0 0 0"
        pt={16}
        pb={{ base: 4, md: 6 }}
        px={{ base: 4, md: 8 }}
        bgGradient="to-t"
        gradientFrom="rgba(0,0,0,0.45)"
        gradientTo="transparent"
        pointerEvents="none"
      >
        <Flex justify="space-between" align="flex-end" gap={4}>
          <Box
            key={item.caption}
            className="montage-caption"
            as="p"
            fontSize={{ base: "2xs", md: "xs" }}
            fontWeight={600}
            letterSpacing="0.14em"
            textTransform="uppercase"
            color="white"
          >
            {item.caption}
          </Box>

          <Flex
            as="nav"
            aria-label="Montage slides"
            gap={1.5}
            pointerEvents="auto"
            py={1}
          >
            {MONTAGE.map((m, i) => (
              <Box
                key={m.src}
                as="button"
                aria-label={`Show slide ${i + 1} of ${MONTAGE.length}: ${m.caption}`}
                display="flex"
                alignItems="center"
                h="16px"
                px={0.5}
                py={0}
                cursor="pointer"
                onClick={() => setIndex(i)}
              >
                <Box
                  as="span"
                  display="block"
                  w={i === index ? "22px" : "7px"}
                  h="3px"
                  borderRadius="full"
                  bg={i === index ? "white" : "rgba(255,255,255,0.45)"}
                  transition="all 0.3s ease"
                />
              </Box>
            ))}
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
};

export default Montage;
