/**
 * Home.jsx — Refactored Portfolio Page
 * Rodrigo Prata Baldaia · UX Designer
 *
 * Component tree:
 *   Home
 *   ├── LightboxProvider     (context + portal-rendered modal)
 *   │   └── LightboxModal    (fullscreen overlay, keyboard + swipe nav)
 *   ├── HeroSection          (unchanged: intro + scroll CTA)
 *   ├── ProjectSection       (reusable per project)
 *   │   ├── ProjectHeader    (year · title · description)
 *   │   └── ProjectGallery   (media items with fade-in + click-to-open)
 *   ├── OtherCreativeSection (Bosch / 3D visuals block)
 *   └── ScrollToTopButton    (fixed FAB)
 */

import { useLocation } from "react-router-dom";
import {
  Text,
  Box,
  Button,
  Image,
  Flex,
  Heading,
  Grid,
  IconButton,
  Link,
  VStack,
  Container,
} from "@chakra-ui/react";
import { ArrowDown, ArrowUp, X, ChevronLeft, ChevronRight } from "lucide-react";
import { RxArrowTopRight } from "react-icons/rx";
import {
  useRef,
  useEffect,
  useState,
  useCallback,
  createContext,
  useContext,
} from "react";
import { createPortal } from "react-dom";

// ---------------------------------------------------------------------------
// Global CSS — keyframes + lightbox transitions + hover hint
// ---------------------------------------------------------------------------
const globalStyles = `
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes lbFadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes lbScaleIn {
    from { opacity: 0; transform: scale(0.94); }
    to   { opacity: 1; transform: scale(1); }
  }
  .lb-overlay  { animation: lbFadeIn  0.22s ease forwards; }
  .lb-media    { animation: lbScaleIn 0.28s cubic-bezier(0.16,1,0.3,1) forwards; }
  .media-item  { cursor: zoom-in; }
  .media-item:hover .media-hint { opacity: 1 !important; }
`;

// ---------------------------------------------------------------------------
// LightboxContext
// ---------------------------------------------------------------------------
const LightboxContext = createContext(null);
const useLightbox = () => useContext(LightboxContext);

// ---------------------------------------------------------------------------
// LightboxModal — rendered into document.body via portal
// ---------------------------------------------------------------------------
const LightboxModal = ({ state, onClose, onPrev, onNext }) => {
  const { items, index } = state;
  const item = items[index];
  const hasMultiple = items.length > 1;
  const touchStart = useRef(null);

  const handleTouchStart = (e) => { touchStart.current = e.touches[0].clientX; };
  const handleTouchEnd = (e) => {
    if (touchStart.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStart.current;
    if (Math.abs(delta) > 50) delta < 0 ? onNext() : onPrev();
    touchStart.current = null;
  };

  return (
    <Box
      className="lb-overlay"
      position="fixed"
      inset={0}
      zIndex={9999}
      bg="rgba(0,0,0,0.60)"
      backdropFilter="blur(14px)"
      display="flex"
      alignItems="center"
      justifyContent="center"
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* ── Close ── */}
      <IconButton
        aria-label="Close lightbox"
        position="fixed"
        top={4}
        right={4}
        zIndex={10}
        size="sm"
        rounded="full"
        bg="rgba(255,255,255,0.1)"
        color="white"
        border="1px solid rgba(255,255,255,0.15)"
        _hover={{ bg: "rgba(255,255,255,0.2)" }}
        onClick={onClose}
      >
        <X size={16} />
      </IconButton>

      {/* ── Prev ── */}
      {hasMultiple && (
        <IconButton
          aria-label="Previous"
          position="fixed"
          left={4}
          top="50%"
          transform="translateY(-50%)"
          zIndex={10}
          size="md"
          rounded="full"
          bg="rgba(255,255,255,0.1)"
          color="white"
          border="1px solid rgba(255,255,255,0.15)"
          _hover={{ bg: "rgba(255,255,255,0.2)" }}
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
        >
          <ChevronLeft size={20} />
        </IconButton>
      )}

      {/* ── Media ── */}
      <Box
        className="lb-media"
        key={`${item.src}-${index}`}
        maxW={{ base: "100vw", md: "90vw" }}
        maxH="90vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
        px={{ base: 2, md: hasMultiple ? 16 : 8 }}
        onClick={(e) => e.stopPropagation()}
      >
        {item.type === "video" ? (
          <video
            key={item.src}
            autoPlay
            loop
            muted
            playsInline
            controls
            style={{
              maxWidth: "100%",
              maxHeight: "88vh",
              borderRadius: "12px",
              display: "block",
            }}
          >
            <source
              src={item.src}
              type={item.src.endsWith(".webm") ? "video/webm" : "video/mp4"}
            />
          </video>
        ) : (
          <img
            src={item.src}
            alt=""
            style={{
              maxWidth: "100%",
              maxHeight: "88vh",
              borderRadius: "12px",
              objectFit: "contain",
              display: "block",
            }}
          />
        )}
      </Box>

      {/* ── Next ── */}
      {hasMultiple && (
        <IconButton
          aria-label="Next"
          position="fixed"
          right={4}
          top="50%"
          transform="translateY(-50%)"
          zIndex={10}
          size="md"
          rounded="full"
          bg="rgba(255,255,255,0.1)"
          color="white"
          border="1px solid rgba(255,255,255,0.15)"
          _hover={{ bg: "rgba(255,255,255,0.2)" }}
          onClick={(e) => { e.stopPropagation(); onNext(); }}
        >
          <ChevronRight size={20} />
        </IconButton>
      )}

      {/* ── Dot indicators ── */}
      {hasMultiple && (
        <Flex
          position="fixed"
          bottom={6}
          left="50%"
          transform="translateX(-50%)"
          gap={2}
          zIndex={10}
        >
          {items.map((_, i) => (
            <Box
              key={i}
              as="button"
              w={i === index ? "20px" : "6px"}
              h="6px"
              borderRadius="full"
              bg={i === index ? "white" : "rgba(255,255,255,0.3)"}
              transition="all 0.25s ease"
              cursor="pointer"
              onClick={(e) => { e.stopPropagation(); }}
            />
          ))}
        </Flex>
      )}
    </Box>
  );
};

// ---------------------------------------------------------------------------
// LightboxProvider — wraps the page; exposes openLightbox(items, index)
// ---------------------------------------------------------------------------
const LightboxProvider = ({ children }) => {
  const [state, setState] = useState({ open: false, items: [], index: 0 });

  const openLightbox = useCallback((items, index) => {
    setState({ open: true, items, index });
    document.body.style.overflow = "hidden";
  }, []);

  const closeLightbox = useCallback(() => {
    setState((s) => ({ ...s, open: false }));
    document.body.style.overflow = "";
  }, []);

  const prev = useCallback(() =>
    setState((s) => ({ ...s, index: (s.index - 1 + s.items.length) % s.items.length })),
  []);

  const next = useCallback(() =>
    setState((s) => ({ ...s, index: (s.index + 1) % s.items.length })),
  []);

  // Keyboard nav
  useEffect(() => {
    if (!state.open) return;
    const handle = (e) => {
      if (e.key === "Escape")      closeLightbox();
      if (e.key === "ArrowLeft")   prev();
      if (e.key === "ArrowRight")  next();
    };
    window.addEventListener("keydown", handle);
    return () => window.removeEventListener("keydown", handle);
  }, [state.open, closeLightbox, prev, next]);

  return (
    <LightboxContext.Provider value={{ openLightbox }}>
      {children}
      {state.open &&
        createPortal(
          <LightboxModal state={state} onClose={closeLightbox} onPrev={prev} onNext={next} />,
          document.body
        )}
    </LightboxContext.Provider>
  );
};

// ---------------------------------------------------------------------------
// useFadeIn hook
// ---------------------------------------------------------------------------
function useFadeIn(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

// ---------------------------------------------------------------------------
// MediaItem — with fade-in + lightbox on click
// ---------------------------------------------------------------------------
const MediaItem = ({ src, type = "image", borderRadius = "12px", items, itemIndex }) => {
  const { ref, visible } = useFadeIn();
  const { openLightbox } = useLightbox();

  const wrapStyle = {
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(18px)",
    transition: "opacity 0.7s ease, transform 0.7s ease",
    borderRadius,
    overflow: "hidden",
    width: "100%",
    position: "relative",
  };

  const hintBase = {
    position: "absolute",
    inset: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    pointerEvents: "none",
    opacity: 0,
    transition: "opacity 0.2s ease",
    borderRadius,
  };

  const handleClick = () => openLightbox(items, itemIndex);

  return (
    <Box
      ref={ref}
      style={wrapStyle}
      className="media-item"
      onClick={handleClick}
      role="button"
      aria-label="View fullscreen"
    >
      {type === "video" ? (
        <video
          width="100%"
          autoPlay
          loop
          muted
          playsInline
          loading="lazy"
          style={{ display: "block", borderRadius, pointerEvents: "none" }}
        >
          <source src={src} type={src.endsWith(".webm") ? "video/webm" : "video/mp4"} />
        </video>
      ) : (
        <Image
          src={src}
          w="100%"
          h="auto"
          objectFit="cover"
          borderRadius={borderRadius}
          loading="lazy"
          display="block"
          transition="transform 0.4s ease"
          _groupHover={{ transform: "scale(1.015)" }}
        />
      )}

      {/* Hover hint */}
      <Box
        className="media-hint"
        style={{ ...hintBase, background: "rgba(0,0,0,0.22)" }}
      >
        <Box
          bg="rgba(255,255,255,0.15)"
          backdropFilter="blur(10px)"
          borderRadius="full"
          border="1px solid rgba(255,255,255,0.25)"
          px={4}
          py="6px"
          fontSize="11px"
          fontWeight={600}
          color="white"
          letterSpacing="0.08em"
          textTransform="uppercase"
        >
          View fullscreen
        </Box>
      </Box>
    </Box>
  );
};

// ---------------------------------------------------------------------------
// ProjectGallery
// ---------------------------------------------------------------------------
const ProjectGallery = ({ items }) => {
  const rows = [];
  let i = 0;
  while (i < items.length) {
    if (items[i].grid && items[i + 1]?.grid) {
      rows.push({ type: "grid", a: { ...items[i], flatIdx: i }, b: { ...items[i + 1], flatIdx: i + 1 } });
      i += 2;
    } else {
      rows.push({ type: "single", item: { ...items[i], flatIdx: i } });
      i++;
    }
  }

  return (
    <VStack gap={4} align="stretch" w="100%">
      {rows.map((row, idx) =>
        row.type === "grid" ? (
          <Grid key={idx} templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={4}>
            {[row.a, row.b].map((m) => (
              <MediaItem key={m.flatIdx} src={m.src} type={m.type} items={items} itemIndex={m.flatIdx} />
            ))}
          </Grid>
        ) : (
          <MediaItem
            key={idx}
            src={row.item.src}
            type={row.item.type}
            items={items}
            itemIndex={row.item.flatIdx}
          />
        )
      )}
    </VStack>
  );
};

// ---------------------------------------------------------------------------
// ProjectHeader
// ---------------------------------------------------------------------------
const ProjectHeader = ({ year, title, subtitle }) => (
  <Box mb={{ base: 10, md: 12 }}>
    <Text
      fontSize={{ base: "sm", md: "md" }}
      fontWeight={500}
      letterSpacing="0.12em"
      textTransform="uppercase"
      color="gray.400"
      mb={2}
    >
      {year}
    </Text>
    <Heading
      as="h2"
      fontSize={{ base: "clamp(1.25rem, 5vw, 2rem)", md: "clamp(2rem, 5vw, 2rem)" }}
      fontWeight={700}
      lineHeight={1.05}
      letterSpacing="-0.02em"
      textTransform="uppercase"
      mb={2}
    >
      {title}
    </Heading>
    {subtitle && (
      <Text fontSize={{ base: "lg", md: "xl" }} color="gray.500" fontWeight={400} maxW="640px" lineHeight={1.2}>
        {subtitle}
      </Text>
    )}
  </Box>
);

// ---------------------------------------------------------------------------
// ProjectLinks
// ---------------------------------------------------------------------------
const ProjectLinks = ({ links }) => (
  <Flex gap={6} mt={8} flexWrap="wrap">
    {links.map(({ label, href }) => (
      <Link
        key={label}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        display="inline-flex"
        alignItems="center"
        gap={1}
        fontSize="md"
        fontWeight={500}
        color="gray.900"
        borderBottom="1.5px solid"
        borderColor="gray.900"
        pb="1px"
        _hover={{ color: "gray.500", borderColor: "gray.400" }}
        transition="color 0.2s, border-color 0.2s"
        textDecoration="none"
      >
        {label}
        <RxArrowTopRight size={16} />
      </Link>
    ))}
  </Flex>
);

// ---------------------------------------------------------------------------
// ProjectSection
// ---------------------------------------------------------------------------
const ProjectSection = ({ year, title, subtitle, media, links = [], isFirst, projectsRef }) => (
  <Box ref={isFirst ? projectsRef : undefined} as="section" pt={{ base: "48", md: "72" }}>
    <ProjectHeader year={year} title={title} subtitle={subtitle} />
    <ProjectGallery items={media} />
    {links.length > 0 && <ProjectLinks links={links} />}
  </Box>
);

// ---------------------------------------------------------------------------
// Bosch / creative media — defined once so lightbox can reference the list
// ---------------------------------------------------------------------------
const BOSCH_MEDIA = [
  { src: "./assets/EV_EVOLVE50M_Array_Exploded_Black_nbg.png",      type: "image", href: "https://products.electrovoice.com/emea/en/evolve-50m/", label: "See product page", maxH: "600px" },
  { src: "./assets/EV_MTS-6154-43_Cardioid_Hero_GrilleOff_nbg.png", type: "image", href: "https://products.electrovoice.com/emea/en/mts/",         label: "See product page", aspectRatio: 1 },
  { src: "./assets/DBP_Bottom.png",                                  type: "image", href: "https://products.rtsintercoms.com/na/en/dbp/",           label: "See product page", aspectRatio: 1 },
  { src: "./assets/Everse8_02.png",                                  type: "image", href: "https://products.electrovoice.com/emea/en/everse-8/",    label: "See product page", maxH: "600px" },
];

const CreativeMediaItem = ({ flatIdx }) => {
  const { openLightbox } = useLightbox();
  const { src, href, label, aspectRatio, maxH } = BOSCH_MEDIA[flatIdx];

  return (
    <Box
      position="relative"
      borderRadius="12px"
      overflow="hidden"
      bg="gray.50"
      className="media-item"
      cursor="zoom-in"
      onClick={() => openLightbox(BOSCH_MEDIA, flatIdx)}
      role="button"
      aria-label="View fullscreen"
    >
      <Image
        src={src}
        w="100%"
        h="auto"
        maxH={maxH}
        objectFit="contain"
        borderRadius="12px"
        loading="lazy"
        display="block"
        aspectRatio={aspectRatio}
        pt={aspectRatio ? 0 : 4}
        transition="transform 0.4s ease"
      />

      {/* Hover hint */}
      <Box
        className="media-hint"
        position="absolute"
        inset={0}
        display="flex"
        alignItems="center"
        justifyContent="center"
        bg="rgba(0,0,0,0.16)"
        opacity={0}
        transition="opacity 0.2s ease"
        borderRadius="12px"
        pointerEvents="none"
      >
        <Box
          bg="rgba(255,255,255,0.15)"
          backdropFilter="blur(10px)"
          borderRadius="full"
          border="1px solid rgba(255,255,255,0.25)"
          px={4}
          py="6px"
          fontSize="11px"
          fontWeight={600}
          color="white"
          letterSpacing="0.08em"
          textTransform="uppercase"
        >
          View fullscreen
        </Box>
      </Box>

      {/* Product link — stops propagation so it doesn't open the lightbox */}
      <Button
        as="a"
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        variant="outline"
        size="sm"
        rounded="full"
        position="absolute"
        bottom={3}
        left={3}
        bg="rgba(255,255,255,0.85)"
        backdropFilter="blur(8px)"
        borderColor="gray.200"
        fontSize="xs"
        fontWeight={500}
        _hover={{ bg: "white" }}
        gap={1}
        onClick={(e) => e.stopPropagation()}
      >
        {label} <RxArrowTopRight size={13} />
      </Button>
    </Box>
  );
};

// ---------------------------------------------------------------------------
// OtherCreativeSection
// ---------------------------------------------------------------------------
const OtherCreativeSection = () => (
  <Box as="section" pt={{ base: "48", md: "72" }}>
    <Text
      fontSize={{ base: "sm", md: "md" }}
      fontWeight={500}
      letterSpacing="0.12em"
      textTransform="uppercase"
      color="gray.400"
      mb={4}
    >
      Other creative projects
    </Text>
    <Heading
      as="h2"
      fontSize={{ base: "clamp(1.25rem, 5vw, 2rem)", md: "clamp(2rem, 5vw, 2rem)" }}
      fontWeight={700}
      lineHeight={1.05}
      letterSpacing="-0.02em"
      textTransform="uppercase"
      mb={2}
    >
      Bosch Communications &amp; Conference Systems
    </Heading>
    <Text fontSize="lg" color="gray.500" mb={10}>
      3D Visuals for Electro-Voice, RTS and TELEX
    </Text>

    <VStack gap={4} align="stretch">
      <CreativeMediaItem flatIdx={0} />
      <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={4}>
        <CreativeMediaItem flatIdx={1} />
        <CreativeMediaItem flatIdx={2} />
      </Grid>
      <CreativeMediaItem flatIdx={3} />
    </VStack>
  </Box>
);

// ---------------------------------------------------------------------------
// ScrollToTopButton
// ---------------------------------------------------------------------------
const ScrollToTopButton = ({ visible, onClick }) => (
  <IconButton
    aria-label="Scroll to top"
    variant="subtle"
    rounded="full"
    size="md"
    onClick={onClick}
    position="fixed"
    bottom={{ base: 12, md: 8 }}
    right={{ base: 12, md: "calc((100vw - 1240px) / 2 + 16px)" }}
    zIndex={1000}
    opacity={visible ? 1 : 0}
    pointerEvents={visible ? "auto" : "none"}
    transition="opacity 0.3s ease"
    bg="rgba(255,255,255,0.75)"
    backdropFilter="blur(12px)"
    boxShadow="0 2px 12px rgba(0,0,0,0.08)"
    _hover={{ bg: "white" }}
  >
    <ArrowUp size={18} />
  </IconButton>
);

// ---------------------------------------------------------------------------
// Project data
// ---------------------------------------------------------------------------
const PROJECTS = [
  {
    year: "2026",
    title: "Wave Link 3.0",
    subtitle: "Major redesign of Elgato's audio-mixing software",
    media: [
      { src: "./assets/Limitless_routing_Desk.webm", type: "video" },
      { src: "./assets/WL3Inputs.mp4", type: "video", grid: true },
      { src: "./assets/WL3_Routing_table.jpg", type: "image", grid: true },
      { src: "./assets/WL3_audio_effects.jpg", type: "image" },
      { src: "./assets/WL3_Setup_tour.mp4", type: "video" },
    ],
    links: [
      { label: "Learn more", href: "https://www.elgato.com/ww/en/s/wave-link-app" },
      { label: "Download the app", href: "https://www.elgato.com/ww/en/s/beta" },
    ],
  },
  {
    year: "2026",
    title: "Wave Link plugin for Stream Deck",
    subtitle: "Design of a tactile plugin for audio mixing",
    media: [
      { src: "./assets/2026-03-03T11_06_18.004592.mp4", type: "video" },
      { src: "./assets/WaveLink3(Beta)-preview-dials.png", type: "image" },
      { src: "./assets/04_06_StreamDeckControl_Desktop.png", type: "image" },

    ],
    links: [
      { label: "Learn more", href: "https://www.elgato.com/de/en/explorer/products/wave/wave-link-plugin-for-stream-deck/" },
      { label: "Try it out", href: "https://marketplace.elgato.com/product/wave-link-aa41150f-9645-4275-b064-7642ba6a17ae" },
    ],
  },
  {
    year: "2025",
    title: "Elgato Studio",
    subtitle: "Unified control for recording and capture workflows",
    media: [
      { src: "./assets/elgato_studio_app_game_screen_recording.png", type: "image" },
      { src: "./assets/ElgatoStudio-preview-plugin.png", type: "image" },
    ],
    links: [
      { label: "Download app", href: "https://www.elgato.com/ww/en/s/downloads" },
      { label: "Download plugin", href: "https://marketplace.elgato.com/product/elgato-studio-6cba5ea5-9e17-4e8b-8ea8-8476ca15042a" },
    ],
  },
  {
    year: "2025",
    title: "Wave Link 2.0",
    subtitle: "Streamline audio routing and AI enhanced features",
    media: [
      { src: "./assets/WL2.0_Apps.webm", type: "video" },
      { src: "./assets/Screenshot-2025-02-04-at-5.22.36 PM.png", type: "image", grid: true },
      { src: "./assets/AddToWaveLink.jpg", type: "image", grid: true },
      { src: "./assets/WaveLink20_VoiceFocus.mp4", type: "video" },
    ],
    links: [
      { label: "Learn more", href: "https://www.elgato.com/us/en/s/wave-link" },
    ],
  },
  {
    year: "2024",
    title: "Elgato Capture",
    subtitle: "Design of an iPad app for Elgato capture cards",
    media: [
      { src: "./assets/Game_Capture_Neo_Lifestyle_Shot_02.jpg", type: "image" },
      { src: "./assets/Game_Capture_Neo_Lifestyle_Shot_01.png", type: "image", grid: true },
      { src: "./assets/Game_Capture_4K_X_Lifestyle_Shot_06_A.png", type: "image", grid: true },
    ],
    links: [
      { label: "View iPad app", href: "https://apps.apple.com/de/app/elgato-capture/id6456798479" },
    ],
  },
  {
    year: "2022–2023",
    title: "UX Research and UI for GritGene",
    subtitle: "Improving usability for complex real-time 3D workflows",
    media: [
      { src: "./assets/Input_value_helper.png", type: "image" },
    ],
    links: [],
  },
];

// ---------------------------------------------------------------------------
// Home
// ---------------------------------------------------------------------------
const Home = () => {
  const [scrollVisible, setScrollVisible] = useState(false);
  const projectsRef = useRef(null);
  const location = useLocation();

  const scrollToProjects = useCallback(() => {
    projectsRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const handle = () => setScrollVisible(window.scrollY > 1000);
    window.addEventListener("scroll", handle, { passive: true });
    return () => window.removeEventListener("scroll", handle);
  }, []);

  useEffect(() => {
    if (location.state?.scrollToProjects) scrollToProjects();
  }, [location, scrollToProjects]);

  return (
    <LightboxProvider>
      <style>{globalStyles}</style>

      <Box px={{ base: 6, md: 8, xl: 0 }}>
        {/* ── Hero ── */}
        <Box
          maxW="1240px"
          mx="auto"
          minH={{ base: "calc(100vh - 256px)", xl: "calc(100vh - 112px)" }}
          display="flex"
          flexDirection="column"
          gap="2rem"
        >
          <Heading
            size={{ base: "xl", xl: "2xl" }}
            display={{ base: "block", md: "none" }}
            textAlign="center"
            pt={8}
          >
            Rodrigo Prata Baldaia
          </Heading>

          <Flex flex="1" align="center" justify={{ base: "center", xl: "flex-start" }}>
            <Text
              fontSize="clamp(2rem, 5vw, 4.5rem)"
              fontWeight={600}
              textTransform="uppercase"
              textAlign={{ base: "center", xl: "left" }}
              lineHeight={1.1}
              letterSpacing="-0.02em"
            >
              UX Designer based in Germany. Currently working at{" "}
              <Link
                href="https://elgato.com"
                target="_blank"
                rel="noopener noreferrer"
                color="inherit"
                textDecoration="underline"
                textUnderlineOffset="4px"
                _hover={{ opacity: 0.6 }}
              >
                Elgato
              </Link>
              ,
              <br />a division of CORSAIR.
            </Text>
          </Flex>

          <Box pb={{ base: 0, xl: 8 }} textAlign={{ base: "center", xl: "left" }}>
            <Button
              onClick={scrollToProjects}
              variant="outline"
              size="lg"
              rounded="full"
              gap={2}
              _hover={{ bg: "gray.50" }}
              transition="background 0.2s"
            >
              See my projects
              <ArrowDown size={18} />
            </Button>
          </Box>
        </Box>

        {/* ── Projects ── */}
        <Container maxW="1240px" px={0} mx="auto">
          {PROJECTS.map((project, idx) => (
            <ProjectSection
              key={project.title}
              {...project}
              isFirst={idx === 0}
              projectsRef={projectsRef}
            />
          ))}

          <OtherCreativeSection />
          <Box pb={{ base: 24, md: 32 }} />
        </Container>
      </Box>

      <ScrollToTopButton visible={scrollVisible} onClick={scrollToTop} />
    </LightboxProvider>
  );
};

export default Home;