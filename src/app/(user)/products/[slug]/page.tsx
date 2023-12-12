import { ProductDetails } from '@src/features/products/ProductDetails';
import { IProduct } from '@src/model';
import { client } from '@utils/sanity.client';
import { groq } from 'next-sanity';
import React from 'react';

const query: string = groq`
  *[_type == "product" && slug.current == $slug][0] {
    ...,
    "id": _id,
    "slug": slug.current,
    "mainImage": mainImage.asset->url,
    category->{
      name,
      "id": _id,
      "image": image.asset->url
    },
    "gallery": gallery[].asset->url
  }
`;

type Props = {
  params: {
    slug: string;
  };
};

async function ProductDetailsPage({ params: { slug } }: Props) {
  let product: IProduct | null = null;

  try {
    product = await client.fetch(query, { slug });
  } catch (error) {
    console.error('Error fetching product:', error);
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  const { category } = product;

  return (
    <>
      {category ? (
        <ProductDetails product={product} />
      ) : (
        <div>Product category not available</div>
      )}
    </>
  );
}

export default ProductDetailsPage;
