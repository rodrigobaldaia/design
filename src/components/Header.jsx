import { Flex, Button, Heading } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleWorkClick = () => {
    navigate("/", { state: { scrollToProjects: true } });
  };

  return (
    <Flex justify="space-between" align="center" p={6} bg="white">
      {/* Left side - Logo or Title */}
      <Heading size="2xl">
        <Link to="/">Rodrigo Baldaia</Link>
      </Heading>

      {/* Right side - Navigation buttons */}
      <Flex gap={2}>
        <Button variant="ghost" size="lg" onClick={handleWorkClick}>
          Work
        </Button>
        <Button /*as={Link} to="/about"*/ variant="ghost" size="lg">
          About
        </Button>
      </Flex>
    </Flex>
  );
};

export default Header;
