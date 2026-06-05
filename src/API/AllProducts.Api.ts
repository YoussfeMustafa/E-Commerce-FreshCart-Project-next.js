// export const getAllProducts = async () => {
//   // سنضع الرابط المباشر لضمان عمل الـ Build
//   const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://ecommerce.routemisr.com/api/v1";
  
//   const response = await fetch(`${baseUrl}/products`, { cache: 'force-cache' });
  
//   if (!response.ok) {
//      throw new Error("Failed to fetch products");
//   }
  
//   const { data } = await response.json();
//   return data;
// }



export const getAllProducts = async () => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://ecommerce.routemisr.com/api/v1";
  
  // نستخدم revalidate لجعل الـ Build ناجحاً ومستقراً
  const response = await fetch(`${baseUrl}/products`, { 
    next: { revalidate: 3600 } 
  });
  
  if (!response.ok) {
     return []; // إرجاع مصفوفة فارغة لتجنب انهيار الـ Build تماماً
  }
  
  const { data } = await response.json();
  return data;
}