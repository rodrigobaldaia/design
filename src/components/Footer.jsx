"use client"

import { Box, Flex, IconButton, Link, Button, useClipboard } from "@chakra-ui/react";
import { ArrowUp, Linkedin } from "lucide-react";
import { FaLinkedin } from "@react-icons/all-files/fa/FaLinkedin";

const Footer = () => {

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Box as="footer" py={4} px={4} bg="none" color="black">
      <Flex justify="space-between" align="center">
        {/* Email */}
        <Button variant="ghost" size="sm">
      your.email@example.com
    </Button>

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
          <IconButton
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