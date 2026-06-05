"use client";
import { handelAddtocart, handelGetUserCart } from "@/API/Cart"; // 🌟 استوردنا دالة الجلب أيضاً
import { Button } from "@/components/ui/button";
import { Loader } from 'lucide-react';
import React, { useState, useContext } from 'react'; // 🌟 استوردنا useContext
import toast from "react-hot-toast";
import { CartContext } from "@/context/CartContext"; // 🌟 استوردنا الـ Context

export default function AddToCartBtn({ productId }: { productId: string; }) {
    const [isLoading, setIsLoading] = useState(false);
    const { setCartCount } = useContext(CartContext); // 🌟 سحبنا دالة التحديث

    async function addTocart(productId: string) {
        try {
            setIsLoading(true);
            const response = await handelAddtocart(productId);
            console.log("API Response:", response); // أضف هذا السطر

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
        <div>
            <Button
                onClick={() => addTocart(productId)}
                className="cursor-pointer w-full bg-slate-900 hover:bg-green-700 text-white py-5 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group/btn relative"
                variant="outline"
                disabled={isLoading}
            >
                <span className="relative z-10 flex items-center">
                    {isLoading ? (
                        <>
                            <Loader className="animate-spin mr-2" /> loading...
                        </>
                    ) : (
                        <>
                            <i className="fa-solid fa-cart-shopping mr-2"></i>
                            Add to Cart
                        </>
                    )}
                </span>
            </Button>
        </div>
    );
}