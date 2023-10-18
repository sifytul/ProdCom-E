export const categoryStub = () => {
  return {
    id: 1,
    category_name: 'phone',
    description: 'Details description of the category',
    image_public_id: 'image_public_id',
    image_url: 'image_url',
    created_at: expect.any(Date),
    updated_at: expect.any(Date),
  };
};
