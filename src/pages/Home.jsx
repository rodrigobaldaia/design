/**
 * Home.jsx — the new visual portfolio.
 *
 * Component tree:
 *   Home
 *   ├── OverlayProvider      (project modal + media lightbox, portals)
 *   ├── Hero                 (typographic introduction)
 *   ├── Montage              (full-width auto-playing project montage)
 *   ├── ProjectsSection      (visual-first editorial cards)
 *   │   └── ProjectCard      (name · company · one strong visual)
 *   └── OtherWork            (Bosch 3D visuals)
 *
 * Extended project information lives in the project modal (see
 * OverlayProvider); the landing page itself stays deliberately sparse.
 */

import { Box, Flex } from "@chakra-ui/react";
import { PROJECTS } from "../data/projects";
import { OverlayProvider, useProjectModal } from "../components/home/OverlayProvider";
import Hero from "../components/home/Hero";
import Montage from "../components/home/Montage";
import ProjectCard from "../components/home/ProjectCard";
import OtherWork from "../components/home/OtherWork";

const ProjectsSection = () => {
  const { openProject } = useProjectModal();

  return (
    <Box
      as="section"
      id="projects"
      aria-label="Projects"
      maxW="1240px"
      mx="auto"
      px={{ base: 6, md: 8 }}
      pt={{ base: 24, md: 36 }}
      scrollMarginTop="96px"
    >
      <Flex direction="column" gap={{ base: 28, md: 44 }}>
        {PROJECTS.map((project, idx) => (
          <ProjectCard
            key={project.id}
            project={project}
            onOpen={() => openProject(idx)}
          />
        ))}
      </Flex>
    </Box>
  );
};

const Home = () => (
  <OverlayProvider>
    <Hero />
    <Montage />
    <ProjectsSection />
    <OtherWork />
    <Box pb={{ base: 24, md: 40 }} />
  </OverlayProvider>
);

export default Home;
