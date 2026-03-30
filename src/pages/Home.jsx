import { useLocation, useNavigate } from "react-router-dom";
import { Text, Box, Button, Image, Flex, Heading, Grid, IconButton, Tabs, Link, VStack } from "@chakra-ui/react";
import { ArrowDown, ArrowUp, ArrowRight } from "lucide-react";
import { RxArrowTopRight } from "react-icons/rx";
import { MdLockOutline } from "react-icons/md";
import { useRef, useEffect, useState } from "react";
import PaletteGenerator from "../components/PaletteGenerator";
import { vh } from "framer-motion";


const Home = () => {

  const [isVisible, setIsVisible] = useState(false);

  // Show button only when scrolling down
  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 1000); // Adjust value of scrool
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const projectsRef = useRef(null);
  const location = useLocation();

  const scrollToProjects = () => {
    projectsRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (location.state?.scrollToProjects) {
      scrollToProjects();
    }
  }, [location]);

  let navigate = useNavigate();

  return (

    <Box my={{ base: "0", md: "0" }} px={{ base: "8", xl: "0" }}>
      <Box
        maxW="1240px"
        mx="auto"
        minH={{ base: "calc(100vh - 256px)", xl: "calc(100vh - 112px)" }}
        display="flex"
        flexDirection="column"
        px={{ base: "8", xl: "0" }}
        gap="2rem"
      >
        <VStack p={{ base: 8, xl: 0 }}>
          {/* Header for mobile only */}
          <Heading
            size="2xl"
            display={{ base: "block", md: "none" }}
            width={"100%"}
            textAlign={"center"}
          >
            Rodrigo Prata Baldaia.</Heading>
        </VStack>

        {/* Centered text container */}
        <Flex flex="1" align="center" justify="center">

          <Text
            fontSize={"clamp(2rem, 5vw, 4.5rem)"}
            fontWeight={600}
            textTransform="uppercase"
            textAlign={{ base: "center", xl: "left" }}
          >
            UX Designer based in Germany. Currently working at{" "}
            <a
              href="https://elgato.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "black", textDecoration: "underline" }}
            >
              Elgato
            </a>
            , a division of CORSAIR.
            <br />Previously at Bosch.
          </Text>
        </Flex>

        {/* Button fixed at bottom */}
        <Box pb={{ base: 0, xl: 8 }} textAlign="center">
          <Button
            onClick={scrollToProjects}
            variant="outline"
            size="lg"
            rounded="full"
          >
            See my projects
            <ArrowDown />
          </Button>
        </Box>
      </Box>

      <Box ref={projectsRef} pt={{ base: "32", md: "40" }} maxW="1240px" mx="auto">
        <VStack align={"start"}>
          <Heading size="2xl" fontWeight="normal" color={"gray.500"}>
            2026
          </Heading>
          <Heading size="3xl" fontWeight="bold">
            Wave Link 3.0,
          </Heading>
          <Heading size="2xl" fontWeight="medium" mb={16} color={"gray.500"}>
            a complete redesign of Elgato’s creator audio-mixing software.
          </Heading>
        </VStack>

        <Box borderRadius="lg" overflow="hidden">
          <video width="100%" autoPlay loop>
            <source src="./assets/Limitless_routing_Desk.webm" type="video/webm" />
            Your browser does not support the video tag.
          </video>
        </Box>


        <Flex direction={{ base: "column", md: "column" }} justify="left" w="100%" mx="auto" py={{ base: 12, md: 24 }} gap={{ base: 12, md: 24 }} >
          <Box flex="2" fontSize="xl" maxW={640} textAlign="left">

            <Text mb={8}>
              Wave Link is Elgato’s audio-mixing software used by creators, streamers, and professionals. Wave Link 3.0 is a full cross-platform redesign built on native Windows and macOS frameworks, where I, after joining during the 2.0 update, helped redefine core navigation, interaction patterns, and UI architecture to improve clarity and performance.
            </Text>

            <Text mb={8}>
              Research revealed that many users primarily wanted great microphone quality without engaging with routing, which led me to shape the new Device View and first-time setup flow—consolidating hardware controls, reducing cognitive load, and guiding new users through the essentials with clearer onboarding and more intentional hand-holding.
            </Text>

            <Text>
              The Mixer update and introduction of the Routing Table were backed by research insights and supported by clearer mental models and simplified interactions, helping advanced features remain approachable.
            </Text>

          </Box>

          <VStack gap={4}>
            <Box borderRadius="lg" overflow="hidden">
              <video width="100%" autoPlay loop>
                <source src="./assets/WL3_Setup_tour.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </Box>

            <Box borderRadius="lg" overflow="hidden" >
              <video width="100%" autoPlay loop>
                <source src="./assets/Start_Simple_-_Wave3_MK2_Desktop.webm" type="video/webm" />
                Your browser does not support the video tag.
              </video>
            </Box>
          </VStack>

          <VStack gap={4} align={"left"} fontSize="xl" textAlign="left">
            <Link variant="plain" href="https://www.elgato.com/us/en/explorer/products/wave/wave-link-30-redefining-creator-audio-control/" target="_blank">
              Learn more
              <RxArrowTopRight />
            </Link>

            <Link variant="plain" href="https://www.elgato.com/ww/en/s/beta" target="_blank">
              Download the app
              <RxArrowTopRight />
            </Link>
          </VStack>

        </Flex>
      </Box>


      <Box mt={{ base: 16, md: 32 }} py={24} mx="auto" bgColor={"green.50"}>
        <Box maxW="1240px" mx="auto">
          <VStack align={"start"}>
            <Heading size="2xl" fontWeight="normal" color={"gray.500"}>
              2026
            </Heading>
            <Heading size="3xl" fontWeight="bold">
              Wave Link plugin for Stream Deck,
            </Heading>
            <Heading size="2xl" fontWeight="medium" mb={16} color={"gray.500"}>
              hands-on control for your audio mix.
            </Heading>
          </VStack>

          <Box borderRadius="lg" overflow="hidden">
            <video width="100%" autoPlay loop>
              <source src="./assets/2026-03-03T11_06_18.004592.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </Box>

          <Flex direction={{ base: "column", md: "column" }} justify="left" w="100%" mx="auto" py={{ base: 12, md: 24 }} gap={{ base: 12, md: 24 }}>
            <Box flex="2" fontSize="xl" maxW={640} textAlign="left">
              <Text mb={8}>
                Alongside Wave Link 3.0, the Wave Link plugin for Stream Deck received a complete redesign to better integrate audio control into the Stream Deck ecosystem.
              </Text>

              <Text mb={8}>
                The plugin was rebuilt from the ground up with a new visual language and interaction model for keys and dials. I designed these interactions to feel tactile and familiar while keeping the experience consistent with the broader Stream Deck interface.
              </Text>

              <Text>
                The update made controlling mixes, monitoring levels, and adjusting key audio parameters faster and more intuitive, giving creators direct, hands-on control over their Wave Link setup.
              </Text>
            </Box>

            <Box borderRadius="lg" overflow="hidden" >
              <Image src="./assets/WaveLink3(Beta)-preview-dials.png" w="100%" h="auto" objectFit="cover" borderRadius="lg" />
            </Box>

            <VStack gap={4} align={"left"} fontSize="xl" textAlign="left">
              <Link variant="plain" href="https://www.elgato.com/de/en/explorer/products/wave/wave-link-plugin-for-stream-deck/" target="_blank">
                Learn more
                <RxArrowTopRight />
              </Link>

              <Link variant="plain" href="https://marketplace.elgato.com/product/wave-link-aa41150f-9645-4275-b064-7642ba6a17ae" target="_blank">
                Try it out
                <RxArrowTopRight />
              </Link>
            </VStack>

          </Flex>

        </Box>
      </Box>

      <Box pt={{ base: "32", md: "40" }} maxW="1240px" mx="auto">

        <VStack align={"start"}>
          <Heading size="2xl" fontWeight="normal" color={"gray.500"}>
            2025
          </Heading>
          <Heading size="3xl" fontWeight="bold">
            Elgato Studio,
          </Heading>
          <Heading size="2xl" fontWeight="medium" mb={16} color={"gray.500"}>
            instant control for recording and capture workflows.
          </Heading>
        </VStack>

        <Box borderRadius="lg" overflow="hidden" >
          <Image src="./assets/elgato_studio_app_game_screen_recording.png" w="100%" borderRadius="lg" />
        </Box>

        <Flex direction={{ base: "column", md: "column" }} justify="left" w="100%" mx="auto" py={{ base: 12, md: 24 }} gap={{ base: 12, md: 24 }}>
          <Box flex="2" fontSize="xl" maxW={640} textAlign="left">

            <Text mb={8}>
              Elgato Studio is a recording and capture tool designed to give creators quick access to essential actions such as starting recordings, snapping screenshots, and managing audio.
            </Text>

            <Text mb={8}>
              I was responsible for the UX and interface design of the desktop software and its Stream Deck plugin, helping shape a workflow where recording controls, capture actions, and monitoring tools are accessible instantly from Stream Deck.
            </Text>

            <Text>
              The goal was to reduce friction during live or fast-paced moments, allowing creators to trigger recording and capture actions reliably without interrupting their flow.
            </Text>

          </Box>

          <Box borderRadius="lg" overflow="hidden" >
            <Image src="./assets/ElgatoStudio-preview-plugin.png" w="100%" maxHeight="550px" borderRadius="lg" />
          </Box>

          <VStack gap={4} align={"left"} fontSize="xl" textAlign="left">
            <Link variant="plain" href="https://www.elgato.com/ww/en/s/downloads" target="_blank">
              Download app
              <RxArrowTopRight />
            </Link>

            <Link variant="plain" href="https://marketplace.elgato.com/product/elgato-studio-6cba5ea5-9e17-4e8b-8ea8-8476ca15042a" target="_blank">
              Download plugin
              <RxArrowTopRight />
            </Link>
          </VStack>

        </Flex>

      </Box>


      <Box pt={{ base: "32", md: "40" }} maxW="1240px" mx="auto">

        <VStack align={"start"}>
          <Heading size="2xl" fontWeight="normal" color={"gray.500"}>
            2025
          </Heading>
          <Heading size="3xl" fontWeight="bold">
            Wave Link 2.0,
          </Heading>
          <Heading size="2xl" fontWeight="medium" mb={16} color={"gray.500"}>
            redesigning audio control with one-click routing, streamlined mic setup, and AI effects.
          </Heading>
        </VStack>

        <Box borderRadius="lg" overflow="hidden" >
          <video width="100%" autoPlay loop>
            <source src="./assets/WL2.0_Apps.webm" type="video/webm" />
            Your browser does not support the video tag.
          </video>
        </Box>

        <Flex direction={{ base: "column", md: "column" }} justify="left" w="100%" mx="auto" py={{ base: 12, md: 24 }} gap={{ base: 12, md: 24 }}>
          <Box flex="2" fontSize="xl" maxW={640} textAlign="left">

            <Text mb={8}>
              Wave Link 2.0 focused on simplifying complex audio workflows for creators and streamers. I led the UX design of features like one-click audio routing, AI-powered audio effects enhanced mic quality automatically, and streamlined mic checks that guide users through setup quickly and reliably.
            </Text>

            <Text>
              The update combined usability improvements with advanced features, laying the groundwork for a more intuitive, scalable Wave Link experience in future releases.
            </Text>

          </Box>

          <VStack gap={4}>
            <Grid templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }} gap={4} maxW="100%">
              <Image src="./assets/Screenshot-2025-02-04-at-5.22.36 PM.png" w="100%" h="auto" aspectRatio={1} objectFit="cover" borderRadius="lg" />
              <Image src="./assets/AddToWaveLink.jpg" w="100%" h="auto" aspectRatio={1} objectFit="cover" borderRadius="lg" />
            </Grid>

            <Box borderRadius="lg" overflow="hidden" >
              <video width="100%" autoPlay loop>
                <source src="./assets/WaveLink20_VoiceFocus.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </Box>
          </VStack>

          <VStack gap={4} align={"left"} fontSize="xl" textAlign="left">
            <Link variant="plain" href="https://www.elgato.com/us/en/s/wave-link" target="_blank">
              Learn more
              <RxArrowTopRight />
            </Link>
          </VStack>

        </Flex>

      </Box>


      <Box pt={{ base: "32", md: "40" }} maxW="1240px" mx="auto">

        <VStack align={"start"}>
          <Heading size="2xl" fontWeight="normal" color={"gray.500"}>
            2024
          </Heading>
          <Heading size="3xl" fontWeight="bold">
            Elgato Capture,
          </Heading>
          <Heading size="2xl" fontWeight="medium" mb={16} color={"gray.500"}>
            an iPadOS to play and capture gameplay using an Elgato capture card.
          </Heading>
        </VStack>

        <Box borderRadius="lg" overflow="hidden" >
          <Image src="./assets/Game_Capture_Neo_Lifestyle_Shot_02.jpg" w="100%" maxHeight="550px" borderRadius="lg" />
        </Box>

        <Flex direction={{ base: "column", md: "column" }} justify="left" w="100%" mx="auto" py={{ base: 12, md: 24 }} gap={{ base: 12, md: 24 }}>
          <Box flex="2" fontSize="xl" maxW={640} textAlign="left">

            <Text>
              High-quality game and video recording on iPad, compatible with major consoles
              and cameras. I designed a touch-friendly, intuitive interface for quick setup,
              precise recording, and real-time monitoring—making professional game capture
              portable and accessible.
            </Text>

          </Box>

          <Grid templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }} gap={4} maxW="100%" pb={4} pt={4}>
            <Image src="./assets/Game_Capture_Neo_Lifestyle_Shot_01.png" w="100%" h="auto" aspectRatio={1} objectFit="cover" borderRadius="lg" />
            <Image src="./assets/Game_Capture_4K_X_Lifestyle_Shot_06_A.png" w="100%" h="auto" aspectRatio={1} objectFit="cover" borderRadius="lg" />
          </Grid>

          <VStack gap={4} align={"left"} fontSize="xl" textAlign="left">
            <Link variant="plain" href="https://apps.apple.com/de/app/elgato-capture/id6456798479" target="_blank">
              View iPad app
              <RxArrowTopRight />
            </Link>
          </VStack>

        </Flex>

      </Box>


      {/*  
      <Box pt={{ base: "32", md: "40" }} pb={4} maxW="1240px" mx="auto">
        <Text fontSize="2xl" fontWeight={600}>
          Design smarter palettes,
        </Text>
        <Text fontSize="2xl" fontWeight={400} mb={8} color={"gray.500"}>
          a personal project.
        </Text>

        <VStack align={"start"} gap={8}>

          <Box borderRadius="lg" overflow="hidden" w={"100%"} borderWidth="1px" borderColor="gray.200">
            <video width="100%" autoPlay loop muted>
              <source src="./assets/ToolPreview.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </Box>

        </VStack>

        <Flex direction={{ base: "column", md: "row" }} justify="center" maxW="1240px" w="100%" mx="auto" py={{ base: 12, md: 16 }} gap={{ base: 12, md: 16 }} >
          <Box flex="2" fontSize="xl" maxW="700px" textAlign="left">

            <Text>
              An in-browser AI-powered color palette generator built with React and
              Chakra UI, integrating the TinyLlama-1.1B model via WebLLM for efficient
              local inference with WebGPU. It features dynamic generation from user
              prompts, intelligent palette naming, and color fine-tuning.
            </Text>

          </Box>

          <Box flex="1" fontSize="xl" textAlign="left">

            <Heading as="h3" mb={2}>
              Link
            </Heading>
            <Link variant="plain" onClick={() => navigate("/design/color-palette")}>
              Try AI Palette Generator
              <RxArrowTopRight />
            </Link>

          </Box>

        </Flex>

      </Box>

*/}


      <Box pt={{ base: "32", md: "40" }} maxW="1240px" mx="auto">

        <VStack align={"start"}>
          <Heading size="2xl" fontWeight="normal" color={"gray.500"}>
            2022-2023
          </Heading>
          <Heading size="3xl" fontWeight="bold">
            UX Research and UI for GritGene,
          </Heading>
          <Heading size="2xl" fontWeight="medium" mb={16} color={"gray.500"}>
            a next-gen 3D real-time rendering engine.
          </Heading>
        </VStack>

        <Box borderRadius="lg" overflow="hidden" boxShadow="lg" >
          <Image src="./assets/Input_value_helper.png" w="100%" h="auto" borderRadius="lg" />
        </Box>

        <Flex direction={{ base: "column", md: "column" }} justify="left" w="100%" mx="auto" py={{ base: 12, md: 24 }} gap={{ base: 12, md: 24 }}>
          <Box flex="2" fontSize="xl" maxW={640} textAlign="left">

            <Text mb={{ base: 0, md: 6 }}>
              At GritWorld, I shaped the GritGene design system and UX research, helping make the tool more intuitive and efficient while supporting the needs of professional users.
            </Text>
            <Text mb={{ base: 0, md: 6 }}>
              Details are confidential. Feel free to reach out to learn more.
            </Text>

          </Box>

        </Flex>

      </Box>


      <Box mt={{ base: 16, md: 24 }} pt={8} maxW="1240px" mx="auto">
        <Heading fontSize={{ base: "3xl", lg: "3xl" }} fontWeight={600} mb={{ base: "12", lg: "24" }} textTransform={"uppercase"}>
          Other creative projects
        </Heading>
        <Text fontSize="2xl" fontWeight={600}>
          Bosch Communications & Conference Systems
        </Text>
        <Text fontSize="2xl" fontWeight={400} mb={8} color={"gray.500"}>
          3D Visuals for Electro-Voice, RTS and TELEX
        </Text>

        <Box position="relative" w="100%">
          <Image
            src="./assets/EV_EVOLVE50M_Array_Exploded_Black_nbg.png"
            w="100%"
            maxH="600px"
            borderRadius="lg"
            bg="gray.100"
            pt={4}
          />

          <Button
            as="a"
            href="https://products.electrovoice.com/emea/en/evolve-50m/"
            target="_blank"
            variant="outline"
            size="md"
            rounded="full"
            position="absolute"
            bottom={4}
            left={4}
            bg="whiteAlpha.800"
            backdropFilter="blur(4px)"
          >
            See product page
            <RxArrowTopRight />
          </Button>
        </Box>

        <Box gap={16}>
          <Grid
            templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }}
            gap={4}
            maxW="100%"
            pt={4}
          >
            {/* Image 1 */}
            <Box position="relative">
              <Image
                src="./assets/EV_MTS-6154-43_Cardioid_Hero_GrilleOff_nbg.png"
                w="100%"
                h="auto"
                aspectRatio={1}
                objectFit="cover"
                borderRadius="lg"
                bg="gray.100"
              />

              <Button
                as="a"
                href="https://products.electrovoice.com/emea/en/mts/"
                target="_blank"
                variant="outline"
                size="md"
                rounded="full"
                position="absolute"
                bottom={4}
                left={4}
                bg="whiteAlpha.800"
                backdropFilter="blur(4px)"
              >
                See product page
                <RxArrowTopRight />
              </Button>
            </Box>

            {/* Image 2 */}
            <Box position="relative">
              <Image
                src="./assets/DBP_Bottom.png"
                w="100%"
                h="auto"
                aspectRatio={1}
                objectFit="cover"
                borderRadius="lg"
                bg="gray.100"
              />

              <Button
                as="a"
                href="https://products.rtsintercoms.com/na/en/dbp/"
                target="_blank"
                variant="outline"
                size="md"
                rounded="full"
                position="absolute"
                bottom={4}
                left={4}
                bg="whiteAlpha.800"
                backdropFilter="blur(4px)"
              >
                See product page
                <RxArrowTopRight />
              </Button>
            </Box>
          </Grid>

          <Box position="relative" w="100%" pt={4} mb={{ base: 0, md: 8 }} >
            <Image
              src="./assets/Everse8_02.png"
              w="100%"
              maxH="600px"
              borderRadius="lg"
              bg="gray.100"
              pt={4}
            />

            <Button
              as="a"
              href="https://products.electrovoice.com/emea/en/everse-8/"
              target="_blank"
              variant="outline"
              size="md"
              rounded="full"
              position="absolute"
              bottom={4}
              left={4}
              bg="whiteAlpha.800"
              backdropFilter="blur(4px)"
            >
              See product page
              <RxArrowTopRight />
            </Button>
          </Box>
        </Box>
      </Box>


      {/* Desktop: Scroll to Top Button */}
      <IconButton
        display={{ base: "none", md: "flex" }}
        aria-label="Scroll to Top"
        variant="subtle"
        rounded="full"
        size="md"
        onClick={scrollToTop}
        position="fixed"
        bottom="8"
        right="calc((100vw - 1240px) / 2 + 16px)" // aligns to content edge
        zIndex="1000"
        opacity={isVisible ? 1 : 0}
        transition="opacity 0.3s ease-in-out"
        bg="rgba(255, 255, 255, 0.7)"
        backdropFilter="blur(10px)"
        _hover={{ bg: "rgba(255, 255, 255, 1)" }}
      >
        <ArrowUp />
      </IconButton>

      {/* Mobile: Scroll to Top Button */}
      <IconButton
        display={{ base: "flex", md: "none" }}
        aria-label="Scroll to Top"
        variant="subtle"
        rounded="full"
        size="md"
        onClick={scrollToTop}
        position="fixed"
        bottom="12"
        right="12"
        zIndex="1000"
        opacity={isVisible ? 1 : 0}
        transition="opacity 0.3s ease-in-out"
        bg="rgba(255, 255, 255, 0.7)"
        backdropFilter="blur(10px)"
        _hover={{ bg: "rgba(255, 255, 255, 1)" }}
      >
        <ArrowUp />
      </IconButton>

    </Box>


  );
};

export default Home;