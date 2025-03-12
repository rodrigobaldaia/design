import { Link } from "react-router-dom";
import { Text, Box } from "@chakra-ui/react";

const Home = () => {
  return (
    <Box p={6}> {/* Adds padding around the text */}
      <Text fontSize="6xl" fontWeight={600} textTransform={"uppercase"}>
        UX Designer based in Germany. Currently working at {" "}
        <a 
            href="https://elgato.com" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ color: "black", textDecoration: "underline" }}
        >
        Elgato
        </a>, a division of CORSAIR. Previously at Bosch and GritWorld.
      </Text>
    </Box>
  );
};

export default Home;
