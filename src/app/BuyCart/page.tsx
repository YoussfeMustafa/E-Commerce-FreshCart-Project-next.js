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
    <div className="container mx-auto px-4 py-5 ">
      <div className='container'>
        <nav className="text-md mb-4 text-gray-500">
          <Link href="/" className="hover:text-green-500 transition-colors font-semibold">Home</Link>
          <span className="mx-2 text-gray-300">/</span>
          <Link href="/Carts" className="hover:text-green-500 transition-colors font-semibold">Cart</Link>
          <span className="mx-2 text-gray-300">/</span>
          <span className="text-green-700 font-bold">Checkout</span>
        </nav>

        <div className="flex justify-between items-center mb-10">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 rounded-2xl">
              <ShoppingBag className="text-green-700 w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Complete Your Order</h1>
              <p className="text-gray-600 text-lg font-medium">Review your items and complete your purchase</p>
            </div>
          </div>
          <Link href="/Carts" className="flex items-center gap-2 text-green-700 hover:text-green-800 transition-all font-semibold text-lg tracking-tight">
            <ArrowLeft size={20} />
            <span>Back to Cart</span>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-6">
          <section className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-4 mb-8 bg-green-50 p-6 rounded-2xl border border-green-100">
              <div className="p-3 bg-white shadow-sm rounded-xl text-green-600"><Truck size={28} /></div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">Shipping Address</h2>
                <p className="text-sm text-slate-600 font-medium">Where should we deliver your order?</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* City Input */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-slate-600 ml-1">City</label>
                <input
                  placeholder="e.g. Cairo"
                  className="p-2 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
                  onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                />
              </div>

              {/* Street Address Input */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-slate-600 ml-1">Street Address</label>
                <input
                  placeholder="e.g. 123 Nile Street"
                  className="p-2 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
                  onChange={(e) => setShippingAddress({ ...shippingAddress, details: e.target.value })}
                />
              </div>

              {/* Phone Number Input */}
              <div className="flex flex-col gap-2 col-span-full">
                <label className="text-sm font-semibold text-slate-600 ml-1">Phone Number</label>
                <input
                  type="tel"
                  placeholder="+20 100 000 0000"
                  className="p-2 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
                  onChange={(e) => setShippingAddress({ ...shippingAddress, phone: e.target.value })}
                />
              </div>
            </div>
          </section>

          <section className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-4 mb-8 bg-blue-50 p-6 rounded-2xl border border-blue-100">
              <div className="p-3 bg-white shadow-sm rounded-xl text-blue-700"><CreditCard size={28} /></div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">Payment Method</h2>
                <p className="text-sm text-slate-600 font-medium">Choose how you'd like to pay</p>
              </div>
            </div>
            <div className="space-y-4">
              {['cash', 'card'].map((method) => (
                <label key={method} className={`flex items-center p-3 border-2 rounded-2xl cursor-pointer ${paymentMethod === method ? 'border-green-600 bg-green-50/50' : 'border-slate-100'}`}>
                  <input type="radio" name="payment" checked={paymentMethod === method} onChange={() => setPaymentMethod(method)} className="w-5 h-5 text-green-600" />
                  <span className="ml-3 font-medium capitalize">{method === 'cash' ? 'Cash on Delivery' : 'Credit Card (Stripe)'}</span>
                </label>
              ))}
            </div>
          </section>
        </div>

        <aside className="bg-slate-900 text-white p-8 rounded-3xl h-fit lg:sticky lg:top-8 shadow-2xl">
          {/* ... داخل الـ aside بعد عنوان Order Summary ... */}
          <div className="space-y-4 mb-8">
            {cartData.products.map((item: any) => (
              <div key={item._id} className="flex items-center gap-4 text-slate-300">
                {/* 1. إضافة صورة المنتج */}
                <img
                  src={item.product.imageCover}
                  alt={item.product.title}
                  className="w-16 h-16 object-cover rounded-lg border border-slate-700"
                />

                {/* 2. تفاصيل المنتج */}
                <div className="flex-1 flex justify-between items-center">
                  <div className="flex flex-col">
                    <span className="font-semibold text-white">{item.product.title}</span>
                    <span className="text-xs text-slate-400">Qty: {item.count}</span>
                  </div>
                  <span className="font-bold">{item.price * item.count} EGP</span>
                </div>
              </div>
            ))}
          </div>
          <button
            disabled={isProcessing}
            onClick={handlePlaceOrder}
            className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-bold transition-all shadow-lg"
          >
            <CheckCircle2 size={20} />
            {isProcessing ? "Processing..." : "Place Order"}
          </button>
        </aside>
      </div>
    </div>
  );
}