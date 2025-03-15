import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Flex, Box } from "@chakra-ui/react";

function App() {
  return (
    <Flex direction="column" minH="100vh">
      <Header /> {/* Always visible on all pages */}
      <Box flex="1">
        <Routes>
          <Route path="/portfolio-github/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Box>
      <Box position="relative" zIndex="10">
        <Footer /> {/* Always visible on all pages */}
      </Box>
    </Flex>
  );
}

export default App;
