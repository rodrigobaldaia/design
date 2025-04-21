import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Flex, Box, Spinner } from "@chakra-ui/react";
import Home from "./pages/Home"; // Regular import (eager loading)

// Lazy load only the About page
const About = lazy(() => import("./pages/About"));

function App() {
  return (
    <Flex direction="column" minH="100vh">
      <Header /> {/* Always visible on all pages */}
      
      <Box flex="1">
      <Box maxW="1200px" mx="auto" px={4} py={6}>
        <Routes>
          <Route path="/design/" element={<Home />} />
          
          {/* Suspense is only needed for dynamically imported routes */}
          <Route
            path="/about"
            element={
              <Suspense fallback={<Flex justify="center" py={10}><Spinner size="xl" /></Flex>}>
                <About />
              </Suspense>
            }
          />
        </Routes>
        </Box>
      </Box>

      <Box position="relative" zIndex="10">
        <Footer /> {/* Always visible on all pages */}
      </Box>
    </Flex>
  );
}

export default App;
