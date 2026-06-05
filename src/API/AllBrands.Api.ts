

// export const getAllBrands = async () => {
//   const response = await fetch(`https://ecommerce.routemisr.com/api/v1/brands`);
//   const { data } = await response.json();
//   return data;
// };




// export const getAllBrands = async () => {
//   try {
//     const response = await fetch(`https://ecommerce.routemisr.com/api/v1/brands`, {
//       next: { revalidate: 0 } // هذا السطر يمنع الـ Cache ويجلب البيانات دائماً
//     });

//     if (!response.ok) {
//       throw new Error(`Failed to fetch brands: ${response.status}`);
//     }

//     const { data } = await response.json();
//     return data;
//   } catch (error) {
//     console.error("Error fetching brands:", error);
//     return []; // إرجاع مصفوفة فارغة لتجنب انهيار الصفحة
//   }
// };



export const getAllBrands = async () => {
  // استخدام الرابط الثابت كحل احتياطي (Fallback) إذا لم يقرأ Vercel المتغير
  const apiUrl = process.env.BASE_URL || 'https://ecommerce.routemisr.com/api/v1';
  
  try {
    const response = await fetch(`${apiUrl}/brands`, {
      cache: 'no-store' // يضمن عدم حدوث خطأ بسبب الكاش أثناء الـ Build
    });

    if (!response.ok) {
      console.error("Failed to fetch brands, status:", response.status);
      return []; // إرجاع مصفوفة فارغة لكي لا يتوقف الموقع عن العمل
    }

    const { data } = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching brands:", error);
    return []; // إرجاع مصفوفة فارغة في حال حدوث خطأ في الاتصال
  }
};