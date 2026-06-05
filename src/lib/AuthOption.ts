import CredentialsProvider from "next-auth/providers/credentials";
import { AuthOptions, SessionStrategy } from "next-auth"; // استيراد الأنواع

export const authOptions: AuthOptions = { 
 
  debug: true, // يظهر تفاصيل دقيقة في الـ Logs
 
  // ...

  // إضافة النوع هنا
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { type: "password" },
      },

      async authorize(credentials: any) {
        try {
          const res = await fetch(
            "https://ecommerce.routemisr.com/api/v1/auth/signin",
            {
              method: "POST",
              body: JSON.stringify({
                email: credentials?.email,
                password: credentials?.password,
              }),
              headers: { "Content-Type": "application/json" },
            }
          );

          const data = await res.json();

          // إضافة Log لرؤية ماذا يرجع الـ API بالضبط في Vercel Logs
          console.log("API Response Data:", data);
          console.log("Response Status:", res.status);

          if (res.ok && data) {
            // بناءً على هيكل API هذا المتجر، قد تكون البيانات مباشرة في data وليس في data.user
            // إذا كان الرد هو { message: "success", user: {...}, token: "..." }
            // فاستخدم الكود الخاص بك، لكن تأكد أن المسارات صحيحة
            return {
              ...data.user,
              token: data.token,
            };
          }

          // هذا الجزء هو المهم: إذا فشل الـ login، سنرمي خطأ ليظهر في الـ Frontend
          throw new Error(data.message || "Authentication failed");
        } catch (error: any) {
          console.error("Auth Error:", error.message);
          return null;
        }
      },


    }),
  ],
  session: {
    strategy: "jwt" as SessionStrategy, // التعديل الضروري لمنع خطأ الـ build
  },
 callbacks: {
  async jwt({ token, user }: any) {
    if (user) {
      // قم بتخزين التوكن مباشرة في مستوى الـ token
      token.accessToken = user.token; 
      token.user = user;
    }
    return token;
  },
  async session({ session, token }: any) {
    if (token) {
      // مرر التوكن إلى الـ session
      (session as any).token = token.accessToken;
      session.user = token.user;
    }
    return session;
  },
},
};