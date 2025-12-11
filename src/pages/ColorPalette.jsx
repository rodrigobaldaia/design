import { VStack, HStack, Text, IconButton, Button, Box } from "@chakra-ui/react";
import PaletteGenerator from "../components/PaletteGenerator";
import { ArrowLeft } from "lucide-react";


function ColorPalette() {
  return (

    <VStack maxW="100%" w="100%" pt={6} align={"left"} px={{ base: "8", xl: "0" }} py={8} flex="1" minH={0}>
      <HStack align={"start"} spacing={4}>
        <IconButton display={{ base: "none", md: "flex" }} aria-label="Go back one page"
          variant="ghost" size="md" onClick={() => window.history.back()}>
          <ArrowLeft />
        </IconButton>
        <VStack align="flex-start">

          <Text fontSize="2xl" fontWeight={600}>
            Design smarter palettes
          </Text>
          <Text fontSize="2xl" fontWeight={400} mb={8} mt={-2} color={"gray.500"}>
            Web
          </Text>
        </VStack>
      </HStack>
      <PaletteGenerator />
      <HStack pt={8} w="100%" display={{ base: "flex", md: "none" }}>
        <Button
          aria-label="Go back one page"
          variant="outline"
          size="md"
          rounded="full"
          onClick={() => window.history.back()}
          w="100%"
        >
          <ArrowLeft />
          Back
        </Button>
      </HStack>
    </VStack>

  );
}

export default ColorPalette;