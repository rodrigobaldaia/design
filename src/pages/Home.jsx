import { Link, useLocation } from "react-router-dom";
import { Text, Box, Button, Image, Flex } from "@chakra-ui/react";
import { ArrowDown } from "lucide-react";
import { useRef, useEffect } from "react";

const Home = () => {
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
    <Box p={6} mt={4}> {/* Adds padding around the text */}
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
      <video width="100%" controls autoPlay loop style={{ borderRadius: "8px" }}>
          <source src="./assets/WaveLink20Video_02.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </Box>
    </Box>
  );
};

export default Home;