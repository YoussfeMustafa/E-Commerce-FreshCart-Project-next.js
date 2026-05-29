"use client";
import { handelAddtocart, handelGetUserCart } from "@/API/Cart"; // 🌟 استوردنا دالة الجلب أيضاً
import { Button } from "@/components/ui/button";
import { Loader } from 'lucide-react';
import React, { useState, useContext } from 'react'; // 🌟 استوردنا useContext
import toast from "react-hot-toast";
import { CartContext } from "@/context/CartContext"; // 🌟 استوردنا الـ Context

export default function AddToCartBtnId({ productId }: { productId: string; }) {
    const [isLoading, setIsLoading] = useState(false);
    const { setCartCount } = useContext(CartContext); // 🌟 سحبنا دالة التحديث

    async function addTocart(productId: string) {
        try {
            setIsLoading(true);
            const response = await handelAddtocart(productId);

            if (response && response.status === "success") {
                toast.success(response.message || 'Product added successfully!', {
                    position: 'top-center'
                });

                // 🌟 الحل: تحديث العداد فوراً من السيرفر لضمان الدقة
                const cartData = await handelGetUserCart();
                if (cartData && cartData.status === "success") {
                    setCartCount(cartData.numOfCartItems);
                }
            }
            else {
                toast.error(response.message || "Failed to add to cart.", {
                    position: 'top-center'
                });
            }
        } catch (error) {
            console.error("Unexpected error:", error);
            toast.error('Failed to add to cart', { position: 'top-center' });
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="pt-6">
            <Button
                onClick={() => addTocart(productId)}
                disabled={isLoading}
                className={`relative w-full lg:w-3/4 py-6 text-xl font-bold rounded-2xl transition-all duration-300 flex items-center justify-center gap-3 shadow-lg 
                ${isLoading
                        ? "bg-slate-400 cursor-wait"
                        : "bg-green-700 hover:bg-green-800 hover:shadow-green-900/40 hover:-translate-y-1 active:scale-95"}`}>
                <span className="flex items-center gap-2">
                    {isLoading ? (
                        <>
                            <Loader className="animate-spin w-6 h-6" />
                            <span className="opacity-90">Adding to cart...</span>
                        </>
                    ) : (
                        <>
                            <i className="text-white fa-solid fa-cart-shopping text-lg transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110"></i>
                            <span className="text-white">Add to Cart</span>
                        </>
                    )}
                </span>
            </Button>
        </div>
    );
}