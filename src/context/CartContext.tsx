"use client";
import { createContext, useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { handelGetUserCart } from "@/API/Cart"; // 🌟 استيراد دالة جلب السلة التي أصلحناها

export const CartContext = createContext<any>(null);

export function CartContextProvider({ children }: { children: React.ReactNode }) {
    // 🌟 تغيير الـ null إلى 0 كقيمة ابتدائية منطقية لعدد عناصر السلة
    const [CartCount, setCartCount] = useState<number>(0);
    const { status } = useSession();

    // 🌟 دالة مركزية لجلب العدد الحقيقي من السيرفر وتحديث الـ State
    const updateCartCount = async () => {
        if (status === "authenticated") {
            try {
                const res = await handelGetUserCart();
                if (res && res.status === "success") {
                    // RouteMisr يعيد عدد العناصر المميزة في السلة داخل numOfCartItems
                    setCartCount(res.numOfCartItems || 0);
                }
            } catch (error) {
                console.error("Error updating cart count:", error);
            }
        }
    };

    // 🌟 تحديث العدد تلقائياً أول ما المستخدم يفتح الموقع أو يسجل دخول
    useEffect(() => {
        updateCartCount();
    }, [status]);

    return (
        // 🌟 نمرر دالة updateCartCount في الـ value لكي نستخدمها داخل زرار "إضافة للسلة"
        <CartContext.Provider value={{ CartCount, setCartCount, updateCartCount }}>
            {children}
        </CartContext.Provider>
    );
}