


export const getAllProducts = async ()=>{
     const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/products`,{cache:'force-cache'}
  );
  const { data } = await response.json();
  return data
}