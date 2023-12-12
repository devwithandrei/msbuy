'use client';
import { useState, useEffect } from 'react';
import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react';
import Link from 'next/link';

export const Banner = () => {
  const [displayedText, setDisplayedText] = useState('');
  const headingText = "Online Shopping Made Easy"; // Text to be displayed with typewriting effect
  const descriptionText =
    "Discover the latest trends in fashion, accessories, and more. Shop our curated collection for your unique style.";

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= headingText.length) {
        setDisplayedText(headingText.substring(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 100); // Adjust typing speed by changing the interval duration

    return () => {
      clearInterval(interval);
    };
  }, [headingText]);

  return (
    <Box minH="600px">
      <Flex
        justify="center"
        align="center"
        gap="2"
        flexDir={{ base: 'column', lg: 'row' }}
        w={{ base: '100%', lg: '90%' }}
        mx="auto"
        p="2rem"
      >
        <Box w={{ base: '100%', lg: '50%' }}>
          <Heading
            size={{ base: 'xl', lg: '3xl' }}
            lineHeight="4rem"
            color="brand.primary"
          >
            {displayedText}
          </Heading>
          <Text fontSize={{ base: 'md', lg: 'lg' }} py="1rem" maxW="600px">
            {descriptionText}
          </Text>
          <Link href="/products">
            <Button
              borderRadius="50px"
              minW="10rem"
              bgColor="brand.primary"
              color="white"
              _hover={{ bgColor: 'brand.primaryDark' }}
            >
              Shop Now
            </Button>
          </Link>
        </Box>
        <Box w={{ base: '100%', lg: '50%' }}>
          <Box
            my="2rem"
            w={{ base: '300px', lg: '600px' }}
            h={{ base: '300px', lg: '500px' }}
            bg="center / cover no-repeat url(mockup.svg)"
          />
          {/* <BannerSlider /> */}
        </Box>
      </Flex>
    </Box>
  );
};
