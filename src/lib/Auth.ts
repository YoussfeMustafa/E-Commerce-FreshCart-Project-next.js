import { decode } from 'next-auth/jwt';
import { cookies } from "next/headers";

export async function getUserToken() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('next-auth.session-token')?.value;
        
        if (!token) return null;

        const decoded = await decode({
            token, 
            secret: process.env.NEXTAUTH_SECRET!
        });
        
        // التحقق من وجود البيانات قبل إرجاعها
        return (decoded as any)?.user?.token || null;
        
    } catch (error) {
        console.error("Error decoding token:", error);
        return null;
    }
}