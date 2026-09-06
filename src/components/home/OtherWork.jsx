import { Box, Flex } from "@chakra-ui/react";
import { RxArrowTopRight } from "react-icons/rx";
import { BOSCH_MEDIA } from "../../data/projects";
import { useLightbox } from "./OverlayProvider";
import { useReveal } from "../../hooks/useReveal";

/**
 * OtherWork — the Bosch creative block (3D product visuals), kept from the
 * previous site and restyled for the new system. Media opens the lightbox;
 * product-page links stay attached to each visual.
 */

const CreativeMediaItem = ({ flatIdx }) => {
  const { openLightbox } = useLightbox();
  const { src, href, label, alt, aspectRatio, maxH } = BOSCH_MEDIA[flatIdx];

  return (
    <Box
      className="card-media"
      position="relative"
      borderRadius="18px"
      overflow="hidden"
      bg="bg.subtle"
      cursor="zoom-in"
      onClick={() => openLightbox(BOSCH_MEDIA, flatIdx)}
      role="button"
      tabIndex={0}
      aria-label={`View fullscreen: ${alt}`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openLightbox(BOSCH_MEDIA, flatIdx);
        }
      }}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        style={{
          display: "block",
          width: "100%",
          height: "auto",
          maxHeight: maxH || "none",
          objectFit: aspectRatio ? "contain" : "cover",
          aspectRatio: aspectRatio || undefined,
          padding: aspectRatio ? "12px" : undefined,
          boxSizing: "border-box",
        }}
      />
      <Box
        as="a"
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        position="absolute"
        bottom={3}
        left={3}
        borderRadius="full"
        bg="bg/85"
        backdropFilter="blur(8px)"
        border="1px solid"
        borderColor="border"
        px={4}
        py={1.5}
        fontSize="2xs"
        fontWeight={600}
        letterSpacing="0.06em"
        textTransform="uppercase"
        color="fg"
        textDecoration="none"
        _hover={{ bg: "bg" }}
        transition="background 0.2s ease"
        onClick={(e) => e.stopPropagation()}
      >
        {label} <RxArrowTopRight size={12} style={{ verticalAlign: "-2px" }} />
      </Box>
    </Box>
  );
};

const OtherWork = () => {
  const { ref, visible } = useReveal(0.08);

  return (
    <Box
      ref={ref}
      as="section"
      aria-labelledby="other-work-title"
      className={`reveal${visible ? " revealed" : ""}`}
      pt={{ base: 24, md: 40 }}
    >
      <Box as="p" fontSize="2xs" fontWeight={600} letterSpacing="0.16em" textTransform="uppercase" color="fg.subtle" mb={3}>
        Beyond product design
      </Box>
      <Box
        as="h2"
        id="other-work-title"
        fontFamily="display"
        fontSize={{ base: "clamp(1.75rem, 5.5vw, 3.25rem)", md: "clamp(2rem, 4vw, 3.25rem)" }}
        fontWeight={600}
        lineHeight={1.02}
        letterSpacing="-0.03em"
        mb={3}
      >
        3D visuals for Bosch brands
      </Box>
      <Box as="p" fontSize={{ base: "md", md: "lg" }} color="fg.muted" maxW="560px" mb={{ base: 8, md: 12 }}>
        Product renders for Electro-Voice, RTS and TELEX, created while working as a
        graphic designer at Bosch.
      </Box>

      <Flex direction="column" gap={4}>
        <CreativeMediaItem flatIdx={0} />
        <Flex direction={{ base: "column", md: "row" }} gap={4}>
          <Box flex="1">
            <CreativeMediaItem flatIdx={1} />
          </Box>
          <Box flex="1">
            <CreativeMediaItem flatIdx={2} />
          </Box>
        </Flex>
        <CreativeMediaItem flatIdx={3} />
      </Flex>
    </Box>
  );
};

export default OtherWork;
