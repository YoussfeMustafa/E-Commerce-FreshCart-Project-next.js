import CredentialsProvider from "next-auth/providers/credentials";
import { AuthOptions, SessionStrategy } from "next-auth"; // استيراد الأنواع

export const authOptions: AuthOptions = { // إضافة النوع هنا
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { type: "password" },
      },
      async authorize(credentials: any) {
        const res = await fetch(
          "https://ecommerce.routemisr.com/api/v1/auth/signin",
          {
            method: "POST",
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
            headers: { "Content-Type": "application/json" },
          }
        );
        const data = await res.json();
        
        if (res.ok && data?.user) {
          return {
            ...data.user,
            token: data.token,
          };
        }
        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt" as SessionStrategy, // التعديل الضروري لمنع خطأ الـ build
  },
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }: any) {
      if (token?.user) {
        session.user = token.user;
        (session as any).token = (token.user as any).token;
      }
      return session;
    },
  },
};