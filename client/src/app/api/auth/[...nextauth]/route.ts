import NextAuth, { RequestInternal } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";
import connectToDatabase from "@/database/db";
import User from "@/models/user";
import Cart from "@/models/cart";

export const authOptions = {
  secret: "1234",
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_APP_GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.NEXT_APP_GOOGLE_CLIENT_SECRET || "",
    }),
    FacebookProvider({
      clientId: "1380788252709063",
      clientSecret: process.env.NEXT_APP_FACEBOOK_CLIENT_SECRET || "",
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
  database: process.env.NEXT_APP_MONGO_URI,
  callbacks: {
    async session(session: any) {
      console.log("Inside session callback");
      let user = session.session.user;
      if (user && user.email) {
        await connectToDatabase();
        const existingUser = await User.findOne({ email: user.email }).exec();

        if (!existingUser) {
          // Create a new user document
          const cart = await Cart.create({ items: [] });
          await User.create({
            email: user.email,
            name: user.name,
            image: user.image,
            isAdmin: false,
            cart: cart._id,
          });
        }
        session.user = {
          ...user,
          isAdmin: existingUser?.isAdmin,
          cart: existingUser?.cart,
        };
      }
      return session;
    },
  },
};
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
