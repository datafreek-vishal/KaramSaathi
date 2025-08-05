import NextAuth from "next-auth"

// Conditional import to prevent build-time issues
let authOptions: any;
let handler: any;

// Only initialize NextAuth during runtime, not build time
if (process.env.NODE_ENV !== undefined && typeof window === 'undefined') {
  try {
    // Dynamic import to prevent build-time execution
    const { authOptions: importedAuthOptions } = require("@/lib/auth");
    authOptions = importedAuthOptions;
    handler = NextAuth(authOptions);
  } catch (error) {
    console.warn('NextAuth initialization skipped during build:', error instanceof Error ? error.message : 'Unknown error');
    // Fallback handler for build time
    handler = {
      GET: async () => new Response('NextAuth initializing...', { status: 503 }),
      POST: async () => new Response('NextAuth initializing...', { status: 503 }),
    };
  }
} else {
  // Fallback for build time
  handler = {
    GET: async () => new Response('NextAuth not available during build', { status: 503 }),
    POST: async () => new Response('NextAuth not available during build', { status: 503 }),
  };
}

export { handler as GET, handler as POST }
