import { CreateProductDto } from 'src/product/dto/create-product.dto';

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

export const productPayloadStub = (): CreateProductDto => {
  return {
    name: 'xiaomi airdot 6',
    sku: 'abbs-1234',
    description: 'Details description of the product',
    price: 29.99,
    category: 'phone',
    stock: 30,
  };
};

export const randomProductsStub = () => {
  let price = Math.random() * 100;
  let ratings = Math.random() * 5;
  let discount = Math.random() * 0.5;
  let stock = Math.floor(Math.random() * 100);

  return {
    id: 1,
    sku: 'abbs-1234',
    name: 'xiaomi airdot 6',
    description: 'Details description of the product',
    price: price,
    ratings: ratings,
    category: 'phone',
    discount: discount,
    stock: stock,
    image_url: expect.any(String),
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

export const getTenRandomProductsStub = () => {
  const product = [];

  for (let i = 0; i < 10; i++) {
    product.push(randomProductsStub());
  }
};
