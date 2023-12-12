'use client';
import React, { useContext, useState } from 'react';
import {
  Box,
  Button,
  Divider,
  Flex,
  Grid,
  GridItem,
  Heading,
  Link,
  Stack,
  Text,
} from '@chakra-ui/react';
import { AddToWishlistButton } from '@src/components/AddToWishlistButton';
import { CustomBreadcrumb } from '@src/components/CustomBreadcrumb';
import { AppContext } from '@src/context/AppContext';
import { getSubstring } from '@src/helpers';
import { IBreadcrumbItem, IProduct } from '@src/model';

interface ProductDetailsProps {
  product: IProduct;
}

const items: IBreadcrumbItem[] = [
  {
    name: 'Products',
    link: '/products',
  },
  {
    name: 'Categories',
    link: '/categories',
  },
];

export const ProductDetails = ({ product }: ProductDetailsProps) => {
  const [quantity, setQuantity] = useState(1);
  const { isAdded, addItem, resetItems } = useContext(AppContext);
  const [selectedImage, setSelectedImage] = useState(product?.mainImage);

  const handleImageClick = (image: string) => {
    setSelectedImage(image);
  };

  return (
    <>
      <CustomBreadcrumb
        items={[
          ...items,
          {
            name: product.category.name,
            link: `/categories/${product.category.id}`,
          },
          {
            name: getSubstring(product.name, 20),
            link: `/products/${product.slug}`,
          },
        ]}
      />
      <Grid
        templateColumns={{ base: 'repeat(1, 1fr)', lg: 'repeat(2, 1fr)' }}
        w={{ base: '100%', lg: '90%' }}
        mx="auto"
        p="2rem"
        gap="20"
      >
        <GridItem p="1rem" pos="relative">
          <AddToWishlistButton product={product} />
          <img src={selectedImage} alt={product.name} onClick={() => handleImageClick(product?.mainImage)} />
          <Flex>
            {product.gallery?.length !== 0 &&
              product.gallery?.map((image: string, i: number) => (
                <img
                  key={i}
                  src={image}
                  alt={product.name}
                  onClick={() => handleImageClick(image)}
                  style={{
                  width: "70px", 
                  height: "70px", 
                  borderRadius: "md",
                  boxShadow: "sm",
                  borderWidth: "1px",
                  borderColor: "gray.100",
                  margin: "auto",
                }}
              />
              ))}
          </Flex>
        </GridItem>
        <GridItem p="1rem">
          <Heading>{product.name}</Heading>
          <Text my="1rem">{product.description}</Text>
          {/* Add your Rating component here */}

          <Text fontWeight="bold" fontSize="2rem">
            €{product.price}
          </Text>
          <Divider my="1rem" />
          {/* Add your Quantity component here */}
          <Divider my="1rem" />
          <Box>
            <Link href="/checkout">
              <Button
                variant="outline"
                bgColor="brand.primary"
                color="white"
                borderRadius="50px"
                size="sm"
                w="160px"
                mr="1rem"
                my="0.5rem"
                _hover={{ bgColor: 'none' }}
                onClick={() => {
                  resetItems('checkout');
                  addItem('checkout', product, quantity);
                }}
              >
                Buy Now
              </Button>
            </Link>
            {/* Add your AddToCartButton component here */}
          </Box>

          <Stack py="2rem">
            <Box borderWidth={1} borderColor="gray.100" p="1rem">
              <Text fontWeight="bold">Free Deliver</Text>
              <Link textDecor="underline" color="gray.500">
                Enter Your postal Code for Delivery Availability
              </Link>
            </Box>

            <Box borderWidth={1} borderColor="gray.100" p="1rem">
              <Text fontWeight="bold">Return Delivery</Text>
              <Text color="gray.500">
                Free 30 Days Delivery Returns
                <Link textDecor="underline"> Details</Link>
              </Text>
            </Box>
          </Stack>
        </GridItem>
      </Grid>
    </>
  );
};
