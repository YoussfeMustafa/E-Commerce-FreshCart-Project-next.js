import { getAllProducts } from "@/API/AllProducts.Api";
import SingleCard from "./_components/SingleCard/SingleCard";
// ... باقي الاستيرادات ...

export default async function Home() {
  const data = await getAllProducts();

  return (
    <>
      {/* ... الكود الخاص بك ... */}
      <div className="flex flex-wrap">
        {data.map((product: any) => (
          <SingleCard key={product.id} CurrentProduct={product} />
        ))}
      </div>
    </>
  );
}