import NextAuth, { RequestInternal } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";
import connectToDatabase from "@/database/db";
import User from "@/database/models/user";

const authOptions = {
  secret: "1234",
  providers: [
    GoogleProvider({
      clientId:
        "739070115775-ji2de8gob2vacljoec76eeotkqp5hju1.apps.googleusercontent.com",
      clientSecret: "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",
    }),
    FacebookProvider({
      clientId: "1380788252709063",
      clientSecret: "f9c5e36d7c3d917ee212c8078ec05093",
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(
        credentials: Record<string | number | symbol, string> | undefined,
        req: Pick<RequestInternal, "body" | "query" | "headers" | "method">
      ): Promise<any> {
        if (
          credentials?.username === "admin" &&
          credentials.password === "admin"
        ) {
          const user = {
            id: 1,
            name: "Admin",
            email: "admin@admin.com",
            image: "",
          };
          return user;
        } else return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  database: "mongodb+srv://root:root@cluster0.smibz3t.mongodb.net/",
  callbacks: {
    async session(session: any) {
      let user = session.session.user;
      if (user && user.email) {
        const db = await connectToDatabase();
        const existingUser = await User.findOne({ email: user.email }).exec();

        if (!existingUser) {
          // Create a new user document
          await User.create({
            email: user.email,
            name: user.name,
            image: user.image,
            isAdmin: false,
          });
        }
        session.user = { ...user, isAdmin: existingUser?.isAdmin };
      }
      return session;
    },
  },
};
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
