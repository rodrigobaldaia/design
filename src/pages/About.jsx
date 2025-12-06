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
          shaping tools that empower thousands of creators.</Text>
        <Text mb={4}>Before that, I focused on UX design for a real-time 3D engine, refining interfaces
          for both professional and casual users. My work blends research, design systems, and fast prototyping to create seamless and effective experiences.</Text>
        <Text mb={4}>I'm also exploring AI and product management, bridging the gap between design
          and strategy to create more meaningful and impactful products.</Text>
        <Text mb={4}>Looking to contribute to product teams that value rigorous UX practice, cross-functional alignment, and thoughtful use of emerging technologies.</Text>

        <Heading as="h1" size="2xl" mb={6} mt={16}>
          Skills
        </Heading>
        <Flex direction={{ base: "column", md: "row" }} gap={{ base: 0, md: 12 }}>
          <Box flex="1">
            <Heading as="h2" mb={6}>
              Design & Product
            </Heading>
            <Text mb={4}>
              Figma<br />
              Adobe CC<br />
              Miro<br />
              Lottie<br />
              Jira<br />
              Confluence<br />
            </Text>

          </Box>

          <Box flex="1">
            <Heading as="h2" mb={6}>
              AI & Intelligent Systems
            </Heading>
            <Text mb={0}>
              Figma Make/v0<br />
              Cursor<br />
              ChatGPT/Claude Code<br />
              LM Studio<br />
              Prompt Engineering for UX<br />
              LLM-based prototyping<br />
            </Text>

          </Box>

        </Flex>

        <Flex direction={{ base: "column", md: "row" }} gap={{ base: 0, md: 12 }}>
          <Box flex="1">
            <Heading as="h2" mb={6} mt={12}>
              UX & Research
            </Heading>
            <Text mb={4}>
              Usability Testing<br />
              Prototyping<br />
              Interaction Design<br />
              Information Architecture<br />
              Complex Workflows<br />
              Multi-Platform Ecosystem Design<br />
              Data-Driven Design<br />
              Design Systems<br />
              Accessibility (WCAG)<br />
              UX Documentation<br />
              Cross-Functional Product Teams<br />
              AI-Assisted Workflows<br />
            </Text>

          </Box>

          <Box flex="1">
            <Heading as="h2" mb={6} mt={12}>
              Technical
            </Heading>
            <Text mb={4}>
              Python<br />
              SQL<br />
              HTML/CSS/JavaScript<br />
              React<br />
              Vite/Next.js<br />
              Git<br />
              VS Code<br />
            </Text>

          </Box>

        </Flex>


      </Box>

      <Box flex="1" mt={{ base: 0, md: 4 }} fontSize="xl">
        <Heading as="h1" size="2xl" mb={6}>
          Experience
        </Heading>

        <Text color="gray.500">
          2023 - Present
        </Text>
        <Heading as="h2">
          Elgato, a division of CORSAIR
        </Heading>
        <Text mb={4}>
          UX Designer
        </Text>

        <Text color="gray.500">
          2022 - 2023
        </Text>
        <Heading as="h2" >
          GritWorld
        </Heading>
        <Text mb={4}>
          Junior UX/UI Designer
        </Text>

        <Text color="gray.500">
          2020 - 2022
        </Text>
        <Heading as="h2" >
          Bosch
        </Heading>
        <Text >
          Graphic Designer
        </Text>

        <Heading as="h1" size="2xl" mb={6} mt={12}>
          Education
        </Heading>

        <Text color="gray.500">
          2017 - 2020
        </Text>

        <Heading as="h2">
          Master in Product and Industrial Design
        </Heading>
        <Text mb={4}>
          University of Porto, Portugal
        </Text>

        <Text color="gray.500">
          2014 - 2017
        </Text>

        <Heading as="h2" >
          Bachelor in Design
        </Heading>
        <Text mb={8}>
          University of Aveiro, Portugal
        </Text>

        <Heading as="h1" size="2xl" mb={6} mt={12}>
          Professional Development
        </Heading>

        <Text color="gray.500">
          2025
        </Text>

        <Heading as="h2">
          prompt:UX Participation
        </Heading>
        <Text mb={4}>
          Berlin, Germany
        </Text>

        <Text color="gray.500">
          2024
        </Text>

        <Heading as="h2" >
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
