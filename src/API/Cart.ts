"use server";

import { getUserToken } from "@/lib/Auth";

// 1. دالة إضافة منتج إلى السلة
export async function handelAddtocart(productId: string) {
    const token = await getUserToken();

    if (!token) {
        return { status: "fail", message: "Please login to continue" };
    }

    try {
        const response = await fetch(`https://ecommerce.routemisr.com/api/v2/cart`, {
            method: "POST",
            body: JSON.stringify({ productId: productId }),
            headers: {
                "Content-Type": "application/json",
                "token": token as string
            },
            cache: "no-store"
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error in handelAddtocart:", error);
        return { status: "fail", message: "Server Error" };
    }
}

export async function handelGetUserCart() {
    const token = await getUserToken();

    if (!token) return { status: "fail", message: "Please login to continue" };

    try {
        const response = await fetch(`https://ecommerce.routemisr.com/api/v2/cart`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "token": token as string
            },
            cache: "no-store",
            next: { revalidate: 0 }
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error:", error);
        return { status: "fail" };
    }
}




export async function handelRemoveToCart(productId: string) {
    const token = await getUserToken();

    if (!token) return { status: "fail", message: "Please login to continue" };

    try {
        const response = await fetch(`https://ecommerce.routemisr.com/api/v2/cart/${productId}`, {
            method: "DELETE",
            headers: {
                "token": token as string
            },
            cache: "no-store",
            next: { revalidate: 0 }
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error:", error);
        return { status: "fail" };
    }
}





