import { Text, Box, Flex, Heading, Image } from "@chakra-ui/react";

function About() {
  return (
    <Flex direction={{ base: "column", md: "row" }} py={6} gap={16} px={{ base: "8", xl: "0" }}>
      <Box flex="2" mt={{ base: 0, xl: 4 }} fontSize="xl">
        <Flex justify={{ base: "center", md: "left" }}>
          <Image src="/design/assets/photo_rb.jpg" boxSize="180px" rounded="lg" mb={8} />
        </Flex>
        <Text mb={4} mt={4}>
          I'm a UX/UI designer with a passion for crafting intuitive digital experiences.
          Currently, I'm working on desktop software applications at Elgato,
          shaping tools that empower creators.</Text>
        <Text mb={4}>Before that, I focused on UX design for graphics engines, refining interfaces
          for both professional and casual users. My background spans user research,
          interface design, and A/B testing to create seamless and effective experiences.</Text>
        <Text mb={4}>I'm also exploring AI and product management, bridging the gap between design
          and strategy to create more meaningful and impactful products.</Text>
        <Text mb={4}>Originally from Portugal, I studied Design at the University of Porto and worked at
          Bosch before moving to Germany to continue my career in UX Design.</Text>

        <Heading as="h1" mb={6} mt={16}>
          Skills
        </Heading>
        <Flex direction={{ base: "column", md: "row" }} gap={{ base: 0, md: 12 }}>
          <Box flex="1">
            <Text mb={4}>
              User Research<br />
              Usability Testing<br />
              Wireframing<br />
              Prototyping<br />
              Design Systems<br />
            </Text>

          </Box>

          <Box flex="1">
            <Text mb={4}>
              Figma<br />
              Adobe Creative Suite<br />
              3D Visualization<br />
              Cursor / v0<br />
              VS Code / Git<br />
            </Text>

          </Box>

          <Box flex="1">
            <Text mb={0}>
              Python<br />
              SQL<br />
              HTML / CSS / JS<br />
              React / Vite<br />
              Jira / Confluence<br />
            </Text>

          </Box>

        </Flex>

      </Box>

      <Box flex="1" mt={{ base: 0, md: 4 }} fontSize="xl">
        <Heading as="h1" mb={6}>
          Experience
        </Heading>

        <Text color="gray.500">
          2023 - Present
        </Text>
        <Heading as="h1">
          Elgato, a division of CORSAIR
        </Heading>
        <Text mb={4}>
          UX Designer
        </Text>

        <Text color="gray.500">
          2022 - 2023
        </Text>
        <Heading as="h1" >
          GritWorld
        </Heading>
        <Text mb={4}>
          Junior UX/UI Designer
        </Text>

        <Text color="gray.500">
          2020 - 2022
        </Text>
        <Heading as="h1" >
          Bosch
        </Heading>
        <Text >
          Graphic Designer
        </Text>

        <Heading as="h1" mb={6} mt={12}>
          Education
        </Heading>

        <Text color="gray.500">
          2017 - 2020
        </Text>

        <Heading as="h1">
          Master in Product and Industrial Design
        </Heading>
        <Text mb={4}>
          University of Porto, Portugal
        </Text>

        <Text color="gray.500">
          2014 - 2017
        </Text>

        <Heading as="h1" >
          Bachelor in Design
        </Heading>
        <Text mb={8}>
          University of Aveiro, Portugal
        </Text>

        <Heading as="h1" mb={6} mt={12}>
          Highlights
        </Heading>

        <Text color="gray.500">
          2025
        </Text>

        <Heading as="h1">
          prompt:UX Participation
        </Heading>
        <Text mb={4}>
          Berlin, Germany
        </Text>

        <Text color="gray.500">
          2024
        </Text>

        <Heading as="h1" >
          Figma Config Participation
        </Heading>
        <Text mb={8}>
          San Francisco, USA
        </Text>

      </Box>
    </Flex>

  );
}

export default About;
