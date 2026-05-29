import { getAllProducts } from "@/API/AllProducts.Api"; // استيراد دالة جلب البيانات
import CategorySlider from "./_components/CategorySlider/CategorySlider";
import BackgroundImage from "./_components/BackgroundImage/BackgroundImage";
import SectionHome from "./_components/SectionHome/SectionHome";
import MobileApp from "./_components/MobileApp/mobileApp";
import SingleCard from "./_components/SingleCard/SingleCard"; // استيراد الـ Card مباشرة

export default async function Home() {
  // 1. جلب البيانات مباشرة هنا في صفحة الـ Home
  const data = await getAllProducts();

  return (
    <>
      <BackgroundImage />
      <CategorySlider />
      <SectionHome />
      
      <div className="w-[95%] mx-auto mt-15 my-3">
        <h2 className="font-bold text-4xl tracking-tight text-gray-900">
          Featured <span className="text-teal-800">Products</span>
        </h2>
      </div>

      {/* 2. عرض المنتجات مباشرة هنا */}
      <div className="flex flex-wrap mx-auto w-[95%] py-2">
        {data.map((product: any) => (
          <div key={product.id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5">
            <div className="inner p-2">
              <SingleCard CurrentProduct={product} />
            </div>
          </div>
        ))}
      </div>

      <MobileApp />
    </>
  );
}