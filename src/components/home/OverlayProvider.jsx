import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Box, Flex, IconButton } from "@chakra-ui/react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { PROJECTS } from "../../data/projects";
import SmartVideo from "./SmartVideo";

/**
 * OverlayProvider — owns every overlay on the landing page:
 *
 *   ProjectModal  extended project information, opened from a card
 *   LightboxModal fullscreen media viewer, opened from galleries
 *
 * Keeping both here means one coordinated key handler: Escape peels the
 * topmost overlay only, and arrow keys navigate the lightbox while it is
 * open. Body scroll locks while any overlay is open, which is also what
 * preserves the page's scroll position across open/close cycles.
 */

const ProjectModalContext = createContext({ openProject: () => {} });
const LightboxContext = createContext({ openLightbox: () => {} });

export const useProjectModal = () => useContext(ProjectModalContext);
export const useLightbox = () => useContext(LightboxContext);

const FOCUSABLE =
  'a[href], button:not([disabled]), video, [tabindex]:not([tabindex="-1"])';

/** Cycle Tab focus within an overlay container. */
const trapTab = (e, container) => {
  if (!container) return;
  const els = container.querySelectorAll(FOCUSABLE);
  if (els.length === 0) return;
  const first = els[0];
  const last = els[els.length - 1];
  if (e.shiftKey && document.activeElement === first) {
    e.preventDefault();
    last.focus();
  } else if (!e.shiftKey && document.activeElement === last) {
    e.preventDefault();
    first.focus();
  }
};

const lightboxType = (src) => (src.endsWith(".webm") ? "video/webm" : "video/mp4");

/* ------------------------------------------------------------------ */
/* Lightbox                                                             */
/* ------------------------------------------------------------------ */

const LightboxModal = ({ state, onClose, onPrev, onNext, onDotClick, onKeyDown }) => {
  const { items, index } = state;
  const item = items[index];
  const hasMultiple = items.length > 1;
  const touchStart = useRef(null);

  const handleTouchStart = (e) => {
    touchStart.current = e.touches[0].clientX;
  };
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
      bg="rgba(0,0,0,0.72)"
      backdropFilter="blur(16px)"
      display="flex"
      alignItems="center"
      justifyContent="center"
      role="dialog"
      aria-modal="true"
      aria-label="Media viewer"
      onClick={onClose}
      onKeyDown={onKeyDown}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <IconButton
        aria-label="Close media viewer"
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
          aria-label="Previous media"
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
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
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
            style={{
              maxWidth: "100%",
              maxHeight: "88vh",
              borderRadius: "12px",
              display: "block",
            }}
          >
            <source src={item.src} type={lightboxType(item.src)} />
          </video>
        ) : (
          <img
            src={item.src}
            alt={item.alt || ""}
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

      {hasMultiple && (
        <IconButton
          aria-label="Next media"
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
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
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
              aria-label={`Show media ${i + 1} of ${items.length}`}
              w={i === index ? "20px" : "6px"}
              h="6px"
              borderRadius="full"
              bg={i === index ? "white" : "rgba(255,255,255,0.3)"}
              transition="all 0.25s ease"
              cursor="pointer"
              onClick={(e) => {
                e.stopPropagation();
                onDotClick(i);
              }}
            />
          ))}
        </Flex>
      )}
    </Box>
  );
};

/* ------------------------------------------------------------------ */
/* Project modal                                                        */
/* ------------------------------------------------------------------ */

const ModalMediaItem = ({ src, type, alt, items, flatIdx, videoPaused = false }) => {
  const { openLightbox } = useLightbox();
  return (
    <Box
      className="card-media"
      cursor="zoom-in"
      borderRadius="16px"
      overflow="hidden"
      onClick={() => openLightbox(items, flatIdx)}
      role="button"
      tabIndex={0}
      aria-label={`View fullscreen: ${alt || "project media"}`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openLightbox(items, flatIdx);
        }
      }}
    >
      {type === "video" ? (
        <SmartVideo
          src={src}
          paused={videoPaused}
          preload="metadata"
          width="100%"
          style={{ display: "block", borderRadius: "16px" }}
          aria-label={alt}
        />
      ) : (
        <img
          src={src}
          alt={alt || ""}
          loading="lazy"
          decoding="async"
          style={{ width: "100%", height: "auto", display: "block", borderRadius: "16px" }}
        />
      )}
    </Box>
  );
};

/** Pairs consecutive `grid: true` items side by side, like the old gallery. */
const pairRows = (items) => {
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
  return rows;
};

const ProjectModal = ({ project, closing, onClose, onPrev, onNext }) => {
  const panelRef = useRef(null);
  const closeRef = useRef(null);
  const titleId = `pm-title-${project.id}`;

  // Focus the close control on open; keep the panel scrollable from top.
  useEffect(() => {
    closeRef.current?.focus();
  }, []);

  useEffect(() => {
    panelRef.current?.scrollTo({ top: 0 });
  }, [project.id]);

  const handleKeyDown = (e) => {
    if (e.key === "Tab") trapTab(e, panelRef.current);
  };

  const eyebrow = `${project.company} · ${project.year}`;
  const rows = pairRows(project.media);

  return (
    <Box
      ref={panelRef}
      className={`pm-panel${closing ? " closing" : ""}`}
      position="fixed"
      inset={0}
      zIndex={9000}
      bg="bg.canvas"
      overflowY="auto"
      overscrollBehavior="contain"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      onKeyDown={handleKeyDown}
    >
      <IconButton
        ref={closeRef}
        aria-label="Close project details"
        position="fixed"
        top={{ base: 3, md: 5 }}
        right={{ base: 3, md: 5 }}
        zIndex={20}
        rounded="full"
        bg="bg.muted"
        color="fg"
        border="1px solid"
        borderColor="border.emphasized"
        _hover={{ bg: "bg.emphasized" }}
        onClick={onClose}
      >
        <X size={18} />
      </IconButton>

      <Box
        className="pm-motion"
        maxW="1080px"
        mx="auto"
        px={{ base: 6, md: 8 }}
        pt={{ base: 20, md: 24 }}
        pb={{ base: 16, md: 20 }}
      >
        {/* ── Header ── */}
        <Box mb={{ base: 10, md: 14 }}>
          <Box
            as="p"
            fontSize="xs"
            fontWeight={600}
            letterSpacing="0.14em"
            textTransform="uppercase"
            color="fg.subtle"
            mb={4}
          >
            {eyebrow}
          </Box>
          <Box
            as="h2"
            id={titleId}
            fontFamily="display"
            fontSize={{ base: "clamp(2rem, 8vw, 3.5rem)", md: "clamp(2.5rem, 6vw, 4rem)" }}
            fontWeight={600}
            lineHeight={1.02}
            letterSpacing="-0.03em"
            mb={4}
          >
            {project.title}
          </Box>
          <Box as="p" fontSize={{ base: "lg", md: "xl" }} color="fg.muted" maxW="640px" lineHeight={1.4}>
            {project.subtitle}
          </Box>
        </Box>

        {/* ── Description ── */}
        <Box as="p" fontSize={{ base: "md", md: "lg" }} lineHeight={1.75} color="fg" maxW="760px" mb={{ base: 10, md: 14 }}>
          {project.description}
        </Box>

        {/* ── Contributions + metric / focus areas ── */}
        <Flex
          direction={{ base: "column", md: "row" }}
          gap={{ base: 10, md: 14 }}
          mb={{ base: 10, md: 14 }}
          align="flex-start"
        >
          {project.contributions?.length > 0 && (
            <Box flex="1.4" w="100%">
              <Box
                as="h3"
                fontSize="xs"
                fontWeight={600}
                letterSpacing="0.12em"
                textTransform="uppercase"
                color="fg.subtle"
                mb={4}
              >
                My contributions
              </Box>
              <Flex direction="column" gap={2.5}>
                {project.contributions.map((item, i) => (
                  <Flex key={i} align="start" gap={3}>
                    <Box
                      mt="9px"
                      flexShrink={0}
                      w="4px"
                      h="4px"
                      borderRadius="full"
                      bg="border.emphasized"
                    />
                    <Box as="p" fontSize="md" color="fg.muted" lineHeight={1.6}>
                      {item}
                    </Box>
                  </Flex>
                ))}
              </Flex>
            </Box>
          )}

          <Flex direction="column" gap={8} flex="1" w="100%">
            {project.metric && (
              <Box
                borderRadius="16px"
                border="1px solid"
                borderColor="border"
                bg="bg.subtle"
                px={6}
                py={5}
              >
                <Box
                  as="p"
                  fontSize="xs"
                  fontWeight={600}
                  letterSpacing="0.1em"
                  textTransform="uppercase"
                  color="fg.subtle"
                  mb={1}
                >
                  {project.metric.label}
                </Box>
                <Box
                  as="p"
                  fontSize={{ base: "3xl", md: "4xl" }}
                  fontWeight={700}
                  letterSpacing="-0.03em"
                  color="fg"
                  lineHeight={1}
                >
                  {project.metric.value}
                </Box>
                {project.metric.note && (
                  <Box as="p" fontSize="sm" color="fg.subtle" mt={1}>
                    {project.metric.note}
                  </Box>
                )}
              </Box>
            )}

            {project.focusAreas?.length > 0 && (
              <Box>
                <Box
                  as="h3"
                  fontSize="xs"
                  fontWeight={600}
                  letterSpacing="0.12em"
                  textTransform="uppercase"
                  color="fg.subtle"
                  mb={4}
                >
                  Focus areas
                </Box>
                <Flex gap={2} flexWrap="wrap">
                  {project.focusAreas.map((area) => (
                    <Box
                      key={area}
                      as="span"
                      borderRadius="full"
                      border="1px solid"
                      borderColor="border.emphasized"
                      px={3}
                      py={1}
                      fontSize="xs"
                      fontWeight={500}
                      letterSpacing="0.04em"
                      color="fg.muted"
                    >
                      {area}
                    </Box>
                  ))}
                </Flex>
              </Box>
            )}
          </Flex>
        </Flex>

        {/* ── Media gallery ── */}
        {project.media.length > 0 && (
          <Flex direction="column" gap={4} mb={{ base: 10, md: 14 }}>
            {rows.map((row, idx) =>
              row.type === "grid" ? (
                <Flex key={idx} direction={{ base: "column", md: "row" }} gap={4}>
                  {[row.a, row.b].map((m) => (
                    <Box key={m.flatIdx} flex="1">
                      <ModalMediaItem src={m.src} type={m.type} alt={m.alt} items={project.media} flatIdx={m.flatIdx} />
                    </Box>
                  ))}
                </Flex>
              ) : (
                <ModalMediaItem
                  key={idx}
                  src={row.item.src}
                  type={row.item.type}
                  alt={row.item.alt}
                  items={project.media}
                  flatIdx={row.item.flatIdx}
                />
              )
            )}
          </Flex>
        )}

        {/* ── Links ── */}
        {project.links?.length > 0 && (
          <Flex gap={3} flexWrap="wrap" mb={{ base: 12, md: 16 }}>
            {project.links.map(({ label, href }) => (
              <Box
                key={label}
                as="a"
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                borderRadius="full"
                border="1px solid"
                borderColor="border.emphasized"
                px={5}
                py={2.5}
                fontSize="sm"
                fontWeight={500}
                color="fg"
                textDecoration="none"
                _hover={{ bg: "fg", color: "bg.canvas" }}
                transition="all 0.2s ease"
              >
                {label} ↗
              </Box>
            ))}
          </Flex>
        )}

        {/* ── Prev / next project ── */}
        <Flex
          justify="space-between"
          align="center"
          gap={4}
          borderTop="1px solid"
          borderColor="border"
          pt={8}
          mt={{ base: 12, md: 16 }}
        >
          {onPrev ? (
            <Box
              as="button"
              aria-label={`Previous project: ${PROJECTS[(PROJECTS.indexOf(project) - 1 + PROJECTS.length) % PROJECTS.length].title}`}
              textAlign="left"
              cursor="pointer"
              color="fg.muted"
              _hover={{ color: "fg" }}
              transition="color 0.2s ease"
              onClick={onPrev}
            >
              <Box as="span" display="block" fontSize="xs" letterSpacing="0.1em" textTransform="uppercase" mb={1}>
                ← Previous
              </Box>
              <Box as="span" display="block" fontFamily="display" fontSize={{ base: "md", md: "lg" }} fontWeight={600}>
                {PROJECTS[(PROJECTS.indexOf(project) - 1 + PROJECTS.length) % PROJECTS.length].title}
              </Box>
            </Box>
          ) : (
            <Box />
          )}
          {onNext ? (
            <Box
              as="button"
              aria-label={`Next project: ${PROJECTS[(PROJECTS.indexOf(project) + 1) % PROJECTS.length].title}`}
              textAlign="right"
              cursor="pointer"
              color="fg.muted"
              _hover={{ color: "fg" }}
              transition="color 0.2s ease"
              onClick={onNext}
            >
              <Box as="span" display="block" fontSize="xs" letterSpacing="0.1em" textTransform="uppercase" mb={1}>
                Next →
              </Box>
              <Box as="span" display="block" fontFamily="display" fontSize={{ base: "md", md: "lg" }} fontWeight={600}>
                {PROJECTS[(PROJECTS.indexOf(project) + 1) % PROJECTS.length].title}
              </Box>
            </Box>
          ) : (
            <Box />
          )}
        </Flex>
      </Box>
    </Box>
  );
};

/* ------------------------------------------------------------------ */
/* Provider                                                             */
/* ------------------------------------------------------------------ */

export const OverlayProvider = ({ children }) => {
  const [projectIndex, setProjectIndex] = useState(null);
  const [modalClosing, setModalClosing] = useState(false);
  const [lightbox, setLightbox] = useState(null);

  const modalFocusRef = useRef(null);
  const lightboxFocusRef = useRef(null);

  const openProject = useCallback((index) => {
    modalFocusRef.current = document.activeElement;
    setProjectIndex(index);
  }, []);

  const closeProject = useCallback(() => {
    setModalClosing(true);
    window.setTimeout(() => {
      setProjectIndex(null);
      setModalClosing(false);
      if (modalFocusRef.current) {
        modalFocusRef.current.focus?.();
        modalFocusRef.current = null;
      }
    }, 180);
  }, []);

  const openLightbox = useCallback((items, index) => {
    lightboxFocusRef.current = document.activeElement;
    setLightbox({ items, index });
  }, []);

  const jumpToMedia = useCallback(
    (i) => setLightbox((l) => (l ? { ...l, index: i } : l)),
    []
  );

  const closeLightbox = useCallback(() => {
    setLightbox(null);
    if (lightboxFocusRef.current) {
      lightboxFocusRef.current.focus?.();
      lightboxFocusRef.current = null;
    }
  }, []);

  const prevMedia = useCallback(
    () => setLightbox((l) => (l ? { ...l, index: (l.index - 1 + l.items.length) % l.items.length } : l)),
    []
  );
  const nextMedia = useCallback(
    () => setLightbox((l) => (l ? { ...l, index: (l.index + 1) % l.items.length } : l)),
    []
  );

  // Scroll lock — the page never navigates, so its scroll position is
  // naturally preserved when the overlay unmounts.
  useEffect(() => {
    const locked = projectIndex !== null || lightbox !== null;
    document.body.style.overflow = locked ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [projectIndex, lightbox]);

  // One coordinated key handler: the lightbox sits on top of the modal,
  // so Escape peels the topmost overlay only and arrows drive the lightbox.
  useEffect(() => {
    const onKey = (e) => {
      if (lightbox) {
        if (e.key === "Escape") closeLightbox();
        else if (e.key === "ArrowLeft") prevMedia();
        else if (e.key === "ArrowRight") nextMedia();
      } else if (projectIndex !== null && e.key === "Escape") {
        closeProject();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, projectIndex, closeLightbox, closeProject, prevMedia, nextMedia]);

  const project = projectIndex !== null ? PROJECTS[projectIndex] : null;
  const hasPrev = projectIndex !== null && PROJECTS.length > 1;
  const hasNext = projectIndex !== null && PROJECTS.length > 1;
  const prevProject = useCallback(
    () => setProjectIndex((i) => (i - 1 + PROJECTS.length) % PROJECTS.length),
    []
  );
  const nextProject = useCallback(
    () => setProjectIndex((i) => (i + 1) % PROJECTS.length),
    []
  );

  const lightboxKeyDown = (e) => {
    if (e.key === "Tab") trapTab(e, e.currentTarget);
  };

  return (
    <ProjectModalContext.Provider value={{ openProject }}>
      <LightboxContext.Provider value={{ openLightbox }}>
        {children}
        {project &&
          createPortal(
            <ProjectModal
              project={project}
              closing={modalClosing}
              onClose={closeProject}
              onPrev={hasPrev ? prevProject : undefined}
              onNext={hasNext ? nextProject : undefined}
            />,
            document.body
          )}
        {lightbox &&
          createPortal(
            <LightboxModal
              state={lightbox}
              onClose={closeLightbox}
              onPrev={prevMedia}
              onNext={nextMedia}
              onDotClick={jumpToMedia}
              onKeyDown={lightboxKeyDown}
            />,
            document.body
          )}
      </LightboxContext.Provider>
    </ProjectModalContext.Provider>
  );
};
