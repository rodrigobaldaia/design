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
 *   │   ├── ProjectInfoSection  ← NEW (description · contributions · focus areas · metric)
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
  HStack,
  Container,
  Badge,
} from "@chakra-ui/react";
import { ArrowDown, ArrowUp, X, ChevronLeft, ChevronRight } from "lucide-react";
import { RxArrowTopRight } from "react-icons/rx";
import { LuExternalLink } from "react-icons/lu";
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
// Global CSS
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
// LightboxModal
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
            style={{ maxWidth: "100%", maxHeight: "88vh", borderRadius: "12px", display: "block" }}
          >
            <source src={item.src} type={item.src.endsWith(".webm") ? "video/webm" : "video/mp4"} />
          </video>
        ) : (
          <img
            src={item.src}
            alt=""
            style={{ maxWidth: "100%", maxHeight: "88vh", borderRadius: "12px", objectFit: "contain", display: "block" }}
          />
        )}
      </Box>

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
// LightboxProvider
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
    setState((s) => ({ ...s, index: (s.index - 1 + s.items.length) % s.items.length })), []);

  const next = useCallback(() =>
    setState((s) => ({ ...s, index: (s.index + 1) % s.items.length })), []);

  useEffect(() => {
    if (!state.open) return;
    const handle = (e) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
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
// useFadeIn
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
// MediaItem
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

  return (
    <Box
      ref={ref}
      style={wrapStyle}
      className="media-item"
      onClick={() => openLightbox(items, itemIndex)}
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
      <Box className="media-hint" style={{ ...hintBase, background: "rgba(0,0,0,0.22)" }}>
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
  <Box mb={{ base: 8, md: 10 }}>
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
      <Text
        fontSize={{ base: "lg", md: "xl" }}
        color="gray.500"
        fontWeight={400}
        maxW="640px"
        lineHeight={1.2}
      >
        {subtitle}
      </Text>
    )}
  </Box>
);

// ---------------------------------------------------------------------------
// ProjectInfoSection — NEW
// Sits between ProjectHeader and ProjectGallery.
// Receives: description, contributions, focusAreas, metric, previewSrc
// All fields are optional — the component gracefully hides empty sections.
// ---------------------------------------------------------------------------
const ProjectInfoSection = ({ description, contributions, focusAreas, links, metric, previewSrc, media, previewIndex }) => {
  // Nothing to render if all fields are absent
  const hasContent = description || contributions?.length || focusAreas?.length || metric;
  if (!hasContent) return null;

  const { openLightbox } = useLightbox();

  return (
    <Grid
      templateColumns={{ base: "1fr", lg: "1fr 1fr" }}
      gap={{ base: 10, lg: 16 }}
      mb={{ base: 4, md: 16 }}
      alignItems="start"
    >
      {/* ── Left: text info ── */}
      <VStack align="start" gap={8}>

        {/* Description */}
        {description && (
          <Box>
            <Text
              fontSize={{ base: "md", md: "lg" }}
              color="gray.700"
              lineHeight={1.75}
              fontWeight={400}
            >
              {description}
            </Text>
          </Box>
        )}

        {/* Contributions */}
        {contributions?.length > 0 && (
          <Box w="100%">
            <Text
              fontSize="xs"
              fontWeight={600}
              letterSpacing="0.1em"
              textTransform="uppercase"
              color="gray.400"
              mb={3}
            >
              My Contributions
            </Text>
            <VStack align="start" gap={2}>
              {contributions.map((item, i) => (
                <Flex key={i} align="start" gap={3}>
                  {/* Subtle bullet */}
                  <Box
                    mt="9px"
                    flexShrink={0}
                    w="4px"
                    h="4px"
                    borderRadius="full"
                    bg="gray.300"
                  />
                  <Text fontSize="md" color="gray.700" lineHeight={1.6}>
                    {item}
                  </Text>
                </Flex>
              ))}
            </VStack>
          </Box>
        )}

        {/* Focus Areas */}
        {focusAreas?.length > 0 && (
          <Box w="100%">
            <Text
              fontSize="xs"
              fontWeight={600}
              letterSpacing="0.1em"
              textTransform="uppercase"
              color="gray.400"
              mb={3}
            >
              Focus Areas
            </Text>
            <Flex gap={2} flexWrap="wrap">
              {focusAreas.map((area) => (
                <Badge
                  key={area}
                  variant="outline"
                  borderRadius="full"
                  px={3}
                  py={1}
                  fontSize="xs"
                  fontWeight={500}
                  letterSpacing="0.04em"
                  color="gray.600"
                  borderColor="gray.200"
                >
                  {area}
                </Badge>
              ))}
            </Flex>
          </Box>
        )}

        {/* Links */}
        {links?.length > 0 && <ProjectLinks links={links} />}
        <>
        </>
      </VStack>

      {/* ── Right: metric card + preview image ── */}
      <VStack align="stretch" gap={4}>

        {/* Metric Card */}
        {metric && (
          <Box
            borderRadius="12px"
            border="1px solid"
            borderColor="gray.300"
            bg="gray.50"
            px={6}
            py={5}
          >
            <Flex align="center" justify="space-between">
              <Box>
                <Text
                  fontSize="xs"
                  fontWeight={600}
                  letterSpacing="0.1em"
                  textTransform="uppercase"
                  color="gray.400"
                  mb={1}
                >
                  {metric.label}
                </Text>
                <Text
                  fontSize={{ base: "3xl", md: "4xl" }}
                  fontWeight={700}
                  letterSpacing="-0.03em"
                  color="gray.900"
                  lineHeight={1}
                >
                  {metric.value}
                </Text>
                {metric.note && (
                  <Text fontSize="sm" color="gray.400" mt={1} fontWeight={400}>
                    {metric.note}
                  </Text>
                )}
              </Box>
              {metric.icon && (
                <Box
                  fontSize="2xl"
                  color="gray.300"
                  flexShrink={0}
                  ml={4}
                >
                  {metric.icon}
                </Box>
              )}
            </Flex>
          </Box>
        )}

        {/* Preview Image — first image/video poster from the project's media */}
        {previewSrc && (
          <Box
            borderRadius="12px"
            overflow="hidden"
            bg="gray.50"
            flexShrink={0}
            position="relative"
            className="media-item"
            cursor="zoom-in"
            onClick={() => openLightbox(media, previewIndex)}
          >
            <Image
              src={previewSrc}
              w="100%"
              h="auto"
              objectFit="cover"
              borderRadius="12px"
              loading="lazy"
              display="block"
            />

            {/* Same hover hint as gallery */}
            <Box
              className="media-hint"
              position="absolute"
              inset={0}
              display="flex"
              alignItems="center"
              justifyContent="center"
              bg="rgba(0,0,0,0.22)"
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
          </Box>
        )}
      </VStack>
    </Grid>
  );
};

// ---------------------------------------------------------------------------
// ProjectLinks
// ---------------------------------------------------------------------------
const ProjectLinks = ({ links }) => (
  <Flex gap={6} mb={0} flexWrap="wrap">
    {links.map(({ label, href }) => (
      <Link
        key={label}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
      >
        {label}
        <LuExternalLink />
      </Link>
    ))}
  </Flex>
);

// ---------------------------------------------------------------------------
// ProjectSection — updated to thread ProjectInfoSection between header + gallery
// ---------------------------------------------------------------------------
const ProjectSection = ({
  year, title, subtitle,
  description, contributions, focusAreas, metric,
  media, links = [],
  isFirst, projectsRef,
}) => {
  const previewIndex = media.findIndex((m) => m.type === "image");

  const previewSrc =
    previewIndex !== -1 ? media[previewIndex].src : null;

  const galleryMedia =
    previewIndex !== -1
      ? media.filter((_, i) => i !== previewIndex)
      : media;

  return (
    <Box
      ref={isFirst ? projectsRef : undefined}
      as="section"
      pt={{ base: "32", md: "72" }}
    >
      <ProjectHeader
        year={year}
        title={title}
        subtitle={subtitle}
      />

      <ProjectInfoSection
        description={description}
        contributions={contributions}
        focusAreas={focusAreas}
        links={links}
        metric={metric}
        previewSrc={previewSrc}
        media={media}                // ✅ full media
        previewIndex={previewIndex}  // ✅ correct index
      />

      <ProjectGallery items={galleryMedia} />
    </Box>
  );
};

// ---------------------------------------------------------------------------
// Bosch / creative media
// ---------------------------------------------------------------------------
const BOSCH_MEDIA = [
  { src: "./assets/EV_EVOLVE50M_Array_Exploded_Black_nbg.png", type: "image", href: "https://products.electrovoice.com/emea/en/evolve-50m/", label: "See product page", maxH: "600px" },
  { src: "./assets/EV_MTS-6154-43_Cardioid_Hero_GrilleOff_nbg.png", type: "image", href: "https://products.electrovoice.com/emea/en/mts/", label: "See product page", aspectRatio: 1 },
  { src: "./assets/DBP_Bottom.png", type: "image", href: "https://products.rtsintercoms.com/na/en/dbp/", label: "See product page", aspectRatio: 1 },
  { src: "./assets/Everse8_02.png", type: "image", href: "https://products.electrovoice.com/emea/en/everse-8/", label: "See product page", maxH: "600px" },
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
      mb={2}
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
// PROJECTS data — extended with description, contributions, focusAreas, metric
// metric.note is optional context shown beneath the value
// ---------------------------------------------------------------------------
const PROJECTS = [
  {
    year: "2026",
    title: "Wave Link 3.0",
    subtitle: "Redesign of Elgato's audio-mixing software",
    description:
      "Wave Link 3.0 is a ground-up redesign of Elgato's audio-mixing application. The goal was to replace a rigid routing model with a flexible, visual system that scales from first-time streamers to professional broadcast engineers, without compromising Elgato’s hardware support.",
    contributions: [
      "Conducted user research to inform the redesign",
      "Designed a dedicated device view for improved control and clarity",
      "Designed and iterated onboarding flows and guided setup tours",
      "Defined motion language and micro-interaction patterns",
      "Collaborated on the design of a flexible routing surface and channel architecture",
    ],
    focusAreas: ["Product Design","Interaction Design", "Information Architecture", "User Research", "Motion Design", "Onboarding UX", "Design Systems"],
    metric: {
      label: "Unique users (Beta)",
      value: "70.000+",
      note: "early adopters during beta",
    },
    media: [
      { src: "./assets/WL3_Routing_table.jpg", type: "image"},
      { src: "./assets/Limitless_routing_Desk.webm", type: "video"},
      { src: "./assets/WL3Inputs.mp4", type: "video", grid: true },
      { src: "./assets/WL3_audio_effects.jpg", type: "image", grid: true  },
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
    subtitle: "Design of a tactile plugin for Wave Link",
    description:
      "Bringing Wave Link’s audio-mixing capabilities to the physical Stream Deck required rethinking how complex software controls translate into tangible, one-press actions. The plugin maps mixer channels, volume controls, and mute states to customizable keys, enabling hands-on control without leaving the mic.",
    contributions: [
      "Led UX and interaction design across the full redesign cycle",
      "Designed the key layout system and interaction model",
      "Created dial and key components for Stream Deck+",
      "Collaborated with the Stream Deck team to align with platform constraints",
    ],
    focusAreas: ["Visual Design", "Interaction Design", "Hardware UX", "Plugin Design"],
    media: [
      { src: "./assets/WaveLink3(Beta)-preview-dials.png", type: "image" },
      { src: "./assets/2026-03-03T11_06_18.004592.mp4", type: "video" },
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
    subtitle: "Brand-new capture app and companion Stream Deck plugin",
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
      { src: "./assets/Screenshot-2025-02-04-at-5.22.36 PM.png", type: "image", grid: true },
      { src: "./assets/WL2.0_Apps.webm", type: "video" },
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
      { src: "./assets/Game_Capture_Neo_Lifestyle_Shot_01.png", type: "image" },
      { src: "./assets/Game_Capture_Neo_Lifestyle_Shot_02.jpg", type: "image", grid: true },
      { src: "./assets/Game_Capture_4K_X_Lifestyle_Shot_06_A.png", type: "image", grid: true },
    ],
    links: [
      { label: "View iPad app", href: "https://apps.apple.com/de/app/elgato-capture/id6456798479" },
    ],
  },
  {
    year: "2022–2023",
    title: "UX Research and UI for GritGene",
    subtitle: "Improving usability for complex 3D workflows",
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
      { src: "./assets/Input_value_helper.png", type: "image" },
      { src: "./assets/gritgene.png", type: "image" },
    ],
    links: [],
  },
  {
    year: "Personal Project",
    title: "Net Worth Tracker",
    subtitle: "A personal finance dashboard",
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
      { src: "./assets/iPhone_01.png", type: "image" },
      { src: "./assets/iPhone_02.png", type: "image" },
      { src: "./assets/MacBook Pro.png", type: "image", grid: true },
      { src: "./assets/iPhone_03.png", type: "image", grid: true },
      { src: "./assets/iPhone_04.png", type: "image" },
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
              textAlign={{ base: "center", xl: "center" }}
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

          <Box pb={{ base: 0, xl: 8 }} textAlign={{ base: "center", xl: "center" }}>
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