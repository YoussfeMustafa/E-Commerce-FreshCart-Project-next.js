import CategorySlider from "./_components/CategorySlider/CategorySlider";
import Products from "./(pages)/products/page";
import BackgroundImage from "./_components/BackgroundImage/BackgroundImage";
import SectionHome from "./_components/SectionHome/SectionHome";
import MobileApp from "./_components/MobileApp/mobileApp";



export default function Home() {
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
      <Products />
      <MobileApp />


    </>
  );
}
