// This file helps prevent build-time issues by providing fallback configurations

// Check if we're in a build environment
export const isBuildTime = process.env.NODE_ENV === 'production' && !process.env.VERCEL_ENV;

// Provide safe defaults for build time
export const getEnvVar = (key: string, fallback: string = '') => {
  if (isBuildTime) {
    return fallback;
  }
  return process.env[key] || fallback;
};

// Build-safe database URL
export const getBuildSafeDatabaseUrl = () => {
  if (isBuildTime) {
    return 'file:./dev.db'; // SQLite fallback for build
  }
  return process.env.DATABASE_URL || 'file:./dev.db';
};

// Build-safe NextAuth secret
export const getBuildSafeNextAuthSecret = () => {
  if (isBuildTime) {
    return 'build-time-secret-key';
  }
  return process.env.NEXTAUTH_SECRET || 'development-secret-key';
};
