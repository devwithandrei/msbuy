import { Text } from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';

export const AppLogo = () => {
  return (
    <Link href="/">
      <Text color="gray.800" fontWeight="bold">
        Trendy{' '}
        <Text as="span" color="brand.primary">
          Stocky
        </Text>
      </Text>
    </Link>
  );
};
