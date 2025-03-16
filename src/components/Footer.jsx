"use client"

import { Box, Flex, IconButton, Link, Button, Text, HStack} from "@chakra-ui/react";
import { ArrowUp, Linkedin } from "lucide-react";
import { FaLinkedin } from "@react-icons/all-files/fa/FaLinkedin";
import { FaClipboard} from "@react-icons/all-files/fa/FaClipboard";
import { useState } from "react";

const Footer = () => {
  const [copied, setCopied] = useState(false);
  const email = "your.email@example.com";
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
    <Box as="footer" py={4} px={4} bg="white">
      <Flex justify="space-between" align="center">
        {/* Email with Copy Clipboard */}
        <HStack spacing={2}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}>
          <Text pl={2}> {copied ? "Email copied!" : email}</Text>
          {isHovered && (
          <IconButton
          aria-label="Copy email"
          variant="ghost"
          size="sm"
          onClick={handleCopy}
        >
          <FaClipboard />
        </IconButton>
       )}
        </HStack>

        {/* Social & Scroll to Top Buttons */}
        <Flex gap={3}>
          {/* LinkedIn Button */}
          <Link href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
            <IconButton
              aria-label="LinkedIn"
              variant="ghost"
              color="black"
            >
              <FaLinkedin />
            </IconButton>
          </Link>

          {/* Scroll to Top Button */}
          {/*<IconButton
            aria-label="Scroll to Top"
            variant="ghost"
            color="black"
            onClick={scrollToTop}
          >
            <ArrowUp />
          </IconButton>*/}
        </Flex>
      </Flex>
    </Box>
  );
};

export default Footer;