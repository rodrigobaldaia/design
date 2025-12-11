import { Text, Box, Flex, Heading, Image, HStack, VStack } from "@chakra-ui/react";

function About() {

  const skills = [
    {
      icon: "./assets/Figma-logo.png",
      title: "Figma",
      subtitle: "Design & Prototyping",
      bg: "black",
    },
    {
      icon: "./assets/Adobe_Illustrator_CC_icon.svg",
      title: "Adobe Illustrator",
      subtitle: "Vector-based Design & Iconography",
      bg: "#330000",
    },
    {
      icon: "./assets/Adobe_Photoshop_CC_icon.svg",
      title: "Adobe Photoshop",
      subtitle: "Image Editing",
      bg: "#001E36",
    },
    {
      icon: "./assets/Cursor_logo.png",
      title: "Cursor",
      subtitle: "AI-Assisted Design & Code Prototyping",
      bg: "black",
    },
    {
      icon: "./assets/v0-logo.png",
      title: "v0",
      subtitle: "AI UI Generation & Rapid Prototyping",
      bg: "black",
    },
    {
      icon: "./assets/ChatGPT_logo.svg",
      title: "ChatGPT",
      subtitle: "AI Chatbot, Writing & UX Workflows",
      bg: "#74AA9C",
    },
    {
      icon: "./assets/Jira_logo.svg",
      title: "Jira",
      subtitle: "Project Planning & Sprint Management",
      bg: "#1868DB",
    },
    {
      icon: "./assets/Confluence_logo.svg",
      title: "Confluence",
      subtitle: "Documentation & Knowledge Sharing",
      bg: "#1868DB",
    },
    {
      icon: "./assets/Miro_logo.svg",
      title: "Miro",
      subtitle: "Mapping & Co-Creation",
      bg: "#FFDD33",
    },
    {
      icon: "./assets/lottiefiles-logo.svg",
      title: "LottieFiles",
      subtitle: "UI Motion Graphics & Micro-interactions",
      bg: "#00DDB3",
    },
    {
      icon: "./assets/notion-logo.svg",
      title: "Notion",
      subtitle: "Personal Workflow",
      bg: "white",
    },
    {
      icon: "./assets/claude-ai-icon.svg",
      title: "Claude Code",
      subtitle: "AI-Powered Coding & Automation",
      bg: "#D77655",
    },
    {
      icon: "./assets/github-logo.svg",
      title: "GitHub",
      subtitle: "Code Collaboration & Version Control",
      bg: "black",
    },
    {
      icon: "./assets/vscode-logo.svg",
      title: "VS Code",
      subtitle: "Frontend Prototyping & Code Editing",
      bg: "white",
    },
  ];

  const SkillItem = ({ icon, title, subtitle, bg }) => (
    <HStack gap={4}>
      <Box
        display="inline-flex"
        alignItems="center"
        justifyContent="center"
        h={12}
        w={12}
        bg={bg}
        borderRadius="lg"
        overflow="hidden"
        border={bg === "white" ? "1px solid" : "none"}
        borderColor="gray.200"
      >
        <Image src={icon} h={10} />
      </Box>

      <Box>
        <Heading as="h2" fontSize="lg">
          {title}
        </Heading>
        <Text color="gray.500" fontSize="md">
          {subtitle}
        </Text>
      </Box>
    </HStack>
  );

  const midpoint = Math.ceil(skills.length / 2);
  const col1 = skills.slice(0, midpoint);
  const col2 = skills.slice(midpoint);

  return (
    <Flex maxW="800px" mx="auto" direction={"column"} py={12} gap={24} px={{ base: "8", xl: "0" }} mb={16}>
      <Box flex="2" mt={{ base: 16, xl: 32 }} fontSize="xl">
        <Flex justify={{ base: "center", md: "center" }}>
          <Image src="/design/assets/photo_rb.jpg" boxSize="180px" rounded="lg" mb={16} />
        </Flex>
        <Text mb={4} mt={16}>
          I'm a UX/UI designer focused on creating clear, intuitive tools for complex workflows.
          At Elgato, I design desktop software used daily by thousands of creators, driving clarity in audio/video workflows and shaping new features that improve speed, reliability, and creative control.</Text>

        <Text mb={4} mt={4}>
          Previously I worked on a real-time 3D engine, simplifying high-density interfaces and contributing to scalable design systems.</Text>
        <Text mb={4}>My work blends research, prototyping, and systems thinking to deliver measurable improvements to product quality. I’m currently expanding my expertise in AI-assisted design and product strategy, with a focus on turning emerging technologies into practical, user-centred solutions.</Text>
        <Text mb={4}>Looking to contribute to product teams that value rigorous UX practice, cross-functional alignment, and thoughtful use of emerging technologies.</Text>

      </Box>

      <Box flex="2" mt={{ base: 0, xl: 4 }} fontSize="xl">
        <Heading as="h1" size="2xl" mb={8}>
          Software and tools I use
        </Heading>
        <Flex direction={{ base: "column", md: "row" }} gap={{ base: 6, md: 12 }}>
          {[col1, col2].map((col, i) => (
            <Box key={i} flex="1">
              <VStack align="stretch" gap={6}>
                {col.map((item) => (
                  <SkillItem key={item.title} {...item} />
                ))}
              </VStack>
            </Box>
          ))}
        </Flex>

      </Box>


      <Box flex="2" mt={{ base: 0, xl: 4 }} fontSize="xl">
        <Heading as="h1" size="2xl" mb={8}>
          Experience
        </Heading>


        <VStack gap={4} align={"left"}>


          <HStack mb={4} gap={6} alignItems="top">
            <Box
              bg="white"
              borderRadius="lg"
              overflow="hidden"
              border="1px solid"
              borderColor="gray.400"
              h={20}>

              <Image
                src="./assets/elgato-logo.svg"
                h={20}
              >
              </Image>

            </Box>

            <Flex direction={{ base: "column", md: "row" }} gap={4} align={{ base: "left", md: "center" }}>
              <Box>
                <Text color="gray.500" fontSize={"md"}>
                  2023 - Present
                </Text>

                <Heading as="h2">
                  Elgato, a division of Corsair
                </Heading>

                <Text fontSize={"lg"}>
                  UX Designer
                </Text>

              </Box>

              <Box w="1px" h="40px" bg="blackAlpha.400" display={{ base: "none", md: "flex" }} />

              <Box display="flex" alignItems="center">
                <Image
                  src="./assets/Corsair_logo.svg"
                  h="32px"
                  w="auto"
                  objectFit="contain"
                />
              </Box>

            </Flex>

          </HStack>

          <HStack mb={4} gap={6} alignItems="center">
            <Box
              bg="white"
              borderRadius="lg"
              overflow="hidden"
              border="1px solid"
              borderColor="gray.400">

              <Image
                src="./assets/gritworld-logo.png"
                h={20}
              >
              </Image>

            </Box>

            <Box>
              <Text color="gray.500" fontSize={"md"}>
                2022 - 2023
              </Text>

              <Heading as="h2" >
                GritWorld
              </Heading>
              <Text fontSize={"lg"}>
                Junior UX/UI Designer
              </Text>

            </Box>


          </HStack>

          <HStack mb={4} gap={6} alignItems="center">
            <Box
              bg="white"
              borderRadius="lg"
              overflow="hidden"
              border="1px solid"
              borderColor="gray.400">

              <Image
                src="./assets/bosch-logo.svg"
                h={20}
              >
              </Image>

            </Box>

            <Box>
              <Text color="gray.500" fontSize={"md"}>
                2020 - 2022
              </Text>

              <Heading as="h2" >
                Bosch
              </Heading>
              <Text fontSize={"lg"}>
                Graphic Designer
              </Text>

            </Box>

          </HStack>

        </VStack>

        <Heading as="h1" size="2xl" mb={8} mt={16}>
          Professional Development
        </Heading>

        <HStack mb={4} gap={6} alignItems="center">

          <Box>
            <Text color="gray.500" fontSize={"md"}>
              2025
            </Text>

            <Heading as="h2" >
              prompt:UX Participation
            </Heading>
            <Text fontSize={"lg"}>
              Berlin, Germany
            </Text>

          </Box>

        </HStack>

        <HStack mb={4} gap={6} alignItems="center">

          <Box>
            <Text color="gray.500" fontSize={"md"}>
              2024
            </Text>

            <Heading as="h2" >
              Figma Config Participation
            </Heading>
            <Text fontSize={"lg"}>
              San Francisco, USA
            </Text>

          </Box>

        </HStack>

      </Box>
    </Flex >

  );
}

export default About;
