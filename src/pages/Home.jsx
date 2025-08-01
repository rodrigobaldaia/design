import { useLocation } from "react-router-dom";
import { Text, Box, Button, Image, Flex, Heading, Grid, IconButton, Tabs, Link } from "@chakra-ui/react";
import { ArrowDown, ArrowUp } from "lucide-react";
import { RxArrowTopRight } from "react-icons/rx";
import { MdLockOutline } from "react-icons/md";
import { useRef, useEffect, useState } from "react";


const Home = () => {

  const [isVisible, setIsVisible] = useState(false);

  // Show button only when scrolling down
  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 8000); // Adjust value of scrool
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

    <Box py={8} my={{ base: "4", xl: "16" }} px={{ base: "8", xl: "0" }}> {/* Adds padding around the content */}
      <Text fontSize={{ base: "4xl", md: "5xl", lg: "5xl", xl: "6xl" }} fontWeight={600} textTransform={"uppercase"}>
        UX Designer based in Germany. Currently working at {" "}
        <a
          href="https://elgato.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "black", textDecoration: "underline" }}
        >
          Elgato
        </a>, a division of CORSAIR. Previously at Bosch.
      </Text>

      <Flex justify="center" mt={{ base: "20", lg: "24" }} display={{ base: "none", md: "flex" }}>
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

      <Box ref={projectsRef} mt={{ base: "16", lg: "32" }} pt={8}>
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
      <Flex direction={{ base: "column", md: "row" }} justify="center" maxW="1200px" w="100%" mx="auto" py={16} gap={16} >
        <Box flex="2" fontSize="xl" maxW="700px" textAlign="left">

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

        <Box flex="1" fontSize="xl" textAlign="left">

          <Heading as="h3" mb={2}>
            My role
          </Heading>
          <Text mb={8}>
            Design Lead
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

      <Box mt={{ base: 16, md: 24 }} pt={8}>
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
      <Flex direction={{ base: "column", md: "row" }} justify="center" maxW="1200px" w="100%" mx="auto" py={16} gap={16} >
        <Box flex="2" fontSize="xl" maxW="700px" textAlign="left">
          <Text mb={6}>
            Elgato Capture brings high-quality game and video recording to the iPad, offering a portable, laptop-free solution for streamers, content creators, and gamers who want to relive their best moments. With support for PlayStation, Xbox, Nintendo Switch, Steam Deck, and more, the app seamlessly integrates with Elgato's capture cards and cameras, enabling professional-grade recording on the go.
          </Text>
          <Text>
            As the lead designer, I played a key role in shaping the mobile experience, ensuring the app was intuitive, touch-friendly, and optimized for iPad workflows. I focused on designing an interface that simplifies device setup, streamlines recording controls, and provides real-time monitoring—all while maintaining the flexibility and precision needed for high-quality content creation. Through user research, prototyping, and iteration, I refined interactions to make professional game capture more accessible, even for users new to the process.
          </Text>

        </Box>

        <Box flex="1" fontSize="xl" textAlign="left">

          <Heading as="h3" mb={2}>
            My role
          </Heading>
          <Text mb={8}>
            Design Lead
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

      <Grid templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }} gap={4} maxW="100%" pb={4}>
        <Image src="./assets/Game_Capture_Neo_Lifestyle_Shot_01.png" w="100%" h="auto" aspectRatio={1} objectFit="cover" borderRadius="lg" />
        <Image src="./assets/Game_Capture_4K_X_Lifestyle_Shot_06_A.png" w="100%" h="auto" aspectRatio={1} objectFit="cover" borderRadius="lg" />
        <Image src="./assets/Game_Capture_Neo_FullHDContent.jpg" w="100%" h="auto" aspectRatio={1} objectFit="cover" borderRadius="lg" />
        <Image src="./assets/Game_Capture_Neo_Lifestyle_Shot_06.jpg" w="100%" h="auto" aspectRatio={1} objectFit="cover" borderRadius="lg" />
      </Grid>

      <Box mt={{ base: 16, md: 24 }} pt={8}>
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
      <Flex direction={{ base: "column", md: "row" }} justify="center" maxW="1200px" w="100%" mx="auto" py={16} gap={16}>
        <Box flex="2" fontSize="xl" maxW="700px" textAlign="left">
          <Text mb={{ base: 0, md: 6 }}>
            I worked at GritWorld on GritGene, helping develop their design system and conducting user research to enhance the UX of GritGene, their desktop software. This experience provided valuable insights into designing for advanced graphics and real-time rendering tools. Due to confidentiality, I can't share details but feel free to reach out if you'd like to learn more.
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
          <Grid templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }} gap={4} maxW="100%" pt={4}>
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