// import { decode } from 'next-auth/jwt';
// import { cookies } from "next/headers";

// export async function getUserToken(){
//     const decodeToken = (await cookies()).get('next-auth.session-token')?.value;
    
//     if (!decodeToken) return null;

//     const sessionData: any = await decode({
//         token: decodeToken, 
//         secret: process.env.NEXTAUTH_SECRET!
//     });
    
//     // 🌟 الإصلاح السحري هنا:
//     // بما أنك وضعت البيانات داخل token.user في كود الـ callbacks،
//     // إذن المسار الصحيح للتوكن الخاص بـ RouteMisr هو:
//     return sessionData?.user?.token || null; 
// }


import { decode } from 'next-auth/jwt';
import { cookies } from "next/headers";

export async function getUserToken() {
    const cookieStore = await cookies();
    
    // محاولة جلب الكوكي (يتم استخدام __Secure في بيئة HTTPS على Vercel)
    const tokenCookie = cookieStore.get('next-auth.session-token') || 
                        cookieStore.get('__Secure-next-auth.session-token');
    
    const decodeToken = tokenCookie?.value;
    
    // إذا لم نجد التوكن نرجع null فوراً
    if (!decodeToken) return null;

    try {
        // فك تشفير التوكن باستخدام الـ Secret الموجود في Environment Variables
        const sessionData: any = await decode({
            token: decodeToken, 
            secret: process.env.NEXTAUTH_SECRET!
        });
        
        // الوصول للتوكن بناءً على هيكلية الـ callbacks التي قمت بضبطها سابقاً
        return sessionData?.user?.token || null; 
        
    } catch (error) {
        console.error("Error decoding token in getUserToken:", error);
        return null;
    }
}