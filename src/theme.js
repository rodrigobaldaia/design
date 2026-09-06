import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

/**
 * Design system for the portfolio.
 *
 * Monochromatic, editorial, intentionally designed for both modes:
 * - Light: warm paper white, near-black ink
 * - Dark:  true-black canvas, soft off-white ink
 *
 * Components should consume the semantic tokens (`bg`, `fg`, `fg.muted`,
 * `border`, …) instead of raw `gray.*` scales so both themes stay coherent.
 */
const config = defineConfig({
  globalCss: {
    html: {
      scrollBehavior: "smooth",
    },
    body: {
      bg: "bg.canvas",
      color: "fg",
      fontFamily: "body",
      fontFeatureSettings: '"ss01"',
      WebkitFontSmoothing: "antialiased",
    },
    "::selection": {
      bg: "fg",
      color: "bg.canvas",
    },
  },

  theme: {
    tokens: {
      fonts: {
        display: {
          value: `"Space Grotesk", system-ui, -apple-system, sans-serif`,
        },
        serif: {
          value: `"Instrument Serif", Georgia, "Times New Roman", serif`,
        },
      },
    },

    semanticTokens: {
      colors: {
        bg: {
          value: { base: "#FFFFFF", _dark: "#141413" },
        },
        "bg.canvas": {
          value: { base: "#FAFAF7", _dark: "#0B0B0A" },
        },
        "bg.subtle": {
          value: { base: "#F4F4F0", _dark: "#1B1B1A" },
        },
        "bg.muted": {
          value: { base: "#ECECE7", _dark: "#242423" },
        },
        "bg.emphasized": {
          value: { base: "#E0E0DA", _dark: "#303030" },
        },
        fg: {
          value: { base: "#171717", _dark: "#F1F1EE" },
        },
        "fg.muted": {
          value: { base: "#6B6B64", _dark: "#A8A8A0" },
        },
        "fg.subtle": {
          value: { base: "#9A9A92", _dark: "#71716B" },
        },
        border: {
          value: { base: "#E6E6E0", _dark: "#262624" },
        },
        "border.emphasized": {
          value: { base: "#CFCFC7", _dark: "#3B3B39" },
        },
      },
    },
  },
});

export const system = createSystem(defaultConfig, config);
