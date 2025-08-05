import type { NextAuthOptions, DefaultSession } from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import CredentialsProvider from "next-auth/providers/credentials"
import { prisma } from "@/lib/prisma"

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as any,
  providers: [
    CredentialsProvider({
      id: "otp",
      name: "OTP",
      credentials: {
        phone: { label: "Phone", type: "text" },
        otp: { label: "OTP", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.phone || !credentials?.otp) {
          return null
        }

        // TODO: Implement OTP verification logic
        // This is a simplified version - in production, you'd verify the OTP
        // against a stored value in your database or cache
        
        // For now, we'll accept any 6-digit OTP for demo purposes
        if (credentials.otp.length !== 6) {
          return null
        }

        // Find or create user based on phone number
        let user = await prisma.user.findUnique({
          where: { phone: credentials.phone }
        })

        if (!user) {
          user = await prisma.user.create({
            data: {
              phone: credentials.phone,
              phoneVerified: new Date(),
              role: "WORKER", // Default role
            }
          })
        }

        return {
          id: user.id,
          phone: user.phone || undefined,
          name: user.name,
          email: user.email,
          image: user.image,
          role: user.role,
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
        token.phone = user.phone
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub!
        session.user.role = token.role as string
        session.user.phone = token.phone as string
      }
      return session
    },
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  secret: process.env.NEXTAUTH_SECRET,
}

declare module "next-auth" {
  interface User {
    role: string
    phone?: string
  }
  
  interface Session {
    user: {
      id: string
      role: string
      phone?: string
    } & DefaultSession["user"]
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: string
    phone?: string
  }
}
