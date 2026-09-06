import { Box, Flex, Link as ChakraLink, IconButton } from "@chakra-ui/react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "../theme/ThemeProvider";

/**
 * Floating header — a lightweight pill that stays accessible while
 * scrolling: wordmark on the left, Work / About and the theme toggle on
 * the right. Gains a blurred backdrop once the page scrolls.
 */
const Header = () => {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 8);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isAbout = location.pathname.startsWith("/design/about");

  return (
    <Box
      as="header"
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex={1000}
      px={{ base: 3, md: 4 }}
      pt={{ base: 3, md: 4 }}
      pointerEvents="none"
    >
      <Flex
        as="nav"
        aria-label="Main navigation"
        maxW="1240px"
        mx="auto"
        justify="space-between"
        align="center"
        gap={2}
        px={{ base: 3, md: 4 }}
        py={2.5}
        borderRadius="full"
        pointerEvents="auto"
        bg={isScrolled ? "bg/85" : "transparent"}
        backdropFilter={isScrolled ? "blur(14px)" : "none"}
        boxShadow={isScrolled ? "0 1px 12px rgba(0,0,0,0.06)" : "none"}
        border="1px solid"
        borderColor={isScrolled ? "border" : "transparent"}
        transition="all 0.25s ease"
        sx={{
          "@supports not (backdrop-filter: blur(1px))": {
            bg: isScrolled ? "bg" : "transparent",
          },
        }}
      >
        <ChakraLink
          as={RouterLink}
          to="/design/"
          aria-label="Rodrigo Prata Baldaia — back to top"
          fontFamily="display"
          fontWeight={600}
          fontSize={{ base: "sm", md: "md" }}
          letterSpacing="-0.01em"
          color="fg"
          textDecoration="none"
          whiteSpace="nowrap"
          _hover={{ opacity: 0.7 }}
          transition="opacity 0.2s ease"
        >
          Rodrigo&nbsp;Baldaia
        </ChakraLink>

        <Flex align="center" gap={1}>
          <Flex
            as="ul"
            listStyleType="none"
            m={0}
            p={1}
            gap={1}
            bg="bg.subtle"
            borderRadius="full"
          >
            {[
              { label: "Work", to: "/design/", active: !isAbout },
              { label: "About", to: "/design/about", active: isAbout },
            ].map(({ label, to, active }) => (
              <Box as="li" key={label}>
                <ChakraLink
                  as={RouterLink}
                  to={to}
                  aria-current={active ? "page" : undefined}
                  display="block"
                  px={3.5}
                  py={1.5}
                  borderRadius="full"
                  fontSize={{ base: "xs", md: "sm" }}
                  fontWeight={500}
                  letterSpacing="0.02em"
                  textDecoration="none"
                  color={active ? "bg.canvas" : "fg.muted"}
                  bg={active ? "fg" : "transparent"}
                  _hover={{ color: active ? "bg.canvas" : "fg" }}
                  transition="all 0.2s ease"
                >
                  {label}
                </ChakraLink>
              </Box>
            ))}
          </Flex>

          <IconButton
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            variant="ghost"
            size="sm"
            rounded="full"
            color="fg.muted"
            onClick={toggleTheme}
            _hover={{ color: "fg", bg: "bg.subtle" }}
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </IconButton>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Header;
