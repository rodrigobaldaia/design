"use client"

import { Box, Flex, IconButton, Link, HStack, Heading } from "@chakra-ui/react";
import { ArrowUp } from "lucide-react";
import { FaLinkedin } from "@react-icons/all-files/fa/FaLinkedin";
import { RxArrowTopRight } from "react-icons/rx";
import { LuCopy } from "react-icons/lu";
import { useState } from "react";

const Footer = () => {
  const [copied, setCopied] = useState(false);
  const email = "rodbaldaia@gmail.com";
  const [isHovered, setIsHovered] = useState(false);


  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Box as="footer" py={6} px={6} bg="white">
      <Flex
        maxW="1200px"
        mx="auto"
        justify="space-between"
        align="left"
        direction={{ base: "column", md: "row" }}
      >
        {/* Desktop: Show email + hover effect */}
        <HStack
          spacing={4}
          display={{ base: "none", md: "flex" }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Link 
          onClick={handleCopy}
          >{copied ? "Email copied!" : email}</Link>
          {isHovered && (
            <LuCopy />
            
          )}
        </HStack>

        {/* Mobile: Show a full button with email + clipboard icon + Linkedin */}
        <Flex direction="column" display={{ base: "flex", md: "none" }} gap={2} fontSize="md">
          <Heading as="h1" fontWeight="semibold">
            Contact
          </Heading>
          
          <Link
            aria-label="Copy email"
            w="fit-content"
            onClick={handleCopy}
            gap={2}
          >
            {copied ? "Email copied!" : email}
            <LuCopy />
          </Link>

          <Link href="https://www.linkedin.com/in/rodrigobaldaia/" target="_blank">
          Linkedin
          <RxArrowTopRight />
          </Link>

        </Flex>

        {/* Social & Scroll to Top Buttons */}
        <Flex gap={3}>
          {/* LinkedIn Button Desktop */}
          <IconButton
            as="a" href="https://www.linkedin.com/in/rodrigobaldaia/" target="_blank"
            display={{ base: "none", md: "flex" }}
            aria-label="LinkedIn"
            variant="ghost"
          >
            <FaLinkedin />
          </IconButton>

          {/* Scroll to Top Button Desktop */}
          <IconButton
            display={{ base: "none", md: "flex" }}
            aria-label="Scroll to Top"
            variant="ghost"
            color="black"
            onClick={scrollToTop}
          >
            <ArrowUp />
          </IconButton>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Footer;