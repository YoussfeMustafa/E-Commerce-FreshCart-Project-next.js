import Link from "next/link";
import { notFound } from "next/navigation";

// دالة جلب تفاصيل البراند
async function getBrandDetail(id: string) {
  try {
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/brands/${id}`);
    if (!res.ok) return null;
    const result = await res.json();
    return result.data;
  } catch (error) {
    return null;
  }
}

// دالة جلب المنتجات المفلترة حسب البراند
async function getBrandProducts(id: string) {
  try {
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/products?brand=${id}`);
    const result = await res.json();
    return result.data;
  } catch (error) {
    return [];
  }
}

export default async function BrandDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // جلب البيانات بالتوازي لسرعة التحميل
  const [brand, products] = await Promise.all([
    getBrandDetail(id),
    getBrandProducts(id)
  ]);

  if (!brand) notFound();

  return (
    <>
      {/* Top Banner */}
      <div className="bg-gradient-to-b from-green-800 via-green-700 to-green-600 w-full h-64 flex items-center mt-20">
        <div className="w-11/12 max-w-10xl mx-auto space-y-5">
          <div className="flex items-center space-x-2 text-sm">
            <Link className="text-gray-300 hover:text-white transition font-medium" href={"/"}>Home</Link>
            <span className="text-white/50">/</span>
            <Link className="text-gray-300 hover:text-white transition font-medium" href={"/brands"}>Brands</Link>
            <span className="text-white/50">/</span>
            <h4 className="text-white font-bold">{brand.name}</h4>
          </div>
          <div className="flex items-center gap-6">
            <div className="bg-white p-4 rounded-3xl shadow-2xl w-24 h-24 flex items-center justify-center overflow-hidden">
              <img src={brand.image} alt={brand.name} className="w-full h-full object-contain" />
            </div>
            <div>
              <h1 className="text-white font-black text-5xl md:text-6xl">{brand.name}</h1>
              <p className="text-green-100 text-lg font-medium">Explore {products.length} exclusive products</p>
            </div>
          </div>
        </div>
      </div>

      <div className="min-h-screen bg-[#f8f9fa] py-16 px-6">
        <div className="max-w-7xl mx-auto">
          
          {/* Products Grid Section */}
          <div className="mb-10 flex items-center justify-between">
            <h2 className="text-2xl font-black text-black">Products Collection</h2>
            <div className="h-1 flex-1 mx-6 bg-slate-200 rounded-full hidden md:block"></div>
          </div>

          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {products.map((product: any) => (
                <div key={product._id} className="group bg-white rounded-3xl p-5 border border-slate-100 hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] transition-all duration-500">
                  <div className="relative aspect-square mb-6 overflow-hidden rounded-2xl bg-slate-50">
                    <img 
                      src={product.imageCover} 
                      alt={product.title}
                      className="w-full h-full object-contain p-4 transition-transform duration-700 group-hover:scale-110" 
                    />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-simibold text-slate-800 line-clamp-1 text-lg">{product.title}</h3>
                    <div className="flex items-center justify-between pt-2">
                      <span className="text-green-600 font-bold text-md">{product.price} EGP</span>
                      <button className="bg-slate-900 text-white w-10 h-10 rounded-xl flex items-center justify-center hover:bg-green-600 transition-colors shadow-lg shadow-slate-200">
                         <i className="fa-solid fa-cart-shopping text-sm"></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-32 bg-white rounded-[3rem] border border-slate-100 shadow-sm">
              <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                 <i className="fa-solid fa-box-open text-3xl text-slate-300"></i>
              </div>
              <h3 className="text-2xl font-bold text-slate-800">No Products Available</h3>
              <p className="text-slate-400 mt-2">We couldn't find any products for {brand.name} at the moment.</p>
              <Link href="/brands" className="mt-8 inline-block bg-slate-900 text-white px-8 py-3 rounded-2xl font-bold hover:bg-slate-800 transition">
                Back to Brands
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}