import { decode } from 'next-auth/jwt';
import { cookies } from "next/headers";

export async function getUserToken(){
    const decodeToken = (await cookies()).get('next-auth.session-token')?.value;
    
    if (!decodeToken) return null;

    const sessionData: any = await decode({
        token: decodeToken, 
        secret: process.env.NEXTAUTH_SECRET!
    });
    
    // 🌟 الإصلاح السحري هنا:
    // بما أنك وضعت البيانات داخل token.user في كود الـ callbacks،
    // إذن المسار الصحيح للتوكن الخاص بـ RouteMisr هو:
    return sessionData?.user?.token || null; 
}