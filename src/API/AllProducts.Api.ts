export const getAllProducts = async () => {
  // استبدل السطر الذي يحتوي على process.env بهذا السطر المباشر:
  const response = await fetch("https://ecommerce.routemisr.com/api/v1/products", {
    cache: 'force-cache'
  });

  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }

  const { data } = await response.json();
  return data;
};