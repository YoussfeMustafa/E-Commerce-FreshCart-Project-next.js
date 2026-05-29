import CredentialsProvider from "next-auth/providers/credentials"; // هذا هو السطر المفقود!

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { type: "password" },
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
        
        // التعديل هنا: نقوم بدمج التوكن مع بيانات المستخدم
        if (res.ok && data?.user) {
          return {
            ...data.user,      // الاسم، الإيميل، إلخ
            token: data.token, // <--- إضافة التوكن هنا ليصبح جزءاً من كائن الـ user
          };
        }
        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.user = user; // سيحتوي الآن على الاسم + التوكن
      }
      return token;
    },
    async session({ session, token }: any) {
      if (token?.user) {
        session.user = token.user;
        (session as any).token = token.user.token; // التوكن الآن أصبح متاحاً في session.token
      }
      return session;
    },
  },
};