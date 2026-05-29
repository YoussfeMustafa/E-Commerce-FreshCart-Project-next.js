import React from "react";

import { getAllProducts } from "@/API/AllProducts.Api";
import SingleCard from "@/app/_components/SingleCard/SingleCard";
import { ProductType } from "@/types/AllProduct.types";
import SectionProduct from "@/app/_components/SectionProduct/SectionProduct";
import ProductsList from "@/app/_components/ProductsList/ProductsList";
export const dynamic = 'force-dynamic';

export default async function Products() {
  let data = await getAllProducts();

  return (
    <>


      <SectionProduct />

<ProductsList data={data} />
      
    </>
  );
}
