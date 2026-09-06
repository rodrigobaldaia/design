import { Box, Container, Flex, Heading, Link, Text } from "@chakra-ui/react";
import { FaLinkedin } from "@react-icons/all-files/fa/FaLinkedin";
import { LuCopy, LuCheck } from "react-icons/lu";
import { RxArrowTopRight } from "react-icons/rx";
import { useState } from "react";
import { toaster } from "../components/ui/toaster";

/**
 * Contact footer — the closing section of every page. Large editorial
 * invitation, email copy-to-clipboard and LinkedIn.
 */
const Footer = () => {
  const email = "rodrigopratabaldaia@gmail.com";
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    toaster.create({
      title: "Copied to clipboard.",
      duration: 2000,
      closable: false,
      type: "success",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Box as="footer" bg="bg.canvas" borderTop="1px solid" borderColor="border">
      <Container maxW="1240px" mx="auto" px={{ base: 6, md: 8 }} pt={{ base: 20, md: 28 }} pb={10}>
        <Heading
          as="p"
          fontFamily="display"
          fontSize={{ base: "clamp(2rem, 8vw, 4rem)", md: "clamp(2.5rem, 6vw, 4.5rem)" }}
          fontWeight={600}
          lineHeight={1.05}
          letterSpacing="-0.03em"
          mb={{ base: 10, md: 14 }}
        >
          Let&rsquo;s build something{" "}
          <Box as="em" fontFamily="serif" fontWeight={400}>
            clear.
          </Box>
        </Heading>

        <Flex
          direction={{ base: "column", md: "row" }}
          justify="space-between"
          align={{ base: "stretch", md: "flex-end" }}
          gap={8}
        >
          <Flex direction="column" gap={3} align="start">
            <Text
              fontSize="xs"
              fontWeight={600}
              letterSpacing="0.12em"
              textTransform="uppercase"
              color="fg.subtle"
            >
              Get in touch
            </Text>

            <Link
              as="button"
              onClick={handleCopy}
              fontSize={{ base: "md", md: "lg" }}
              fontWeight={500}
              color="fg"
              textDecoration="none"
              _hover={{ opacity: 0.7 }}
              transition="opacity 0.2s ease"
              display="inline-flex"
              alignItems="center"
              gap={2}
              aria-label={`Copy email address ${email}`}
            >
              {email}
              {copied ? <LuCheck aria-hidden /> : <LuCopy aria-hidden />}
            </Link>

            <Link
              href="https://www.linkedin.com/in/rodrigopratabaldaia/"
              target="_blank"
              rel="noopener noreferrer"
              fontSize={{ base: "md", md: "lg" }}
              fontWeight={500}
              color="fg"
              _hover={{ opacity: 0.7 }}
              transition="opacity 0.2s ease"
              display="inline-flex"
              alignItems="center"
              gap={1}
            >
              LinkedIn <RxArrowTopRight aria-hidden />
            </Link>
          </Flex>

          <Flex
            justify="space-between"
            align="flex-end"
            color="fg.subtle"
            fontSize="sm"
            gap={6}
          >
            <Text>© 2026 Rodrigo Prata Baldaia</Text>
            <Text>UX Designer · Germany</Text>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};

export default Footer;
