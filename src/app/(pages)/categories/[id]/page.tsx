import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

// 1. دالة جلب بيانات القسم الرئيسي
async function getCategoryData(id: string) {
  try {
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/categories/${id}`);
    if (!res.ok) return null;
    const result = await res.json();
    return result.data;
  } catch (error) {
    return null;
  }
}

// 2. دالة جلب الأقسام الفرعية (SubCategories) لهذا القسم تحديداً
async function getSubCategories(id: string) {
  try {
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`);
    if (!res.ok) return [];
    const result = await res.json();
    return result.data; // مصفوفة الأقسام الفرعية
  } catch (error) {
    return [];
  }
}

export default async function CategoryDetailsPage({
  params,
}: {
  params: Promise<{ id: string; }>;
}) {
  const { id } = await params;

  // جلب البيانات بالتوازي لسرعة الأداء
  const [category, subCategories] = await Promise.all([
    getCategoryData(id),
    getSubCategories(id)
  ]);

  if (!category) notFound();

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-20 px-5">
      <div className="max-w-8xl mx-auto">

        {/* Breadcrumb - شريط التصفح السفلي */}
        <nav className="mb-8 flex items-center gap-2 text-gray-500 text-sm">
          <Link href="/" className="hover:text-green-600 transition">Home</Link>
          <span>/</span>
          <Link href="/categories" className="hover:text-green-600 transition">Categories</Link>
          <span>/</span>
          <span className="text-green-700 font-bold">{category.name}</span>
        </nav>
        {/* --- قسم الـ SubCategories المضاف --- */}
        <div className="space-y-8">
          <div className="flex items-center gap-4">
            <h2 className="text-3xl font-bold text-gray-800 tracking-tight">Explore Sub-Categories</h2>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          {subCategories.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {subCategories.map((sub: any) => (
                <div
                  key={sub._id}
                  className="group bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-2xl hover:border-green-200 transition-all duration-500 cursor-pointer"
                >
                  <div className="flex flex-col items-center text-center space-y-4">
                    {/* الأيقونة التفاعلية */}
                    <div className="w-14 h-14 text-green-500 rounded-2xl flex items-center justify-center bg-gray-200 group-hover:bg-green-600 group-hover:text-white group-hover:rotate-6 transition-all duration-500">
                      <i className="fa-solid fa-folder-open text-3xl"></i>
                    </div>

                    <div>
                      <h3 className="font-bold text-gray-800 text-xl group-hover:text-green-700 transition-colors">
                        {sub.name}
                      </h3>

                    </div>

                    <Link href={"/products"}>
                      <div className="pt-2">
                        <span className="text-md font-medium text-green-600 opacity-0 group-hover:opacity-100 transition-opacity">
                          Browse Products →
                        </span>
                      </div>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-24 bg-white rounded-[3rem] border-2 border-dashed border-gray-100 shadow-inner">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="fa-solid fa-folder-open text-3xl text-gray-200"></i>
              </div>
              <p className="text-gray-400 font-bold text-xl">No sub-categories available yet.</p>
              <p className="text-gray-300 text-sm mt-2">Check back later for new updates.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}