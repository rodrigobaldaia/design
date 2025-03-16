import { useLocation } from "react-router-dom";
import { Text, Box, Button, Image, Flex, Heading, Link, Grid, IconButton } from "@chakra-ui/react";
import { ArrowDown, ArrowUp } from "lucide-react";
import { MdLockOutline } from "react-icons/md";
import { useRef, useEffect, useState } from "react";

const Home = () => {

  const [isVisible, setIsVisible] = useState(false);

  // Show button only when scrolling down
  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 1500); // Adjust value as needed
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

  return (
    
    <Box p={8} mt={0}> {/* Adds padding around the content */}
      <Text fontSize="6xl" fontWeight={600} textTransform={"uppercase"}>
        UX Designer based in Germany. Currently working at {" "}
        <a
          href="https://elgato.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "black", textDecoration: "underline" }}
        >
          Elgato
        </a>, a division of CORSAIR. Previously at GritWorld and Bosch.
      </Text>
      <Flex justify="center" mt={16}>
        <Button
          onClick={scrollToProjects}
          variant="outline"
          size="lg"
          rounded="full"
        >
          See my projects
          <ArrowDown />
        </Button>
      </Flex>

      <Box ref={projectsRef} mt={24} pt={8}>
        <Text fontSize="2xl" fontWeight={600}>
          Elgato Wave Link - Pro audio for everyone
        </Text>
        <Text fontSize="2xl" fontWeight={400} mb={8} color={"gray.500"}>
          macOS & Windows
        </Text>
        <Box borderRadius="lg" overflow="hidden" >
          <video width="100%" controls autoPlay loop>
            <source src="./assets/WaveLink20Video_02.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </Box>
      </Box>
      <Flex py={16} gap={16}>
        <Box flex="4" fontSize="xl">
          <Text mb={6}>
            Wave Link is a professional audio mixing software for content creators,
            streamers, and podcasters, offering precise control over multiple
            audio sources. With an intuitive interface, it streamlines setup,
            mixing, and real-time adjustments to deliver high-quality sound
            with ease.
          </Text>
          <Text>
            As the lead designer, I played a key role in shaping Wave Link's
            user experience, continuously refining its interface and workflows.
            Most notably, I worked on the launch of Wave Link 2.0, a major
            update that introduced Voice Focus for studio-grade sound,
            one-click audio routing, easy mic sound checks, and enhanced
            Stream Deck integration. I led efforts to ensure a seamless
            experience across both Windows and macOS, conducting user
            research to balance simplicity for beginners with advanced
            functionality for experienced users. By refining workflows,
            improving clarity, and iterating based on feedback, I
            helped make Wave Link 2.0 a more powerful and accessible
            audio mixing tool.
          </Text>

        </Box>

        <Box flex="1" fontSize="lg">

          <Heading as="h3" size="1xl" mb={2}>
            My role
          </Heading>
          <Text mb={8}>
            Lead Designer
          </Text>

          <Heading as="h3" size="1xl" mb={2}>
            Link
          </Heading>
          <Link href="https://www.elgato.com/us/en/s/wave-link" target="_blank" rel="noopener noreferrer">
            Wave Link 2.0
          </Link>

        </Box>

      </Flex>

      <Grid templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }} gap={4} maxW="100%" pb={4}>
        <Image src="./assets/Screenshot-2025-02-04-at-5.22.36 PM.png" w="100%" h="auto" aspectRatio={1} objectFit="cover" borderRadius="lg" />
        <Image src="./assets/1685175774044.jpg" w="100%" h="auto" aspectRatio={1} objectFit="cover" borderRadius="lg" />
        <Image src="./assets/Wave_Neo_AtHomeHereThereAnywhere.png" w="100%" h="auto" aspectRatio={1} objectFit="cover" borderRadius="lg" />
        <Image src="./assets/Wave_XLR_Lifestyle_Shot_08.jpg" w="100%" h="auto" aspectRatio={1} objectFit="cover" borderRadius="lg" />
      </Grid>

      <Box borderRadius="lg" overflow="hidden" >
        <video width="100%" controls autoPlay loop>
          <source src="./assets/WaveLink20_VoiceFocus.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </Box>

      <Box mt={24} pt={8}>
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
      <Flex py={16} gap={16}>
        <Box flex="4" fontSize="xl">
          <Text mb={6}>
            Elgato Capture brings high-quality game and video recording to the iPad, offering a portable, laptop-free solution for streamers, content creators, and gamers who want to relive their best moments. With support for PlayStation, Xbox, Nintendo Switch, Steam Deck, and more, the app seamlessly integrates with Elgato's capture cards and cameras, enabling professional-grade recording on the go.
          </Text>
          <Text>
            As the lead designer, I played a key role in shaping the mobile experience, ensuring the app was intuitive, touch-friendly, and optimized for iPad workflows. I focused on designing an interface that simplifies device setup, streamlines recording controls, and provides real-time monitoring—all while maintaining the flexibility and precision needed for high-quality content creation. Through user research, prototyping, and iteration, I refined interactions to make professional game capture more accessible, even for users new to the process.
          </Text>

        </Box>

        <Box flex="1" fontSize="lg">

          <Heading as="h3" size="1xl" mb={2}>
            My role
          </Heading>
          <Text mb={8}>
            Lead Designer
          </Text>

          <Heading as="h3" size="1xl" mb={2}>
            Link
          </Heading>
          <Link href="https://apps.apple.com/de/app/elgato-capture/id6456798479" target="_blank" rel="noopener noreferrer">
            Elgato Capture
          </Link>

        </Box>

      </Flex>

      <Grid templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }} gap={4} maxW="100%" pb={4}>
        <Image src="./assets/Game_Capture_Neo_Lifestyle_Shot_01.png" w="100%" h="auto" aspectRatio={1} objectFit="cover" borderRadius="lg" />
        <Image src="./assets/Game_Capture_4K_X_Lifestyle_Shot_06_A.png" w="100%" h="auto" aspectRatio={1} objectFit="cover" borderRadius="lg" />
        <Image src="./assets/Game_Capture_Neo_FullHDContent.jpg" w="100%" h="auto" aspectRatio={1} objectFit="cover" borderRadius="lg" />
        <Image src="./assets/Game_Capture_Neo_Lifestyle_Shot_06.jpg" w="100%" h="auto" aspectRatio={1} objectFit="cover" borderRadius="lg" />
      </Grid>

      <Box mt={24} pt={8}>
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
      <Flex py={16} gap={16}>
        <Box flex="4" fontSize="xl">
          <Text mb={6}>
            I worked at GritWorld on GritGene, helping develop their design system and conducting user research to enhance the UX of GritGene, their desktop software. This experience provided valuable insights into designing for advanced graphics and real-time rendering tools. Due to confidentiality, I can't share details but feel free to reach out if you'd like to learn more.
          </Text>

        </Box>

        <Box flex="1" fontSize="lg">

          <Heading as="h3" size="1xl" mb={2}>
            My role
          </Heading>
          <Text mb={8}>
            Junior Designer
          </Text>

          <Heading as="h3" size="1xl" mb={2}>
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

      <IconButton
      aria-label="Scroll to Top"
      variant="subtle"
      rounded="full"
      size="md"
      onClick={scrollToTop}
      position="fixed"
      bottom="4" // Spacing from bottom
      left="50%"
      transform="translateX(-50%)" // Centers the button
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