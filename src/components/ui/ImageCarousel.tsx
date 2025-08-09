import React, { useState, useEffect } from "react";
import { Box, Image, HStack, IconButton, AspectRatio, Spinner, Center, VStack } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

const images = [
    {
        src: "./assets/ColorPalettePreview.svg",
        alt: "Model initializing screen",
    },
    {
        src: "./assets/ColorPalettePreview_02.svg",
        alt: "Color Palette prompt and loading screen",
    },
    {
        src: "./assets/ColorPalettePreview_03.svg",
        alt: "Color Palette Generated",
    },
    {
        src: "./assets/ColorPalettePreview_04.svg",
        alt: "Color Palette Generated",
    },
];


const MotionBox = motion(Box);

export default function ImageCarousel() {
    const [index, setIndex] = useState(0);

    // Preload images on mount
    useEffect(() => {
        images.forEach(({ src }) => {
            const img = new window.Image();

            img.src = src;
        });
    }, []);

    const next = () => setIndex((prev) => (prev + 1) % images.length);
    const prev = () => setIndex((prev) => (prev - 1 + images.length) % images.length);

    // Swipe handlers
    const handleDragEnd = (event: any, info: any) => {
        if (info.offset.x < -100) next();
        else if (info.offset.x > 100) prev();
    };

    return (
        <VStack
            gap={4}
        >
            <Box borderRadius="lg" overflow="hidden" w={"100%"} borderWidth="1px" borderColor="gray.200">
                <video width="100%" controls autoPlay loop muted>
                    <source src="./assets/ToolPreview.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </Box>
            <Box mx="auto" position="relative" userSelect="none">
                <Box position="relative">

                    {/* Image with framer motion animation and swipe */}
                    <AnimatePresence initial={false} mode="wait">
                        <MotionBox
                            key={index}
                            drag="x"
                            dragConstraints={{ left: 0, right: 0 }}
                            dragElastic={0.2}
                            onDragEnd={handleDragEnd}
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -100 }}
                            transition={{ duration: 0.3 }}
                            cursor="grab"
                            borderRadius="md"
                            borderWidth="1px"
                            borderColor="gray.200"
                            overflow="hidden"
                        >
                            <Image src={images[index].src} alt={images[index].alt} width="100%" />
                        </MotionBox>
                    </AnimatePresence>

                    {/* Navigation buttons */}
                    <IconButton
                        aria-label="Previous"
                        position="absolute"
                        top="50%"
                        left={8}
                        transform="translateY(-50%)"
                        onClick={prev}
                        zIndex={2}
                        size="sm"
                        variant={"surface"}
                        display={{ base: "none", md: "flex" }}
                    >
                        <LuChevronLeft />
                    </IconButton>

                    <IconButton
                        aria-label="Next"
                        position="absolute"
                        top="50%"
                        right={8}
                        transform="translateY(-50%)"
                        onClick={next}
                        zIndex={2}
                        size="sm"
                        variant={"surface"}
                        display={{ base: "none", md: "flex" }}
                    >
                        <LuChevronRight />
                    </IconButton>
                </Box>

                {/* Dots */}
                <HStack justify="center" mt={8}>
                    {images.map((_, i) => (
                        <Box
                            key={i}
                            cursor="pointer"
                            w={{ base: 2, md: 2.5 }}
                            h={{ base: 2, md: 2.5 }}
                            borderRadius="full"
                            bg={i === index ? "black" : "gray.300"}
                            onClick={() => setIndex(i)}
                            transition="background-color 0.2s"
                        />
                    ))}
                </HStack>
            </Box>
        </VStack>
    );
}
