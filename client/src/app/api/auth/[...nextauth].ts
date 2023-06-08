import NextAuth from "next-auth"
// import GoogleProvider from "next-auth/providers/google"
import FacebookProvider from "next-auth/providers/facebook"

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    // GoogleProvider({
    //   clientId: "",
    //   clientSecret: "",
    // }),
    FacebookProvider({
      clientId: "1380788252709063",
      clientSecret: "8bdb67798afadae1a812113988303e11",
    }),
  ],
}
export default NextAuth(authOptions)