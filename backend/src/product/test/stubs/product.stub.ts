export const productStub = () => {
  return {
    id: 1,
    sku: 'abbs-1234',
    name: 'xiaomi airdot 6',
    description: 'Details description of the product',
    price: 29.99,
    ratings: 4.5,
    category: 'phone',
    discount: 0.1,
    stock: 30,
    image_url: expect.any(String),
    links: {
      self: 'http://localhost:3000/products/1',
    },
    created_at: expect.any(Date),
  };
};
export const productDetailsStub = () => {
  return {
    id: 1,
    sku: 'abbs-1234',
    name: 'xiaomi airdot 6',
    description: 'Details description of the product',
    price: 29.99,
    ratings: 4.5,
    category: 'phone',
    discount: expect.any(Number),
    stock: 30,
    image_url: expect.any(Array),
    links: {
      self: 'http://localhost:3000/products/1',
    },
    created_at: expect.any(Date),
    added_by: {
      id: expect.any(Number),
      name: expect.any(String),
      email: expect.any(String),
      role: 'admin',
      links: {
        self: 'http://localhost:3000/users/1',
      },
    },
  };
};

export const productPayloadStub = () => {
  return {
    name: 'xiaomi airdot 6',
    sku: 'abbs-1234',
    description: 'Details description of the product',
    price: 29.99,
    image_urls: ['s3.firstimage.jpeg', 's3.secondimage.jpeg'],
    category: 'phone',
    stock: 30,
  };
};
