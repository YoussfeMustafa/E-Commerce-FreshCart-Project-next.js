import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export async function proxy(request: NextRequest) {

    const { pathname } = request.nextUrl
    console.log("المسار الحالي:", pathname);

    const isAuthPage = ["/signIn" , "/signUp"].includes(pathname)
    const token = await getToken({ req : request })
    console.log("التوكن:", token);

    // 1. لو التوكن موجود والمستخدم بيحاول يفتح صفحة الـ signIn -> وّديه فوراً على الـ brands
    if (token && isAuthPage) {
        return NextResponse.redirect(new URL('/brands', request.url))
    }
    
    // 2. لو التوكن مش موجود والمستخدم بيحاول يدخل أي صفحة محمية ثانية (مش الـ signIn والـ signUp) -> رجعه للـ signIn
    if (!token && !isAuthPage) {
        return NextResponse.redirect(new URL('/signIn', request.url))
    }
    
    // 🔥 3. السطر السحري الناقص: لو التوكن مش موجود والمستخدم رايح أصلاً للـ signIn أو الـ signUp، خليه يدخل عادي وماتعملش redirect
    return NextResponse.next();
}
 
export const config = {
  matcher: ["/" , "/carts" , "/categories" , "/brands" , "/signIn" , "/signUp"],
}



//   return NextResponse.redirect(new URL('/home', request.url))


// Alternatively, you can use a default export:
// export default function proxy(request: NextRequest) { ... }
 