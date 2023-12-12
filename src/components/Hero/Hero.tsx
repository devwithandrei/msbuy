'use client';
import { useState, useEffect } from 'react';
import { Box, Button, Card, Heading, Image, Text } from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';

interface IHeroProps {
  heading: string;
  description: string;
  imageUrl: string;
  btnLabel: string;
  btnLink: string;
}

export const Hero = ({
  heading,
  description,
  imageUrl,
  btnLabel,
  btnLink,
}: IHeroProps) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= heading.length) {
        setDisplayedText(heading.substring(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 100); // Adjust typing speed by changing the interval duration

    return () => {
      clearInterval(interval);
    };
  }, [heading]);

  return (
    <Card
      direction={{ base: 'column', md: 'row' }}
      align="center"
      justify="space-between"
      overflow="hidden"
      variant="outline"
      w={{ base: '100%', lg: '90%' }}
      mx="auto"
      shadow="sm"
      p="2rem"
      mb="2rem"
    >
      <Box mx="2rem" w={{ base: '100%', md: '50%' }}>
        <Heading size="2xl">{displayedText}</Heading>
        <Text py="1rem">{description}</Text>

        <Link href={btnLink}>
          <Button variant="outline">{btnLabel}</Button>
        </Link>
      </Box>
      <Box mx="2rem" w={{ base: '100%', md: '50%' }} mt="1rem">
        <Image
          src={imageUrl}
          alt={heading}
          objectFit="cover"
          maxW={{ base: '100%' }}
          rounded="md"
        />
      </Box>
    </Card>
  );
};
