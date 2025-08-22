"use client"

import { Box, Button, Flex, IconButton, Text, Link, HStack, Heading } from "@chakra-ui/react";
import { ArrowUp } from "lucide-react";
import { FaLinkedin } from "@react-icons/all-files/fa/FaLinkedin";
import { RxArrowTopRight } from "react-icons/rx";
import { LuCopy } from "react-icons/lu";
import { useState } from "react";
import { Toaster, toaster } from "../components/ui/toaster"

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

  const copyToClipboard = async () => {
    navigator.clipboard.writeText(email);
    toaster.create({
      title: `Copied to clipboard.`,
      duration: 2000,
      closable: false,
      type: "success",
    });
  };

  return (
    <Box as="footer" py={8} px={{ base: "8", xl: "0" }} bg="white">
      <Flex
        maxW="1240px"
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
            onClick={() => copyToClipboard(email)}
          >{copied ? "Email copied!" : email}</Link>
          {isHovered && (
            <LuCopy />

          )}
        </HStack>

        {/* Mobile: Show a full button with email + clipboard icon + Linkedin */}
        <Flex direction="column" display={{ base: "flex", md: "none" }} gap={2} mt={8} fontSize="md">
          <Heading as="h1" fontWeight="semibold">
            Contact
          </Heading>

          <Text
            w="fit-content"
          >
            {email}
          </Text>


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