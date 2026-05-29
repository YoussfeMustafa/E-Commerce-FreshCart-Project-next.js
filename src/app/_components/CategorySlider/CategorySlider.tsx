
import { getCategory } from '@/API/Categort.Api'
import React from 'react'

import SliderHome from '../SliderHome/SliderHome';
export default async function CategorySlider() {

    let {data} = await getCategory()
    
    
  return (
    <>
    
    
    <SliderHome data={data}/>
    
    
    </>
  )
}
