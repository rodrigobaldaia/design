import { Flex, Heading, Tabs, Box } from "@chakra-ui/react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

const Header = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isScrolled, setIsScrolled] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);
  const headerRef = useRef(null);

  // Detect scroll
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Measure header height dynamically
  useEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight);
    }
  }, [isScrolled]);

  const getTabValue = () => {
    if (location.pathname.startsWith("/design/about")) return "about";
    return "work";
  };

  return (
    <>
      <Flex
        ref={headerRef}
        position="fixed"
        top="0"
        left="0"
        right="0"
        zIndex={1000}
        justify="center"
      >
        {/* Desktop header */}
        <Flex
          display={{ base: "none", md: "flex" }}
          justify="space-between"
          align="center"
          py={isScrolled ? 4 : 8}
          mt={isScrolled ? 4 : 0}
          px={{
            base: isScrolled ? 4 : 8, 
            xl: isScrolled ? 4 : 0 
          }}
          bg={isScrolled ? "rgba(255, 255, 255, 0.8)" : "white"}
          backdropFilter={isScrolled ? "blur(10px)" : "none"}
          borderRadius={isScrolled ? "4xl" : "none"}
          boxShadow={isScrolled ? "lg" : "none"}
          maxW={isScrolled ? "1212px" : "1240px"}
          mx="auto"
          width="100%"
          transition="all 0.3s ease"
        >
          <Heading size="xl">Rodrigo Baldaia</Heading>
          <Tabs.Root value={getTabValue()} variant="plain" maxW="md" fitted size="md">
            <Tabs.List bg="bg.muted" rounded="4xl" p="1">
              <Tabs.Trigger as={Link} to="/design/" value="work">Work</Tabs.Trigger>
              <Tabs.Trigger as={Link} to="/design/about" value="about">About</Tabs.Trigger>
              <Tabs.Indicator rounded="4xl" />
            </Tabs.List>
          </Tabs.Root>
        </Flex>

        {/* Mobile header */}
        <Flex
          display={{ base: "flex", md: "none" }}
          direction="column"
          align="center"
          py={8}
          px={4}
          width="100%"
        >
          {/* Tabs always on top */}
          <Tabs.Root value={getTabValue()} variant="plain" size="lg">
            <Tabs.List bg="bg.muted" rounded="4xl" p="1" justifyContent="center">
              <Tabs.Trigger as={Link} to="/design/" value="work">Work</Tabs.Trigger>
              <Tabs.Trigger as={Link} to="/design/about" value="about">About</Tabs.Trigger>
              <Tabs.Indicator rounded="4xl" />
            </Tabs.List>
          </Tabs.Root>

        </Flex>
      </Flex>

      {/* Main content pushed down dynamically */}
      <Box pt={`${headerHeight}px`}>
        {children}
      </Box>
    </>
  );
};

export default Header;
