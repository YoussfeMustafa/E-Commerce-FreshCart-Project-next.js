import { getCategory } from '@/API/Categort.Api';
import CategoryMain from '@/app/_components/CategoryMain/CategoryMain';
import React from 'react';

export default async function Categories() {

  let { data } = await getCategory();

  return (
    <>
      <CategoryMain data={data} />
    </>
  );
}
