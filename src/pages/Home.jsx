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
      setIsVisible(window.scrollY > 4500); // Adjust value of scrool
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
            Rodrigo Baldaia.</Heading>
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

      <Box ref={projectsRef} pt={{ base: "32", md: "40" }}>
        <Text fontSize="2xl" fontWeight={600}>
          Wave Link - Pro audio for everyone
        </Text>
        <Text fontSize="2xl" fontWeight={400} mb={8} color={"gray.500"}>
          macOS & Windows
        </Text>
        <Box borderRadius="lg" overflow="hidden" >
          <video width="100%" autoPlay loop>
            <source src="./assets/WaveLink20_VoiceFocus.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </Box>
      </Box>

      <Grid templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }} gap={4} maxW="100%" pb={4} pt={4}>
        <Image src="./assets/Screenshot-2025-02-04-at-5.22.36 PM.png" w="100%" h="auto" aspectRatio={1} objectFit="cover" borderRadius="lg" />
        <Image src="./assets/AddToWaveLink.jpg" w="100%" h="auto" aspectRatio={1} objectFit="cover" borderRadius="lg" />
      </Grid>

      <Box borderRadius="lg" overflow="hidden" >
        <video width="100%" autoPlay loop>
          <source src="./assets/WL2.0_Apps.webm" type="video/webm" />
          Your browser does not support the video tag.
        </video>
      </Box>

      <Flex direction={{ base: "column", md: "row" }} justify="center" maxW="1200px" w="100%" mx="auto" py={{ base: 12, md: 16 }} gap={{ base: 12, md: 16 }} >
        <Box flex="2" fontSize="xl" maxW="700px" textAlign="left">

          <Text>
            Professional audio mixing software for creators, streamers, and podcasters.
            I led the UX design for Wave Link 2.0, introducing features like Voice Focus,
            one-click audio routing, streamlined mic checks, and deeper Stream Deck
            integration. Balanced simplicity for newcomers with advanced controls for power
            users through research, workflow refinements, and cross-platform design.
          </Text>

        </Box>

        <Box flex="1" fontSize="xl" textAlign="left">

          <Heading as="h3" mb={2}>
            My role
          </Heading>
          <Text mb={8}>
            Designer
          </Text>

          <Heading as="h3" mb={2}>
            Link
          </Heading>
          <Link variant="plain" href="https://www.elgato.com/us/en/s/wave-link" target="_blank">
            View Website
            <RxArrowTopRight />
          </Link>

        </Box>

      </Flex>

      <Box mt={{ base: 16, md: 32 }} pt={8}>
        <Text fontSize="2xl" fontWeight={600}>
          Elgato Capture - Play and capture on iPad
        </Text>
        <Text fontSize="2xl" fontWeight={400} mb={8} color={"gray.500"}>
          iPadOS
        </Text>
        <Box borderRadius="lg" overflow="hidden" >
          <Image src="./assets/Game_Capture_Neo_Lifestyle_Shot_02.jpg" w="100%" maxHeight="550px" borderRadius="lg" />
        </Box>
      </Box>

      <Grid templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }} gap={4} maxW="100%" pb={4} pt={4}>
        <Image src="./assets/Game_Capture_Neo_Lifestyle_Shot_01.png" w="100%" h="auto" aspectRatio={1} objectFit="cover" borderRadius="lg" />
        <Image src="./assets/Game_Capture_4K_X_Lifestyle_Shot_06_A.png" w="100%" h="auto" aspectRatio={1} objectFit="cover" borderRadius="lg" />
      </Grid>

      <Box borderRadius="lg" overflow="hidden" >
          <Image src="./assets/Game_Capture_Neo_Lifestyle_Shot_06.jpg" w="100%" maxHeight="550px" borderRadius="lg" />
      </Box>

      <Flex direction={{ base: "column", md: "row" }} justify="center" maxW="1200px" w="100%" mx="auto" py={{ base: 12, md: 16 }} gap={{ base: 12, md: 16 }} >
        <Box flex="2" fontSize="xl" maxW="700px" textAlign="left">
          <Text>
            High-quality game and video recording on iPad, compatible with major consoles
            and cameras. I designed a touch-friendly, intuitive interface for quick setup,
            precise recording, and real-time monitoring—making professional game capture
            portable and accessible.
          </Text>

        </Box>

        <Box flex="1" fontSize="xl" textAlign="left">

          <Heading as="h3" mb={2}>
            My role
          </Heading>
          <Text mb={8}>
            Designer
          </Text>

          <Heading as="h3" mb={2}>
            Link
          </Heading>
          <Link variant="plain" href="https://apps.apple.com/de/app/elgato-capture/id6456798479" target="_blank">
            View iPad app
            <RxArrowTopRight />
          </Link>

        </Box>

      </Flex>

      <Box mt={{ base: 16, md: 32 }} pt={8}>
        <Text fontSize="2xl" fontWeight={600}>
          Design smarter palettes
        </Text>
        <Text fontSize="2xl" fontWeight={400} mb={8} color={"gray.500"}>
          Web
        </Text>

        <VStack align={"start"} gap={8}>

          <Box borderRadius="lg" overflow="hidden" w={"100%"} borderWidth="1px" borderColor="gray.200">
            <video width="100%" autoPlay loop muted>
              <source src="./assets/ToolPreview.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </Box>

          <Button
            onClick={() => navigate("/design/color-palette")}
            variant="outline"
            size="lg"
            rounded="full"
          >
            Try AI Palette Generator
            <ArrowRight />
          </Button>
        </VStack>
      </Box>

      <Flex direction={{ base: "column", md: "row" }} justify="center" maxW="1200px" w="100%" mx="auto" py={{ base: 12, md: 16 }} gap={{ base: 12, md: 16 }} >
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
            Project type
          </Heading>
          <Text mb={8}>
            Personal project
          </Text>

        </Box>

      </Flex>

      <Box mt={{ base: 16, md: 32 }} pt={8}>
        <Text fontSize="2xl" fontWeight={600}>
          GritGene
        </Text>
        <Text fontSize="2xl" fontWeight={400} mb={8} color={"gray.500"}>
          Desktop
        </Text>
        <Box borderRadius="lg" overflow="hidden" boxShadow="lg" >
          <Image src="./assets/Input_value_helper.png" w="100%" h="auto" borderRadius="lg" />
        </Box>
      </Box>
      <Flex direction={{ base: "column", md: "row" }} justify="center" maxW="1200px" w="100%" mx="auto" py={{ base: 12, md: 16 }} gap={{ base: 12, md: 16 }}>
        <Box flex="2" fontSize="xl" maxW="700px" textAlign="left">
          <Text mb={{ base: 0, md: 6 }}>
            At GritWorld, I contributed to the GritGene design system and UX research
            for their advanced graphics and real-time rendering tools.
          </Text>

        </Box>

        <Box flex="1" fontSize="xl" textAlign="left">

          <Heading as="h3" mb={2}>
            My role
          </Heading>
          <Text mb={8}>
            Junior Designer
          </Text>

          <Heading as="h3" mb={2}>
            Link
          </Heading>
          <Flex gap={2} align="center">
            < MdLockOutline />
            <Text>
              Confidential project
            </Text>
          </Flex>
        </Box>

      </Flex>

      <Box mt={{ base: 16, md: 24 }} pt={8}>
        <Heading fontSize={{ base: "3xl", lg: "3xl" }} fontWeight={600} mb={{ base: "12", lg: "24" }} textTransform={"uppercase"}>
          Other creative projects
        </Heading>
        <Text fontSize="2xl" fontWeight={600}>
          Bosch Communications & Conference Systems
        </Text>
        <Text fontSize="2xl" fontWeight={400} mb={8} color={"gray.500"}>
          3D Visuals for Electro-Voice, RTS and TELEX
        </Text>

        <Flex mb={8} mt={16}>
          <Text fontSize="2xl" fontWeight={600}>
            Everse 8 - Electro-Voice
          </Text>
        </Flex>

        <Box gap={16}>
          <Image src="./assets/Everse8_02.png" w="100%" maxH="600px" borderRadius="lg" bg={"gray.100"} />
          <Grid templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }} gap={4} maxW="100%" pt={4}>
            <Image src="./assets/Everse8_07_nbg.png" w="100%" h="auto" aspectRatio={1} objectFit="cover" borderRadius="lg" bg={"gray.100"} />
            <Image src="./assets/Everse8_11_02.png" w="100%" h="auto" aspectRatio={1} objectFit="cover" borderRadius="lg" bg={"gray.100"} />
          </Grid>
          <Flex justify="left" mt={8} >
            <Button
              as="a" href="https://products.electrovoice.com/emea/en/everse-8/" target="_blank"
              variant="outline"
              size="md"
              rounded="full"
            >
              See product page
              <RxArrowTopRight />
            </Button>
          </Flex>
        </Box>
      </Box>



      <Box mt={{ base: 16, md: 24 }} pt={8}>
        <Flex mb={8}>
          <Text fontSize="2xl" fontWeight={600}>
            EVOLVE 50M - Electro-Voice
          </Text>
        </Flex>

        <Box >
          <Box pb={4}>
            <Image src="./assets/EV_EVOLVE50M_Array_Exploded_Black_nbg.png" w="100%" maxH="600px" borderRadius="lg" bg={"gray.100"} />
          </Box>
          <Image src="./assets/FamilyEV.png" w="100%" maxH="600px" borderRadius="lg" bg={"gray.100"} />
          <Flex justify="left" mt={8}>
            <Button
              as="a" href="https://products.electrovoice.com/emea/en/evolve-50m/" target="_blank"
              variant="outline"
              size="md"
              rounded="full"
            >
              See product page
              <RxArrowTopRight />
            </Button>
          </Flex>
        </Box>
      </Box>

      <Box mt={{ base: 16, md: 24 }} pt={8}>

        <Flex mb={8}>
          <Text fontSize="2xl" fontWeight={600}>
            MTS Series - Electro-Voice
          </Text>
        </Flex>

        <Box >
          <Grid templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }} gap={4} maxW="100%">
            <Image src="./assets/EV_MTS-6154-43_Cardioid_Hero_GrilleOff_nbg.png" w="100%" h="auto" aspectRatio={1} objectFit="cover" borderRadius="lg" bg={"gray.100"} />
            <Image src="./assets/EV_MTS-6154-43_Cardioid_Hero_GrilleOn_nbg.png" w="100%" h="auto" aspectRatio={1} objectFit="cover" borderRadius="lg" bg={"gray.100"} />
          </Grid>
          <Flex justify="left" mt={8}>
            <Button
              as="a" href="https://products.electrovoice.com/emea/en/mts/" target="_blank"
              variant="outline"
              size="md"
              rounded="full"
            >
              See product page
              <RxArrowTopRight />
            </Button>
          </Flex>
        </Box>
      </Box>

      <Box mt={{ base: 16, md: 24 }} pt={8} >

        <Flex mb={8}>
          <Text fontSize="2xl" fontWeight={600}>
            DBP - RTS Intercoms
          </Text>
        </Flex>

        <Box >
          <Box w="100%" borderRadius="lg" bg={"gray.100"} justifyContent="center" display="flex"  >
            <Image src="./assets/DBP_Hero.png" h="100%" maxH="600px" />
          </Box>
          <Grid templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }} gap={4} maxW="100%" pt={4}>
            <Image src="./assets/DBP_Side.png" w="100%" h="auto" aspectRatio={1} objectFit="cover" borderRadius="lg" bg={"gray.100"} />
            <Image src="./assets/DBP_Bottom.png" w="100%" h="auto" aspectRatio={1} objectFit="cover" borderRadius="lg" bg={"gray.100"} />
          </Grid>
          <Flex justify="left" mt={8}>
            <Button
              as="a" href="https://products.rtsintercoms.com/na/en/dbp/" target="_blank"
              variant="outline"
              size="md"
              rounded="full"
            >
              See product page
              <RxArrowTopRight />
            </Button>
          </Flex>
        </Box>
      </Box>

      {/* Scroll to Top Button */}
      <IconButton
        display={{ base: "flex", md: "none" }}
        aria-label="Scroll to Top"
        variant="subtle"
        rounded="full"
        size="lg"
        onClick={scrollToTop}
        position="fixed"
        bottom="10" // Spacing from bottom
        right="10"
        zIndex="1000" // Ensures it stays on top
        opacity={isVisible ? 1 : 0} // Show only when needed
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