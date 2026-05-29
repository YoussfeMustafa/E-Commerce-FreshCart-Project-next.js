import SingleCard from "@/app/_components/SingleCard/SingleCard";
import { ProductType } from "@/types/AllProduct.types";

// هذا المكون يستقبل البيانات كـ Props (بدل ما يجلبها بنفسه)
export default function ProductsList({ data }: { data: ProductType[] }) {
  return (
    <div className="flex flex-wrap mx-auto w-[95%] py-2">
      {data.map((CurrentProduct: ProductType) => (
        <div
          key={CurrentProduct.id}
          className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5"
        >
          <div className="inner p-2">
            <SingleCard CurrentProduct={CurrentProduct} />
          </div>
        </div>
      ))}
    </div>
  );
}