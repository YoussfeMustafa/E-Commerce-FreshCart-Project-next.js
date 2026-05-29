import React from 'react'

// دالة جلب البيانات (أفضل تكون منفصلة أو داخل المكون)
async function getSubCategories(categoryId: string) {
    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/categories/${categoryId}/subcategories`);
    
    if (!response.ok) {
        throw new Error("Failed to fetch subcategories");
    }

    const result = await response.json(); // لازم await هنا كمان
    return result.data; // الـ API بيرجع البيانات جوا object اسمه data
}

export default async function SubCategories() {
    // استخدمنا الـ ID اللي كان في الكود بتاعك
    const categoryId = "6407ea3d5bbc6e43516931df";
    const subCategories = await getSubCategories(categoryId);

    return (
        <div className="py-10 px-5">
            <h2 className="text-2xl font-bold text-center mb-8 text-green-600">
                SubCategories
            </h2>

            {subCategories.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {subCategories.map((sub: any) => (
                        <div 
                            key={sub._id} 
                            className="p-4 border rounded-xl bg-white shadow-sm hover:shadow-md transition-all text-center border-gray-100 hover:border-green-300"
                        >
                            <h3 className="font-semibold text-gray-800 text-lg">
                                {sub.name}
                            </h3>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-500">No subcategories found.</p>
            )}
        </div>
    )
}