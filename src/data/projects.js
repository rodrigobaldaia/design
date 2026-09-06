/**
 * Project content for the portfolio.
 *
 * Everything shown on the landing page (card) and inside the project
 * modal lives here.
 *
 * Card fields  → used by the visual-first showcase:
 *   variant     editorial layout of the card ("full" | "offset-left" |
 *               "offset-right" | "center")
 *   cardVisual  the single strong media element on the landing page
 *
 * Modal fields → extended information, revealed on demand:
 *   description, contributions, focusAreas, metric, media, links
 */

const ELGATO_APP_URL = "https://www.elgato.com/ww/en/s/wave-link-app";

export const PROJECTS = [
  {
    id: "wave-link-3",
    title: "Wave Link 3.0",
    company: "Elgato",
    year: "2026",
    subtitle: "Redesign of Elgato's audio-mixing software",
    variant: "full",
    cardVisual: {
      type: "video",
      src: "./assets/Limitless_routing_Desk.webm",
      alt: "Wave Link 3.0 interface routing audio between mixer channels",
    },
    description:
      "Wave Link 3.0 is a ground-up redesign of Elgato's audio-mixing application. The goal was to replace a rigid routing model with a flexible, visual system that scales from first-time streamers to professional broadcast engineers, without compromising Elgato's hardware support.",
    contributions: [
      "Conducted user research to inform the redesign",
      "Designed a dedicated device view for improved control and clarity",
      "Designed and iterated onboarding flows and guided setup tours",
      "Defined motion language and micro-interaction patterns",
      "Collaborated on the design of a flexible routing surface and channel architecture",
    ],
    focusAreas: [
      "Product Design",
      "Interaction Design",
      "Information Architecture",
      "User Research",
      "Motion Design",
      "Onboarding UX",
      "Design Systems",
    ],
    metric: {
      label: "Unique users (Beta)",
      value: "70.000+",
      note: "early adopters during beta",
    },
    media: [
      { src: "./assets/WL3_Routing_table.jpg", type: "image", alt: "Wave Link 3.0 mixer with the routing table open" },
      { src: "./assets/Limitless_routing_Desk.webm", type: "video", alt: "Wave Link 3.0 routing demo" },
      { src: "./assets/WL3Inputs.mp4", type: "video", grid: true, alt: "Wave Link 3.0 input channels" },
      { src: "./assets/WL3_audio_effects.jpg", type: "image", grid: true, alt: "Wave Link 3.0 audio effects panel" },
      { src: "./assets/WL3_Setup_tour.mp4", type: "video", alt: "Wave Link 3.0 guided setup tour" },
    ],
    links: [
      { label: "Learn more", href: ELGATO_APP_URL },
      { label: "Download the app", href: "https://www.elgato.com/ww/en/s/beta" },
    ],
  },
  {
    id: "wave-link-stream-deck-plugin",
    title: "Wave Link plugin for Stream Deck",
    company: "Elgato",
    year: "2026",
    subtitle: "Design of a tactile plugin for Wave Link",
    variant: "offset-right",
    cardVisual: {
      type: "image",
      src: "./assets/WaveLink3(Beta)-preview-dials.png",
      alt: "Wave Link plugin showing mixer dials on a Stream Deck+ profile",
    },
    description:
      "Bringing Wave Link's audio-mixing capabilities to the physical Stream Deck required rethinking how complex software controls translate into tangible, one-press actions. The plugin maps mixer channels, volume controls, and mute states to customizable keys, enabling hands-on control without leaving the mic.",
    contributions: [
      "Led UX and interaction design across the full redesign cycle",
      "Designed the key layout system and interaction model",
      "Created dial and key components for Stream Deck+",
      "Collaborated with the Stream Deck team to align with platform constraints",
    ],
    focusAreas: ["Visual Design", "Interaction Design", "Hardware UX", "Plugin Design"],
    media: [
      { src: "./assets/WaveLink3(Beta)-preview-dials.png", type: "image", alt: "Wave Link plugin dials preview" },
      { src: "./assets/2026-03-03T11_06_18.004592.mp4", type: "video", alt: "Wave Link plugin in use" },
      { src: "./assets/04_06_StreamDeckControl_Desktop.png", type: "image", alt: "Stream Deck control layout for Wave Link" },
    ],
    links: [
      { label: "Learn more", href: "https://www.elgato.com/de/en/explorer/products/wave/wave-link-plugin-for-stream-deck/" },
      { label: "Try it out", href: "https://marketplace.elgato.com/product/wave-link-aa41150f-9645-4275-b064-7642ba6a17ae" },
    ],
  },
  {
    id: "elgato-studio",
    title: "Elgato Studio",
    company: "Elgato",
    year: "2025",
    subtitle: "Brand-new capture app and companion Stream Deck plugin",
    variant: "full",
    cardVisual: {
      type: "image",
      src: "./assets/elgato_studio_app_game_screen_recording.png",
      alt: "Elgato Studio app recording gameplay with live preview",
    },
    description:
      "Elgato Studio consolidates recording, snapshots, and live preview into a single, lightweight app, with seamless Stream Deck integration for instant control. The challenge was making powerful workflows feel effortless, especially for first-time users.",
    contributions: [
      "Led end-to-end UX and UI design from concept to launch",
      "Designed the core interface for macOS and Windows platforms",
      "Created Stream Deck plugin layouts and key iconography",
      "Conducted usability testing with target creators",
    ],
    focusAreas: ["Product Design", "Usability Testing", "Iconography", "Cross-Platform UX", "Design Systems"],
    metric: {
      label: "Unique users",
      value: "70.000+",
      note: "users in the first 6 months after launch",
    },
    media: [
      { src: "./assets/elgato_studio_app_game_screen_recording.png", type: "image", alt: "Elgato Studio recording a game" },
      { src: "./assets/ElgatoStudio-preview-plugin.png", type: "image", alt: "Elgato Studio Stream Deck plugin preview" },
    ],
    links: [
      { label: "Download app", href: "https://www.elgato.com/ww/en/s/downloads" },
      { label: "Download plugin", href: "https://marketplace.elgato.com/product/elgato-studio-6cba5ea5-9e17-4e8b-8ea8-8476ca15042a" },
    ],
  },
  {
    id: "wave-link-2",
    title: "Wave Link 2.0",
    company: "Elgato",
    year: "2025",
    subtitle: "Streamline audio routing and AI enhanced features",
    variant: "offset-left",
    cardVisual: {
      type: "video",
      src: "./assets/WL2.0_Apps.webm",
      alt: "Wave Link 2.0 app switching between audio channels",
    },
    description:
      "Wave Link 2.0 introduced a major evolution of the routing model, replacing multi-step configuration with one-click channel assignment, while introducing AI-powered voice isolation and noise suppression.",
    contributions: [
      "Redesigned the routing flow to simplify channel assignment",
      "Designed the Voice Focus audio effect panel",
      "Designed the Sound Check feature for real-time preview of audio effects",
      "Created Stream Deck plugin layouts and iconography",
    ],
    focusAreas: ["Product Design", "AI Design", "Iconography", "User Research"],
    metric: {
      label: "Unique users",
      value: "350.000+",
      note: "users prior to the 3.0 release",
    },
    media: [
      { src: "./assets/Screenshot-2025-02-04-at-5.22.36 PM.png", type: "image", grid: true, alt: "Wave Link 2.0 mixer overview" },
      { src: "./assets/WL2.0_Apps.webm", type: "video", alt: "Wave Link 2.0 apps walkthrough" },
      { src: "./assets/AddToWaveLink.jpg", type: "image", grid: true, alt: "Adding a channel to Wave Link" },
      { src: "./assets/WaveLink20_VoiceFocus.mp4", type: "video", alt: "Voice Focus audio effect in Wave Link 2.0" },
    ],
    links: [
      { label: "Learn more", href: "https://www.elgato.com/us/en/s/wave-link" },
    ],
  },
  {
    id: "elgato-capture",
    title: "Elgato Capture",
    company: "Elgato",
    year: "2024",
    subtitle: "Design of an iPad app for Elgato capture cards",
    variant: "offset-right",
    cardVisual: {
      type: "image",
      src: "./assets/Game_Capture_Neo_Lifestyle_Shot_01.png",
      alt: "Elgato Capture app on an iPad recording a handheld console",
    },
    description:
      "Elgato Capture turns an iPad into a portable gaming monitor and recording station. The design balances low-latency performance with a touch-first interface accessible to casual gamers.",
    contributions: [
      "Designed the full iPadOS app from initial concept to App Store launch",
      "Created fullscreen monitoring, recording, and snapshot flows",
      "Produced App Store visuals and preview assets",
    ],
    focusAreas: ["Mobile UX", "iPadOS", "Accessibility"],
    metric: {
      label: "App Store Rating",
      value: "4.4★",
      note: "Elgato Capture on the App Store",
    },
    media: [
      { src: "./assets/Game_Capture_Neo_Lifestyle_Shot_01.png", type: "image", alt: "Elgato Capture with Game Capture Neo" },
      { src: "./assets/Game_Capture_Neo_Lifestyle_Shot_02.jpg", type: "image", grid: true, alt: "Game Capture Neo connected to a console" },
      { src: "./assets/Game_Capture_4K_X_Lifestyle_Shot_06_A.png", type: "image", grid: true, alt: "Game Capture 4K X setup" },
    ],
    links: [
      { label: "View iPad app", href: "https://apps.apple.com/de/app/elgato-capture/id6456798479" },
    ],
  },
  {
    id: "gritgene",
    title: "UX Research and UI for GritGene",
    company: "GritWorld",
    year: "2022–2023",
    subtitle: "Improving usability for complex 3D workflows",
    variant: "full",
    cardVisual: {
      type: "image",
      src: "./assets/gritgene.png",
      alt: "GritGene 3D engine node-based editor interface",
    },
    description:
      "GritGene is a real-time 3D rendering engine for technical artists and generative designers. The challenge was making complex node-based workflows approachable without sacrificing depth.",
    contributions: [
      "Conducted contextual inquiry sessions with 3D artists and technical directors",
      "Performed heuristic evaluation of the existing product and identified key usability issues",
      "Designed new features such as input value helpers for precision workflows",
      "Contributed to and used the design system for UI consistency and scalability",
    ],
    focusAreas: ["UX Research", "Heuristic Evaluation", "Product Design", "Design Systems"],
    media: [
      { src: "./assets/Input_value_helper.png", type: "image", alt: "Input value helper in the GritGene editor" },
      { src: "./assets/gritgene.png", type: "image", alt: "GritGene editor overview" },
    ],
    links: [],
  },
  {
    id: "net-worth-tracker",
    title: "Net Worth Tracker",
    company: "Personal project",
    year: "Personal Project",
    subtitle: "A personal finance dashboard",
    variant: "center",
    cardVisual: {
      type: "image",
      src: "./assets/iPhone_01.png",
      alt: "Net Worth Tracker app shown on an iPhone",
    },
    description:
      "A self-initiated project for tracking personal net worth across accounts, assets, and liabilities. Built to address a personal need and the gap between overly complex and overly simplistic finance tools.",
    contributions: [
      "Sole designer and product owner from concept to working product",
      "Designed the interface and underlying data model",
      "Integrated data visualization components",
      "Designed responsive layouts across mobile, tablet, and desktop",
    ],
    focusAreas: ["Product Design", "Data Visualisation", "Mobile UX", "Personal Finance", "Accessibility"],
    media: [
      { src: "./assets/iPhone_01.png", type: "image", alt: "Net Worth Tracker overview screen" },
      { src: "./assets/iPhone_02.png", type: "image", alt: "Net Worth Tracker accounts screen" },
      { src: "./assets/MacBook Pro.png", type: "image", grid: true, alt: "Net Worth Tracker on a MacBook" },
      { src: "./assets/iPhone_03.png", type: "image", grid: true, alt: "Net Worth Tracker detail screen" },
      { src: "./assets/iPhone_04.png", type: "image", alt: "Net Worth Tracker chart screen" },
    ],
    links: [],
  },
];

/**
 * Rapid visual overview of the portfolio, shown between the hero and the
 * project showcase. Deliberately mixes images and short UI videos across
 * all projects; heavy assets are excluded on purpose.
 */
export const MONTAGE = [
  { type: "image", src: "./assets/WL3_Routing_table.jpg", caption: "Wave Link 3.0 · Elgato", alt: "Wave Link 3.0 routing table" },
  { type: "video", src: "./assets/WL3Inputs.mp4", caption: "Wave Link 3.0 · Elgato", alt: "Wave Link 3.0 input channels" },
  { type: "image", src: "./assets/elgato_studio_app_game_screen_recording.png", caption: "Elgato Studio · Elgato", alt: "Elgato Studio app" },
  { type: "image", src: "./assets/iPhone_01.png", caption: "Net Worth Tracker · Personal", alt: "Net Worth Tracker on iPhone" },
  { type: "video", src: "./assets/WL2.0_Apps.webm", caption: "Wave Link 2.0 · Elgato", alt: "Wave Link 2.0 apps" },
  { type: "image", src: "./assets/ElgatoStudio-preview-plugin.png", caption: "Elgato Studio plugin · Elgato", alt: "Elgato Studio Stream Deck plugin" },
  { type: "image", src: "./assets/AddToWaveLink.jpg", caption: "Wave Link 2.0 · Elgato", alt: "Adding a channel in Wave Link" },
  { type: "image", src: "./assets/gritgene.png", caption: "GritGene · GritWorld", alt: "GritGene node editor" },
  { type: "image", src: "./assets/WaveLink3(Beta)-preview-dials.png", caption: "Wave Link plugin · Elgato", alt: "Wave Link plugin dials" },
  { type: "image", src: "./assets/Game_Capture_Neo_Lifestyle_Shot_01.png", caption: "Elgato Capture · Elgato", alt: "Elgato Capture on iPad" },
  { type: "video", src: "./assets/WL3_Setup_tour.mp4", caption: "Wave Link 3.0 · Elgato", alt: "Wave Link 3.0 setup tour" },
  { type: "image", src: "./assets/EV_EVOLVE50M_Array_Exploded_Black_nbg.png", caption: "3D Visuals · Bosch", alt: "Electro-Voice Evolve 50M exploded view render" },
  { type: "image", src: "./assets/WL3_device_view.jpg", caption: "Wave Link 3.0 · Elgato", alt: "Wave Link 3.0 device view" },
  { type: "image", src: "./assets/MacBook Pro.png", caption: "Net Worth Tracker · Personal", alt: "Net Worth Tracker on MacBook" },
];

/** 3D product visuals created at Bosch Communications & Conference Systems. */
export const BOSCH_MEDIA = [
  { src: "./assets/EV_EVOLVE50M_Array_Exploded_Black_nbg.png", type: "image", href: "https://products.electrovoice.com/emea/en/evolve-50m/", label: "See product page", alt: "Electro-Voice Evolve 50M column array, exploded view", maxH: "600px" },
  { src: "./assets/EV_MTS-6154-43_Cardioid_Hero_GrilleOff_nbg.png", type: "image", href: "https://products.electrovoice.com/emea/en/mts/", label: "See product page", alt: "Electro-Voice MTS loudspeaker with grille off", aspectRatio: 1 },
  { src: "./assets/DBP_Bottom.png", type: "image", href: "https://products.rtsintercoms.com/na/en/dbp/", label: "See product page", alt: "RTS DBP beltpack, bottom view", aspectRatio: 1 },
  { src: "./assets/Everse8_02.png", type: "image", href: "https://products.electrovoice.com/emea/en/everse-8/", label: "See product page", alt: "Electro-Voice Everse 8 portable loudspeaker", maxH: "600px" },
];
