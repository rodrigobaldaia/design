import { Box, Flex, Link } from "@chakra-ui/react";

/**
 * Hero — minimal, typography-driven introduction. Big display type with a
 * serif-italic accent; a small scroll cue links to the project showcase.
 */
const Hero = () => (
  <Flex
    as="section"
    aria-label="Introduction"
    maxW="1240px"
    mx="auto"
    px={{ base: 6, md: 8 }}
    minH={{ base: "calc(100svh - 120px)", md: "calc(100svh - 96px)" }}
    direction="column"
    justify="center"
    position="relative"
  >
    <Flex direction="column" gap={{ base: 6, md: 8 }}>
      <Box
        as="p"
        className="hero-line"
        style={{ animationDelay: "0.05s" }}
        fontSize={{ base: "xs", md: "sm" }}
        fontWeight={600}
        letterSpacing="0.16em"
        textTransform="uppercase"
        color="fg.subtle"
      >
        Rodrigo Prata Baldaia — UX Designer
      </Box>

      <Box
        as="h1"
        fontFamily="display"
        fontSize={{ base: "clamp(2.6rem, 11vw, 5.5rem)", md: "clamp(3rem, 8.5vw, 7rem)" }}
        fontWeight={600}
        lineHeight={{ base: 1.04, md: 1.01 }}
        letterSpacing="-0.04em"
        color="fg"
      >
        <Box as="span" className="hero-line" display="block" style={{ animationDelay: "0.15s" }}>
          Designing{" "}
          <Box as="em" fontFamily="serif" fontWeight={400} letterSpacing="-0.02em">
            clear
          </Box>
        </Box>
        <Box as="span" className="hero-line" display="block" style={{ animationDelay: "0.28s" }}>
          tools for complex
        </Box>
        <Box as="span" className="hero-line" display="block" style={{ animationDelay: "0.41s" }}>
          workflows.
        </Box>
      </Box>

      <Box
        as="p"
        className="hero-line"
        style={{ animationDelay: "0.55s" }}
        fontSize={{ base: "md", md: "lg" }}
        color="fg.muted"
        maxW="520px"
        lineHeight={1.5}
      >
        Currently designing audio &amp; video software at{" "}
        <Link
          href="https://elgato.com"
          target="_blank"
          rel="noopener noreferrer"
          color="fg"
          textDecoration="underline"
          textUnderlineOffset="4px"
          _hover={{ opacity: 0.6 }}
          transition="opacity 0.2s ease"
        >
          Elgato
        </Link>
        , a division of CORSAIR.
      </Box>
    </Flex>

    {/* Scroll cue */}
    <Link
      href="#projects"
      className="hero-line"
      style={{ animationDelay: "0.75s" }}
      position="absolute"
      bottom={{ base: 6, md: 8 }}
      left={{ base: 6, md: 8 }}
      display="inline-flex"
      alignItems="center"
      gap={3}
      aria-label="Scroll to projects"
      fontSize="xs"
      fontWeight={600}
      letterSpacing="0.14em"
      textTransform="uppercase"
      color="fg.subtle"
      textDecoration="none"
      _hover={{ color: "fg" }}
      transition="color 0.2s ease"
    >
      Scroll
      <Box as="span" width="1px" height={{ base: "32px", md: "40px" }} bg="border.emphasized" display="inline-block">
        <Box
          as="span"
          className="scroll-cue-line"
          display="block"
          width="100%"
          height="100%"
          bg="fg"
        />
      </Box>
    </Link>
  </Flex>
);

export default Hero;
