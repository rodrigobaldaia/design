import { Box, Flex } from "@chakra-ui/react";
import { useReveal } from "../../hooks/useReveal";
import SmartVideo from "./SmartVideo";

/**
 * ProjectCard — visual-first editorial block for the landing page.
 *
 * Shows the minimum: company · year, the project name, and one strong
 * media element. `variant` controls the editorial composition:
 *
 *   "full"         title above a full-width media edge
 *   "offset-right" text column left, media offset right
 *   "offset-left"  media offset left, text column right
 *   "center"       centered title above a contained media panel (phones)
 *
 * Everything else lives in the project modal, opened on click/Enter.
 */

const Meta = ({ company, year, align = "start" }) => (
  <Box
    as="p"
    fontSize={{ base: "2xs", md: "xs" }}
    fontWeight={600}
    letterSpacing="0.16em"
    textTransform="uppercase"
    color="fg.subtle"
    textAlign={align === "center" ? "center" : "start"}
  >
    {company} — {year}
  </Box>
);

const Title = ({ children, size = "lg", align = "start" }) => (
  <Box
    as="h2"
    fontFamily="display"
    fontWeight={600}
    lineHeight={1.02}
    letterSpacing="-0.03em"
    fontSize={
      size === "lg"
        ? { base: "clamp(2rem, 7.5vw, 4.25rem)", md: "clamp(2.25rem, 5.5vw, 4.25rem)" }
        : { base: "clamp(1.6rem, 6vw, 3rem)", md: "clamp(1.75rem, 3.5vw, 3rem)" }
    }
    textAlign={align === "center" ? "center" : "start"}
  >
    {children}
  </Box>
);

const ViewHint = () => (
  <Box
    as="span"
    display="inline-flex"
    alignItems="center"
    gap={2}
    w="fit-content"
    borderRadius="full"
    border="1px solid"
    borderColor="border.emphasized"
    px={4}
    py={1.5}
    fontSize="2xs"
    fontWeight={600}
    letterSpacing="0.12em"
    textTransform="uppercase"
    color="fg.muted"
    _groupHover={{ color: "fg", borderColor: "fg" }}
    transition="all 0.25s ease"
  >
    View project
    <Box as="span" aria-hidden>
      ↗
    </Box>
  </Box>
);

const CardMedia = ({ visual }) => (
  <Box className="card-media" borderRadius="18px" overflow="hidden" bg="bg.subtle">
    {visual.type === "video" ? (
      <SmartVideo
        src={visual.src}
        preload="metadata"
        width="100%"
        style={{
          display: "block",
          width: "100%",
          aspectRatio: "16 / 9",
          objectFit: "cover",
          borderRadius: "18px",
        }}
        aria-label={visual.alt}
      />
    ) : (
      <img
        src={visual.src}
        alt={visual.alt}
        loading="lazy"
        decoding="async"
        style={{ display: "block", width: "100%", height: "auto", borderRadius: "18px" }}
      />
    )}
  </Box>
);

const ProjectCard = ({ project, onOpen }) => {
  const { ref, visible } = useReveal(0.08);
  const v = project.variant;
  const centered = v === "center";

  return (
    <Box ref={ref} className={`reveal${visible ? " revealed" : ""}`}>
      <Box
        as="article"
        className="group"
        role="button"
        tabIndex={0}
        aria-label={`Open project details: ${project.title}`}
        cursor="pointer"
        onClick={onOpen}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onOpen();
          }
        }}
        _focusVisible={{ outline: "2px solid", outlineColor: "fg", outlineOffset: "8px", borderRadius: "8px" }}
      >
        {v === "full" && (
          <Flex direction="column" gap={{ base: 5, md: 7 }}>
            <Flex direction="column" gap={3}>
              <Meta company={project.company} year={project.year} />
              <Title>{project.title}</Title>
            </Flex>
            <CardMedia visual={project.cardVisual} />
            <ViewHint />
          </Flex>
        )}

        {(v === "offset-left" || v === "offset-right") && (
          <Flex
            direction={{ base: "column", md: "row" }}
            align={{ base: "stretch", md: "flex-end" }}
            gap={{ base: 5, md: 10 }}
          >
            <Flex direction="column" gap={{ base: 3, md: 4 }} flex="5" pb={{ base: 0, md: 2 }}>
              <Meta company={project.company} year={project.year} />
              <Title size="sm">{project.title}</Title>
              <ViewHint />
            </Flex>
            <Box flex="7" order={{ base: 0, md: v === "offset-left" ? -1 : 0 }}>
              <CardMedia visual={project.cardVisual} />
            </Box>
          </Flex>
        )}

        {centered && (
          <Flex direction="column" gap={{ base: 5, md: 7 }} align="center">
            <Flex direction="column" gap={3} align="center">
              <Meta company={project.company} year={project.year} align="center" />
              <Title align="center">{project.title}</Title>
            </Flex>
            <Box
              className="card-media"
              w="100%"
              bg="bg.subtle"
              borderRadius="24px"
              px={{ base: 6, md: 14 }}
              py={{ base: 8, md: 14 }}
              display="flex"
              justify="center"
            >
              <img
                src={project.cardVisual.src}
                alt={project.cardVisual.alt}
                loading="lazy"
                decoding="async"
                style={{ maxWidth: "min(420px, 100%)", height: "auto", display: "block", borderRadius: "18px" }}
              />
            </Box>
            <ViewHint />
          </Flex>
        )}
      </Box>
    </Box>
  );
};

export default ProjectCard;
