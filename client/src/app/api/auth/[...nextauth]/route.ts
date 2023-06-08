import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import FacebookProvider from "next-auth/providers/facebook"
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: "739070115775-ji2de8gob2vacljoec76eeotkqp5hju1.apps.googleusercontent.com",
      clientSecret: "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",
    }),
    FacebookProvider({
      clientId: "1380788252709063",
      clientSecret: "8bdb67798afadae1a812113988303e11",
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: {  label: "Password", type: "password" }
      },
      async authorize(credentials:any, req:any) {
        if (credentials.username==='admin' && credentials.password==='admin') {
          const user = { id: 1, name: 'Admin', email: "admin@admin.com", image: "" }
          return user}
        else return null;
      }
    })
  ],
  pages: {
    signIn: '/login',
  }
}
const handler = NextAuth(authOptions)
export {handler as GET, handler as POST}