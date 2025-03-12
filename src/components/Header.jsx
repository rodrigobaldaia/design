import { Flex, Button, Heading } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <Flex justify="space-between" align="center" p={4} bg="white">
      {/* Left side - Logo or Title */}
      <Heading size="md">
        <Link to="/">Rodrigo Baldaia</Link>
      </Heading>

      {/* Right side - Navigation buttons */}
      <Flex gap={4}>
        <Button as={Link} to="/work" variant="outline">
          Work
        </Button>
        <Button as={Link} to="/about" variant="outline">
          About
        </Button>
      </Flex>
    </Flex>
  );
};

export default Header;
