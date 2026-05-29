// import NextAuth from "next-auth";
// import { authOptions } from "@/lib/AuthOption";

// const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST };




import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // ضع هنا منطق الاتصال بـ API الخاص بك
        return { id: "1", name: "User" }; 
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.user = user;
      return token;
    },
    async session({ session, token }) {
      session.user = token.user as any;
      return session;
    },
  },
};