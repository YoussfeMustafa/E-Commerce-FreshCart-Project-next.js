"use client";
import React, { useState, useContext } from 'react';
import { Truck, CreditCard, ShoppingBag, CheckCircle2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { CartContext } from "@/context/CartContext";
import toast from 'react-hot-toast';
import { handelCashOrder, handelCheckoutSession } from '@/API/Order';
import { useRouter } from 'next/navigation'; // لاستخدام router.push

export default function BuyCart() {
  // تأكد من استخراج setCartCount من الـ Context
  const { cartData, setCartData, setCartCount } = useContext(CartContext);
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [isProcessing, setIsProcessing] = useState(false);
  const [shippingAddress, setShippingAddress] = useState({ details: "", phone: "", city: "" });
  const router = useRouter();
  const { updateCartCount } = useContext(CartContext);

  const handlePlaceOrder = async () => {
    if (!cartData?._id) return;
    setIsProcessing(true);

    try {
      let res;
      if (paymentMethod === 'cash') {
        res = await handelCashOrder(cartData._id, shippingAddress);
      } else {
        res = await handelCheckoutSession(cartData._id, shippingAddress);
      }

      // التحقق من أن الطلب تم بنجاح
      if (res?.status === 'success') {
        toast.success("Order placed successfully!");
        await updateCartCount();

        if (paymentMethod === 'cash') {
          router.push("/allorders");
        } else {
          window.location.href = res.session.url;
        }
      } else {
        // هنا في حال كان السيرفر رد بـ fail ولكن بدون حدوث خطأ في الـ catch
        toast.error(res?.message || "Failed to place order. Please check your data.");
      }
    } catch (error: any) {
      // في حال حدوث خطأ تقني في الشبكة أو السيرفر
      toast.error(error?.message || "An unexpected error occurred. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (!cartData) return <div className="text-center mt-20 font-bold text-xl">Loading...</div>;


  return (
   <div className="container mx-auto px-4 py-8">
      {/* 1. Header Section */}
      <nav className="text-sm mb-6 text-gray-500 overflow-x-auto whitespace-nowrap">
        <Link href="/" className="hover:text-green-500 transition-colors font-semibold">Home</Link>
        <span className="mx-2 text-gray-300">/</span>
        <Link href="/Carts" className="hover:text-green-500 transition-colors font-semibold">Cart</Link>
        <span className="mx-2 text-gray-300">/</span>
        <span className="text-green-700 font-bold">Checkout</span>
      </nav>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-green-100 rounded-2xl">
            <ShoppingBag className="text-green-700 w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Complete Your Order</h1>
            <p className="text-gray-600 text-sm md:text-lg font-medium">Review items & finish purchase</p>
          </div>
        </div>
        <Link href="/Carts" className="flex items-center gap-2 text-green-700 hover:text-green-800 font-semibold text-lg">
          <ArrowLeft size={20} /> Back
        </Link>
      </div>

      {/* 2. Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-10">
        
        {/* Left Side: Forms */}
        <div className="lg:col-span-2 space-y-6">
          {/* Shipping Section */}
          <section className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-4 mb-6 bg-green-50 p-4 md:p-6 rounded-2xl border border-green-100">
              <div className="p-3 bg-white shadow-sm rounded-xl text-green-600"><Truck size={24} /></div>
              <div>
                <h2 className="text-lg md:text-xl font-bold text-slate-900">Shipping Address</h2>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input placeholder="City" className="p-3 bg-slate-50 border border-slate-300 rounded-xl w-full focus:ring-2 focus:ring-green-500 outline-none" onChange={(e) => setShippingAddress({...shippingAddress, city: e.target.value})} />
              <input placeholder="Street Address" className="p-3 bg-slate-50 border border-slate-300 rounded-xl w-full focus:ring-2 focus:ring-green-500 outline-none" onChange={(e) => setShippingAddress({...shippingAddress, details: e.target.value})} />
              <input type="tel" placeholder="Phone Number" className="p-3 bg-slate-50 border border-slate-300 rounded-xl w-full col-span-full focus:ring-2 focus:ring-green-500 outline-none" onChange={(e) => setShippingAddress({...shippingAddress, phone: e.target.value})} />
            </div>
          </section>

          {/* Payment Section */}
          <section className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-4 mb-6 bg-blue-50 p-4 md:p-6 rounded-2xl border border-blue-100">
              <div className="p-3 bg-white shadow-sm rounded-xl text-blue-700"><CreditCard size={24} /></div>
              <h2 className="text-lg md:text-xl font-bold text-slate-900">Payment Method</h2>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {['cash', 'card'].map((method) => (
                <label key={method} className={`flex items-center p-4 border-2 rounded-2xl cursor-pointer transition-all ${paymentMethod === method ? 'border-green-600 bg-green-50' : 'border-slate-100'}`}>
                  <input type="radio" name="payment" checked={paymentMethod === method} onChange={() => setPaymentMethod(method)} className="w-5 h-5 text-green-600" />
                  <span className="ml-3 font-medium capitalize">{method === 'cash' ? 'Cash on Delivery' : 'Credit Card'}</span>
                </label>
              ))}
            </div>
          </section>
        </div>

        {/* Right Side: Summary */}
        <aside className="bg-slate-900 text-white p-6 md:p-8 rounded-3xl h-fit lg:sticky lg:top-8 shadow-2xl">
          <h3 className="text-xl font-bold mb-6">Order Summary</h3>
          <div className="space-y-4 mb-8 max-h-[300px] overflow-y-auto pr-2">
            {cartData?.products?.map((item: any) => (
              <div key={item._id} className="flex items-center gap-3">
                <img src={item.product.imageCover} alt={item.product.title} className="w-14 h-14 object-cover rounded-lg" />
                <div className="flex-1 text-sm">
                  <p className="font-semibold">{item.product.title.split(' ').slice(0, 3).join(' ')}...</p>
                  <p className="text-slate-400">Qty: {item.count}</p>
                </div>
                <span className="font-bold text-sm">{item.price * item.count} EGP</span>
              </div>
            ))}
          </div>
          <div className="border-t border-slate-700 pt-4 flex justify-between font-bold text-lg mb-6">
            <span>Total:</span>
            <span>{cartData?.totalCartPrice} EGP</span>
          </div>
          <button 
            disabled={isProcessing}
            className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-bold transition-all"
          >
            <CheckCircle2 size={20} /> {isProcessing ? "Processing..." : "Place Order"}
          </button>
        </aside>
      </div>
    </div>
  );
}