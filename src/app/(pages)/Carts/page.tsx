"use client";
import React, { useEffect, useState, useContext } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { ShoppingCart, Trash2, Plus, Minus } from 'lucide-react';
import { handelGetUserCart, handelRemoveToCart } from "@/API/Cart";
import { CartContext } from "@/context/CartContext";
import toast from 'react-hot-toast';

export default function CartPage() {

    const { status } = useSession();
    const { cartData, setCartData, updateCartCount } = useContext(CartContext);
     const [isLoading, setIsLoading] = useState<boolean>(true);

    // استخدام الـ Context لتحديث العداد
    const { setCartCount } = useContext(CartContext);

    // 🌟 هذا هو الـ useEffect المطلوب للمزامنة التلقائية (لا يغير في الـ UI)
    useEffect(() => {
        if (cartData && cartData.products) {
            setCartCount(cartData.products.length);
        }
    }, [cartData, setCartCount]);

    const fetchCartData = async () => {
        setIsLoading(true);
        try {
            const result = await handelGetUserCart();
            if (result && (result.status === "success" || result.data)) {
                setCartData(result.data);
            } else {
                setCartData(null);
            }
        } catch (error) {
            console.error("Error fetching cart:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (status === 'authenticated') {
            fetchCartData();
        } else if (status === 'unauthenticated') {
            setIsLoading(false);
        }
    }, [status]);

    const handleQuantityChange = (productId: string, currentCount: number, dCount: number) => {
        const newCount = currentCount + dCount;
        if (newCount <= 0) return;

        setCartData((prev: any) => {
            if (!prev) return prev;
            const updatedProducts = prev.products.map((item: any) => {
                const id = item.product?._id || item.product?.id;
                if (id === productId) {
                    return { ...item, count: newCount };
                }
                return item;
            });
            const newTotal = updatedProducts.reduce((acc: number, item: any) => acc + (item.price * item.count), 0);
            return { ...prev, products: updatedProducts, totalCartPrice: newTotal };
        });
    };
    async function deletetoCart(productId: string) {
    const loadingToast = toast.loading("Removing item...");

    try {
        const response = await handelRemoveToCart(productId);

        if (response?.status === "success") {
            // 1. تحديث بيانات السلة في الـ Context (هذا سيجعل BuyCart تتحدث تلقائياً)
            setCartData(response.data); 
            
            // 2. تحديث عداد السلة في الـ Navbar فوراً
            updateCartCount(); 

            toast.success("Product removed successfully!", {
                id: loadingToast,
                position: "top-center"
            });
        } else {
            toast.error(response?.message || "Failed to remove product", {
                id: loadingToast,
                position: "top-center"
            });
        }
    } catch (error) {
        console.error("Error:", error);
        toast.error("Something went wrong.", { id: loadingToast });
    }
}
    if (status === "loading" || isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
            </div>
        );
    }

    if (!cartData || !cartData.products || cartData.products.length === 0) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-[#f9fafb] gap-4">
                <ShoppingCart className="w-16 h-16 text-gray-300" />
                <h2 className="text-2xl font-bold text-slate-800">Your cart is empty</h2>
                <p className="text-gray-500 text-sm">Add some products to your cart to see them here.</p>
                <Link href="/" className="bg-green-700 text-white px-6 py-2.5 rounded-xl font-medium hover:bg-green-800 transition-colors">
                    Continue Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-[#f9fafb] min-h-screen py-10 tracking-tight">
            <div className="container mx-auto px-4">
                <nav className="flex items-center space-x-2 text-sm text-gray-400 font-semibold mb-6">
                    <Link className="hover:text-green-600 transition-colors" href="/">Home</Link>
                    <span>/</span>
                    <span className="text-gray-900 ">Shopping Cart</span>
                </nav>

                <div className="flex items-center gap-4 mb-2">
                    <div className="bg-green-500 p-3 rounded-xl shadow-lg shadow-green-100">
                        <ShoppingCart className="text-white w-8 h-8" strokeWidth={2.5} />
                    </div>
                    <h1 className="text-3xl font-bold text-slate-950 tracking-tighter">Shopping Cart</h1>
                </div>

                <p className="text-slate-600 font-semibold mb-8 text-lg">
                    You have <span className="text-green-600">{cartData.products.length} items</span> in your cart
                </p>

                <div className="flex flex-col lg:flex-row gap-8 items-start">
                    <div className="w-full lg:w-2/3 space-y-4">
                        {cartData.products.map((item: any) => {
                            const pId = item.product?._id || item.product?.id;
                            return (
                                <div key={item._id} className="bg-white p-6 rounded-lg border border-gray-100 flex flex-col md:flex-row items-center gap-6 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="relative group">
                                        <Link href={`/products/${pId}`}>
                                            <img
                                                src={item.product?.imageCover}
                                                alt={item.product?.name}
                                                className="w-32 h-32 object-cover rounded-2xl border border-gray-100"
                                            />
                                        </Link>
                                        <span className="absolute -bottom-2 -left-2 bg-green-600 text-white px-2 py-1 rounded-lg text-[10px] font-bold shadow-sm">
                                            In Stock
                                        </span>
                                    </div>

                                    <div className="flex-1 space-y-3 text-center md:text-left">
                                        <h3 className="text-lg font-bold text-slate-900 leading-tight line-clamp-1">
                                            {item.product?.title}
                                        </h3>
                                        <p className="text-green-600 font-bold text-xl">
                                            {item.price} <span className="text-sm font-medium">EGP</span>
                                        </p>

                                        <div className="flex items-center justify-center md:justify-start gap-3 mt-2">
                                            <button
                                                onClick={() => handleQuantityChange(pId, item.count, -1)}
                                                disabled={item.count <= 1}
                                                className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-red-50 hover:text-red-600 disabled:opacity-30 transition-colors cursor-pointer"
                                            >
                                                <Minus className="w-4 h-4" />
                                            </button>
                                            <span className="font-bold text-slate-900 text-lg min-w-[1.5rem] text-center">
                                                {item.count}
                                            </span>
                                            <button
                                                onClick={() => handleQuantityChange(pId, item.count, 1)}
                                                className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-green-600 hover:bg-green-50 transition-colors cursor-pointer"
                                            >
                                                <Plus className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="flex flex-col items-center gap-4 md:border-l md:pl-6 border-gray-100">
                                        <div className="text-center">
                                            <p className="text-[15px] text-gray-400 font-medium">Total</p>
                                            <span className="text-xl font-medium text-slate-900 whitespace-nowrap">
                                                {(item.price * item.count).toLocaleString()} EGP
                                            </span>
                                        </div>
                                        <button
                                            onClick={() => {
                                                console.log("تم الضغط على الزر!");
                                                deletetoCart(item.product?._id || item.product?.id);
                                            }}
                                            className="text-red-500 p-2.5 rounded-xl bg-red-50 hover:bg-red-100 transition-colors cursor-pointer"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="w-full lg:w-1/3">
                        <div className="bg-white rounded-lg border border-gray-100 shadow-xl overflow-hidden sticky top-10">
                            <div className="bg-green-700 p-4 text-white">
                                <h2 className="text-2xl font-medium">Order Summary</h2>
                            </div>
                            <div className="p-8 space-y-6">
                                <div className="flex justify-between text-gray-500 font-semibold text-lg">
                                    <span>Subtotal</span>
                                    <span className="text-slate-900">{(cartData.totalCartPrice || 0).toLocaleString()} EGP</span>
                                </div>
                                <div className='flex justify-between text-gray-500 font-semibold text-lg'>
                                    <span>Shipping</span>
                                    <span className='text-green-500'>Calculated at checkout</span>
                                </div>
                                <hr className='border-gray-100' />
                                <div className="flex justify-between items-center tracking-tighter">
                                    <span className='text-xl font-medium text-slate-900'>Total</span>
                                    <p className='text-xl font-bold text-green-700'>
                                        {(cartData.totalCartPrice || 0).toLocaleString()} <span className='text-sm text-gray-400'>EGP</span>
                                    </p>
                                </div>
                                <Link href={"/BuyCart"}>
                                    <button className="w-full bg-green-700 hover:bg-green-800 text-white py-3 px-6 text-lg font-bold rounded-xl shadow-lg transition-all transform hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-2">
                                        <i className="fa-solid fa-lock text-sm"></i>
                                        Secure Checkout
                                    </button>
                                </Link>
                                <Link href={"/"}>
                                    <div className='text-green-500 font-medium text-md text-center'>
                                        ← Continue Shopping
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}