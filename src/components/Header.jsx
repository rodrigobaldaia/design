import { Flex, Button, Heading, Tabs } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleWorkClick = () => {
    navigate("/portfolio-github/", { state: { scrollToProjects: true } });
  };

  return (
    <Flex
      direction={{ base: "column-reverse", md: "row" }} // Stack on mobile, row on larger screens
      justify="space-between"
      align="center"
      p={8}
      bg="white"
      gap={{ base: 8, md: 0 }} // Add spacing on mobile
    >
      {/* Left side - Logo or Title */}
      <Heading size="2xl">
        <Link to="/portfolio-github/">Rodrigo Baldaia</Link>
      </Heading>

      {/* Right side - Navigation buttons */}
      <Flex
        gap={2}
        justify={{ base: "center", md: "flex-end" }} // Center items on mobile
        width={{ base: "100%", md: "auto" }} // Full width on mobile
      >
        <Tabs.Root defaultValue="work" variant="plain" maxW="md" fitted size="md">
          <Tabs.List bg="bg.muted" rounded="4xl" p="1">
            <Tabs.Trigger as={Link} to="/portfolio-github/" value="work">
              Work
            </Tabs.Trigger>
            <Tabs.Trigger as={Link} to="/about" value="About">
              About
            </Tabs.Trigger>
            <Tabs.Indicator rounded="4xl" />
          </Tabs.List>
        </Tabs.Root>
      </Flex>
    </Flex>

  );
};

export default Header;
