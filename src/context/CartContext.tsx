"use client";
import { createContext, useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { handelGetUserCart } from "@/API/Cart";

export const CartContext = createContext<any>(null);

export function CartContextProvider({ children }: { children: React.ReactNode }) {
    const [CartCount, setCartCount] = useState<number>(0);
    const [cartData, setCartData] = useState<any>(null);
    const { status } = useSession();

    const updateCartCount = async () => {
        if (status === "authenticated") {
            try {
                const res = await handelGetUserCart();
                if (res && res.status === "success") {
                    setCartCount(res.numOfCartItems || 0);
                    setCartData(res.data);
                } else {
                    // في حال كان المستخدم مسجل لكن لا توجد سلة
                    setCartCount(0);
                    setCartData(null);
                }
            } catch (error) {
                console.error("Error updating cart:", error);
            }
        } else {
            // تنظيف البيانات إذا لم يكن المستخدم مسجلاً
            setCartCount(0);
            setCartData(null);
        }
    };

    useEffect(() => {
        updateCartCount();
    }, [status]);

    return (
        <CartContext.Provider value={{ CartCount, setCartCount, updateCartCount, cartData, setCartData }}>
            {children}
        </CartContext.Provider>
    );
}