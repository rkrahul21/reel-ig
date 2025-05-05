import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDatabase } from "./db";
import User from "../models/User";
import bcrypt from "bcryptjs";


export const authOptions: NextAuthOptions = {
    // Configure one or more authentication providers like Google, Facebook, etc.
    // https://next-auth.js.org/providers/overview
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "Email" },
                password: { label: "Password", type: "password", placeholder: "password" }
            },

            async authorize(credentials) {

                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Please enter your email and password")
                }

                try {
                    await connectToDatabase()

                    const userExist = await User.findOne({ email: credentials.email })

                    if (!userExist) {
                        throw new Error("User not found")
                    }

                    const isValid = await bcrypt.compare(credentials.password, userExist.password)

                    if (!isValid) {
                        throw new Error("Invalid password")
                    }

                    return {
                        id: userExist._id.toString(),
                        email: userExist.email,

                    };

                } catch (error) {
                    console.error("Error in authorize", error)
                    throw error;
                }
            }

        })
    ],

    //callbacks
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id as string
            }
            return token
        },
        async session({ session, token }) {

            if (session.user) {
                session.user.id = token.id as string

            }
            return session
        },
    },

    //pages
    pages: {
        signIn: "/login",
        error: "/login",
    },
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    secret: process.env.NEXTAUTH_SECRET,
}