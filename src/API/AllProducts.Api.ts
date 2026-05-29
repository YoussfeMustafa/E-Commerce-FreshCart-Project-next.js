export const getAllProducts = async () => {
  const response = await fetch("https://ecommerce.routemisr.com/api/v1/products", {
    cache: 'no-store' 
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }

  const { data } = await response.json();
  return data;
};